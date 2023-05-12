import Router from "express";
import authController from "../controllers/authController.js";
import { check } from "express-validator";

const router = new Router();

router.post(
  "/registration",
  [
    check("username", "Имя пользователя не может быть пустым").notEmpty(),
    check("password", "Пароь должен быть от 6 до 20 символов").isLength({
      min: 6,
      max: 20,
    }),
  ],
  authController.registration
);
router.post("/login", authController.login);
router.get("/getUsers", authController.getUsers);

export default router;
