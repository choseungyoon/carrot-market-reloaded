"use server"
import {z} from "zod"

const formSchema = z.object({
    username: z.string().min(3).max(10),
    email : z.string().email(),
    password: z.string().min(10),
    confirmPassword : z.string().min(10),
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


    console.log(data)
}