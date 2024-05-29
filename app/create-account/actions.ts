"use server"
import {z} from "zod"

// At least one uppercase letter, one lowercase letter, one number and one special character
const passwordRegex = new RegExp(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/
    );

const checkUsername = (username : string) => !username.includes("potato");
const checkPassword = ({password,confirmPassword}:{password:string, confirmPassword:string}) => password === confirmPassword
const formSchema = z.object({
    username: z
    .string({
        invalid_type_error : "Username must be a string!",
        required_error : "Where is my username??"
    })
    .trim()
    .toLowerCase()
    .min(3,"Way too short!!")
    .max(10,"That is too long!!")
    .refine(checkUsername, "custom error"),
    email : z.string().email().toLowerCase(),
    password: z.string().min(10).regex(passwordRegex,"A password must have lowercase, UPPERCASE, a number and special characters"),
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