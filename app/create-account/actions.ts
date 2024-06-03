"use server"
import { PASSW0RD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import {z} from "zod"

const checkPassword = ({password,confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword

const formSchema = z.object({
    username: z
    .string({
        invalid_type_error : "Username must be a string!",
        required_error : "Where is my username??"
    })
    .trim()
    .toLowerCase()
    .min(PASSW0RD_MIN_LENGTH,"Way too short!!")
    .max(10,"That is too long!!"),
    email : z.string().email().toLowerCase(),
    password: z.string().min(10).regex(PASSWORD_REGEX,PASSWORD_REGEX_ERROR),
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

    const result = formSchema.safeParse(data)
    
    if(!result.success){
        return result.error.flatten()
    }
    else{
        console.log(data)
    }
}