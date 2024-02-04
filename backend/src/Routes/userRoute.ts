import express, { Request, Response } from "express";
import User from "../Models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { check, validationResult } from "express-validator";

const router = express.Router();

// Path : /api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").not().isEmpty(),
    check("lastName", "Last Name is required").not().isEmpty(),
    check("email", "Email is Required").isEmail(),
    check("password", "Password is required and should be 6 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }

    try {
      let email = req.body.email;
      const isEmailUnique = await User.findOne({ email });

      if (isEmailUnique) {
        return res.status(400).send({ message: "Email already exists" });
      }

      const user = new User(req.body);

      const newUser = await user.save();
      const token = jwt.sign(
        { userId: newUser._id },
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
      return res.status(200).send({ message: "User Registered Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Error in Registering" });
    }
  }
);

export default router;
