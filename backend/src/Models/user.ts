import mongoose from "mongoose";
import bcrypt from "bcrypt";

interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  registerDate: Date;
}

const UserSchema = new mongoose.Schema<UserType>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  registerDate: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", UserSchema);

export default User;
