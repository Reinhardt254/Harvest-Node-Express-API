import { updateUser, createUser, deleteUser, getAllUsers, getUser } from '../controllers/users';
import express from 'express';

export default(router: express.Router) => {
   router.get("/users", getAllUsers)
   router.get("/users/:id", getUser)
   router.post("/users", createUser)
   router.patch("/users/:id", updateUser)
   router.delete("/users/:id", deleteUser)
}
 