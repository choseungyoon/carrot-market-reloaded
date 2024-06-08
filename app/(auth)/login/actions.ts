"use server";

import { PASSW0RD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from "@/lib/constants";
import db from "@/lib/db";
import {z} from "zod"
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email:string) => {
  const user = await db.user.findUnique({
    where:{
      email : email,
    },
    select : {
      id : true
    }
  })
  return Boolean(user)
}

const formSchema = z.object({
  email: z.string().email().toLowerCase()
  .refine(checkEmailExists,"An account with this email does not exist."),
  password : z.string({
    required_error : "Password is required"
  }).min(PASSW0RD_MIN_LENGTH)
})

export async function login (prevState:any,formData: FormData) {
    const data = {
      email : formData.get("email"),
      password : formData.get("password")
    }

    const result =  await formSchema.safeParseAsync(data)
    if(!result.success){
      return result.error.flatten()
    }
    else{
      // if the user is found, check password hash
      const user = await db.user.findUnique({
        where : {
          email : result.data.email
        },
        select : {
          password : true,
          id : true
        }
      })

      const ok = await bcrypt.compare(result.data.password,user!.password ?? "")
      
      if(ok){
        const session = await getSession();
        session.id = user!.id;
        await session.save()
        redirect("/profile")
      } else{
        return {
          fieldErrors: {
            password : ["Wrong Password."],
            email : []
          }
        }
      }
    }
  };