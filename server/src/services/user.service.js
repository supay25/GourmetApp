import { User } from "../models/user.model.js";
import {
  hashPassword,
  encryptData,
  decryptData,
} from "../helpers/security.helper.js";

export const createUser = async (data) => {
  const passwordHashed = await hashPassword(data.passwordHash);

  const encryptedData = {
    ...data,
    password: passwordHashed,
    identification: encryptData(data.identification),
    fullName: encryptData(data.fullName),
  };

  const user = await User.create(encryptedData);
  return user;
};

export const getUserByEmail = async (email) => {
  const user = await User.findOne({ email }).lean();

  if (user) {
    user.identification = decryptData(user.identification);
    user.fullName = decryptData(user.fullName);

    delete user.password;
  }

  return user;
};
