import jwt from "jsonwebtoken";

class tokenService {
  generateAccessToken({ username }) {
    return jwt.sign({ username }, process.env.ACCESS_SK, { expiresIn: "3m" });
  }
  generateRefreshToken({ username }) {
    return jwt.sign({ username }, process.env.REFRESH_SK, { expiresIn: "30d" });
  }
  checkAccessToken(access_token) {
    try {
      const token = jwt.verify(access_token, process.env.ACCESS_SK);

      return{
        status: 200,
        message: "Токен валидный",
        token
      }
    } catch (e) {
        return {
            status: 401,
            message: "Токен не валидный"
        }
    }
  }
  checkRefreshToken(refresh_token) {
    try {
      const token = jwt.verify(refresh_token, process.env.REFRESH_SK);

      return{
        status: 200,
        message: "Токен валидный",
        token
      }
    } catch (e) {
        return {
            status: 401,
            message: "Токен не валидный"
        }
    }
  }
}

export default new tokenService();
