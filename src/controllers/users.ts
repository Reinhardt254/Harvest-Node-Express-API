import express, { RequestHandler } from "express";
import {
  createNewUser,
  deleteUserById,
  getAllTheUsers,
  getUsersById,
  updateUserById,
} from "../services/userAuth";

export const getAllUsers: RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const allUsers = await getAllTheUsers();
    res.json(allUsers);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const getUser: RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    if (!id) {
      res.sendStatus(400);
      return;
    }
    const user = await getUsersById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const createUser: RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const body = req.body;
    console.log(body);
    const { name, phoneNumber, address, age, gender, email } = body;

    if (!name || !phoneNumber || !address || !age || !gender || !email) {
      console.log("missing value");
      res.sendStatus(400);
      return;
    }

    const createdUser = await createNewUser(
      name,
      phoneNumber,
      address,
      age,
      gender,
      email
    );

    res.status(201).json(createdUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const updateUser: RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { name, email, phoneNumber, address, age, gender } = req.body;
    const { id } = req.params;

    if (!name || !phoneNumber || !address || !age || !gender || !id || !email) {
      console.log("no data in update");
      res.sendStatus(400);
      return;
    }

    const updatedUser = await updateUserById(
      name,
      phoneNumber,
      address,
      age,
      gender,
      id,
      email
    );

    if (updatedUser.count === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};

export const deleteUser: RequestHandler = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(400);
      return;
    }

    const deletedUser = await deleteUserById(id);

    if (deletedUser.count === 0) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.json(deletedUser);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
};
