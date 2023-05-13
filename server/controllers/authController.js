import User from "../models/authUser.js";
import Role from "../models/authRole.js";
import bcrypt from "bcryptjs";
import tokenService from "../service/tokenService.js";
import { validationResult } from "express-validator";

class authController {
  async registration(req, res) {
    try {
      // Ловим ошибки валидации
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при регистрации", errors });
      }

      // Проверка на наличие пользователя
      const { username, password } = req.body;
      const candidate = await User.findOne({ username });
      if (candidate) {
        return res.status(400).json({ message: "Юзер уже существует" });
      }

      // Хеширование пароля и добавление пользователя в бд
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "user" });

      const user = new User({
        username,
        password: hashPassword,
        refresh_token: tokenService.generateRefreshToken({ username }),
        roles: [userRole.value],
      });
      await user.save();

      const accessToken = tokenService.generateAccessToken({ username });
      return res.json({ 
        status: 200,
        message: "Юзер создан!", 
        user, 
        accessToken });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      // Проверка на наличие пользователя
      const { username, password } = req.body;
      const checking_user = await User.findOne({ username });
      if (!checking_user) {
        return res.status(400).json({ message: "Юзер не найден" });
      }

      // Проверка пароля
      const validPass = bcrypt.compareSync(password, checking_user.password);
      if (!validPass) {
        return res.status(400).json({ message: "Пароль не верный" });
      }

      // Добавление токенов авторизации
      const refreshToken = tokenService.generateRefreshToken({ username });
      const accessToken = tokenService.generateAccessToken({ username });
      
      // Обновление рефреш токена в бд
      checking_user.refresh_token = refreshToken;

      await checking_user.save();

      // Ответ сервера
      return res.status(200).json({
        status: 200,
        message: "Вы залогинились", 
        user: checking_user,
        accessToken
      })

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async logout(req, res){
    try{
      const { _id } = req.params
      const checking_user = await User.findOne({ _id });
      if (!checking_user) {
        return res.status(400).json({ message: "Юзер не найден" });
      }

      checking_user.refresh_token = null
      
      await checking_user.save();

      res.status(200).json({ checking_user })
    } catch(e){
      console.log(e)
    }
  }
  async checkAccessToken(req, res){
    if (!req.headers.authorization){
      console.log('checkAccessToken Error')
      return res.status(400)
    }
    const token = req.headers.authorization.split(' ')[1]

    const result = tokenService.checkAccessToken(token)

    if(result.status === 200){
      const username = result.token.username
      const user = await User.findOne({ username })
      const accessToken = tokenService.generateAccessToken({ username })
      
      return res.status(200).json({
        status: 200,
        user,
        accessToken
      })
    }
    else{
      console.log("Токен не валидный")
      return res.status(404).json({
        status: 404
      })
    }
  }
  async checkRefreshToken(req, res){
    if (!req.headers.authorization){
      console.log('checkRefreshToken Error')
      return res.status(400)
    }
    const token = req.headers.authorization.split(' ')[1]

    const result = tokenService.checkRefreshToken(token)



    if(result.status === 200){
      console.log(result.token.username)
      const username = result.token.username
      const user = await User.findOne({ username })

      const accessToken = tokenService.generateAccessToken({ username })
      const refreshToken = tokenService.generateRefreshToken({ username })
      
      user.refresh_token = refreshToken

      await user.save()

      return res.status(200).json({
        status: 200,
        user,
        accessToken
      })
    }
    else{
      console.log("Токен не валидный")
      return res.status(404).json({
        status: 404
      })
    }
  }
}

export default new authController();
