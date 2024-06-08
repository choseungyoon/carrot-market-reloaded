"use server"
import { PASSW0RD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import {z} from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

const checkPassword = ({password,confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword

const checkUniqueUsername = async (username : string) => {
    // check if username is taken
    const user = await db.user.findUnique({
        where: {
            username : username
        },
        select: {
            id : true
        },
    });
    return !Boolean(user)
}

const checkUniqueEmail = async (email : string) => {
    const userEmail = await db.user.findUnique({
        where: {
            email : email
        },
        select: {
            id : true
        },
    })

    return !Boolean(userEmail)
}
const formSchema = z.object({
    username: z
    .string({
        invalid_type_error : "Username must be a string!",
        required_error : "Where is my username??"
    })
    .refine(checkUniqueUsername,"This username is already use"),
    email : z
    .string()
    .email()
    .refine(checkUniqueEmail,"There is an account already registered with that email"),
    password: z.string().min(10),
    confirmPassword : z.string().min(10),
}).refine(checkPassword, {
    message : "Both passwords should be the same!",
    path : ["confirmPassword"]
})

export async function createAccount(prevStage: any, FormData: FormData){
    const data = {
        username: FormData.get("username"),
        email: FormData.get("email"),
        password: FormData.get("password"),
        confirmPassword: FormData.get("confirmPassword"),
    }
    const result = await formSchema.safeParseAsync(data)

    if(!result.success){
        return result.error.flatten()
    }
    else{
        // hash password
        const hashedPassword = await bcrypt.hash(result.data.password,12)

        // save the user to db
        const user = await db.user.create({
            data : {
                username : result.data.username,
                email : result.data.email,
                password : hashedPassword
            },
            select :{
                id : true
            }
        })

        // log the user in
        const session = await getSession()
        session.id = user.id
        await session.save()
        redirect("/")
    }
}