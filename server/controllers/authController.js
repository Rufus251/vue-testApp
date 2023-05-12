import User from "../models/authUser.js";
import Role from "../models/authRole.js";
import bcrypt from "bcryptjs";
import tokenService from "../service/tokenService.js"
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
        roles: [userRole.value],
      });
      await user.save();
      return res.json({ message: "Юзер создан!" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      // Проверка на наличие пользователя
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(400).json({ message: "Юзер не найден" });
      }

      // Проверка пароля
      const validPass = bcrypt.compareSync(password, user.password);
      if (!validPass) {
        return res.status(400).json({ message: "Пароль не верный" });
      }

      // 
      const token = tokenService.generateToken({username});
      
      return res.json(token)

    } catch (e) {
      console.log(e);
      res.status(400).json({ message: "Login error" });
    }
  }
  async getUsers(req, res) {
    try {
      const users = await User.find()
      return res.json(users)
    } catch (e) {
      console.log(e);
    }
  }
}

export default new authController();
