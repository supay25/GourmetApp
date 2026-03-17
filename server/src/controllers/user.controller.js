import {
  getUserByEmail,
  createUser as createUserService,
} from "../services/user.service.js";

export const createUser = async (req, res) => {
  try {
    const user = await createUserService(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await getUserByEmail(req.params.email);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
