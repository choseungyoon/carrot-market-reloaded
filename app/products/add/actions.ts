"use server";
import {z} from "zod"
import fs from "fs/promises"
import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
    photo : z.string({required_error : "photo is required"}),
    title : z.string({required_error : "title is required"}),
    price : z.number({required_error : "price is required"}),
    description : z.string({required_error : "description is required"}),
})

export default async function upLoadProduct(formData : FormData){
    const data = {
        photo : formData.get("photo"),
        title : formData.get("title"),
        price : formData.get("price"),
        description : formData.get("description")
    }
    
    if(data.photo instanceof File){
        const photoData = await data.photo.arrayBuffer();
        await fs.appendFile(`/public/${data.photo.name}`,Buffer.from(photoData));
        data.photo = `/${data.photo.name}`
    }

    const result = productSchema.safeParse(data)
    if(!result.success){
        return result.error.flatten()
    }
    else{
        const session = await getSession()
        if(session.id){
            const product = await db.porduct.create({
                data : {
                    title : result.data.title,
                    description : result.data.description,
                    price : result.data.price,
                    photo : result.data.photo,
                    user : {
                        connect : {
                            id : session.id
                        }
                    }
                },
                select : {
                    id : true
                }
            })

            redirect(`/products/${product.id}`)
        }
    }
    //const results = productSchema.parse(data)
    //console.log(data)
}