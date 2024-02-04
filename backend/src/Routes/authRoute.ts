import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { check, validationResult } from "express-validator";
import User from "../Models/user";
import bcrypt from "bcrypt";
import verifyToken from "../middleware/auth";

const router = express.Router();

// Path : /api/auth/
router.post(
  "/login",
  [
    check("email", "Email is Required").isEmail(),
    check(
      "password",
      "Password is required and should be 6 characters long"
    ).isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).send({ message: "Invalid Credentials" });
      }

      const isPassValidated = await bcrypt.compare(password, user.password);

      if (!isPassValidated) {
        return res.status(400).send({ message: "Invalid Credentials" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).send({ message: "Login Successful", token });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/validate-token",
  verifyToken,
  async (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
  }
);

router.get("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {});
  res.status(200).send({ message: "Logout Successful" });
});

export default router;
