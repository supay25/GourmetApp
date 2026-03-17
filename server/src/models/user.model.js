import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    identification: String,
    fullName: String,
    email: String,
    password: String,
    createdAt: Date,
    updatedAt: Date,
  },
  {
    versionKey: false,
  },
);

export const User = mongoose.model("User", userSchema);
