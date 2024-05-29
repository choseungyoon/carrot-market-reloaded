import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function test(){
    const user  = await db.user.create({
        data : {
            username : "seungyoon",
            phone : "01063920081"
        }
    })

    console.log(user)

}

test();

export default db