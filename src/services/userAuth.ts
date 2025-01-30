import prismadb from "../../utils/prisma";
// const bcrypt = require('bcrypt')

export const createNewUser = async ( name: string, phoneNumber: string, address: string, age: string, gender: string, email: string) => {
   const newUser = await prismadb.user.create({
      data : {
         name: name,
         email: email,
         phoneNumber: phoneNumber,
         address: address,
         age: age,
         gender: gender,
      }
   }) 

   return newUser
}

export const updateUserById = async (  name: string, phoneNumber: string, address: string, age: string, gender: string, id: string, email: string) => {
   const updateUser = await prismadb.user.updateMany({
      where: {
         id : id
      },
      data: {
         name: name,
         email: email,
         phoneNumber: phoneNumber,
         address: address,
         age: age,
         gender: gender,
      }
   })

   return updateUser
}

export const getAllTheUsers = async() => {
   const allUsers = await prismadb.user.findMany();

   return allUsers;
}

export const getUsersById = async (id: string) => {
   const user = await prismadb.user.findFirst({
      where : {
         id : id
      }
   });

   return user;
}

export const deleteUserById = async (id: string) => {
  const deleteUser = await prismadb.user.deleteMany({
   where: {
      id: id
   }
  })

  return deleteUser
}
 