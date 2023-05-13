import Router from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароь должен быть от 4 до 20 символов").isLength({
      min: 4,
      max: 20,
    }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.put('/logout/:_id', authController.logout)
router.get('/checkAccessToken', authController.checkAccessToken);
router.get('/checkRefreshToken', authController.checkRefreshToken);

export default router;
