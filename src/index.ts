import { PrismaClient } from "@prisma/client";
import { error } from "console";

const prisma = new PrismaClient();

async function insertUser(username: string, password: string, firstName: string, lastName: string){

    try{
        const res = await prisma.user.create({
            data: {
                email: username,
                password,
                firstName,
                lastName
            },
            select: {
                id: true,
                password: true
            }
        });
        return res;
    } catch(error){
        console.log("Error inserting user:", error);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
}

// insertUser("bansal.anmol9@gmail.com", "password", "Anmol", "Bansal")
//     .then((res) => {
//         console.log("User created:", res);
//     })

async function getUser(username: string){
    try{
        const res = await prisma.user.findFirst({
            where: {
                email: username,
            },
        });
        return res;
    } catch(err){
        console.error("Error finding user:", err);
        throw error;
    } finally{
        await prisma.$disconnect();
    }
} 


// getUser("bansal.anmol9@gmail.com")
//     .then((user) => {
//         console.log("Found user:", user);
//     })
//     .catch((error) => {
//         console.error("Error:", error);
//     })

interface UpdateParams{
    firstName: string, 
    lastName: string
}

async function updateUser(username: string, {
    firstName,
    lastName
}: UpdateParams){
    try{
        const res = await prisma.user.update({
            where: {email: username},
            data: {firstName, lastName}
        });

        return res;
    } catch(err){
        console.error(err);
        throw err;
    } finally{
        await prisma.$disconnect();
    }
}

updateUser("bansal.anmol98@gmail.com", {
    firstName: "Lucky",
    lastName: "Anmol"
}).then((res) => {
    console.log("User updated", res);
});