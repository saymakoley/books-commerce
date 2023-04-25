import { db } from '../../db'
import { v4 as uuid } from 'uuid'
import { sendError } from 'h3'

export default defineEventHandler(async (e) => {

    if (e.node.req.method === 'POST') {
        const body = await useBody(e)

        if (!body.name) {
            const badRequestErr = createError({
                statusCode: 400,
                statusMessage: "Name property not found"
            })

            sendError(e, badRequestErr)
        }

        const newUser = {
            id: uuid(),
            name: body.name, 
            email: body.email,
            password: body.password,
            online: true,
        }

        db.users.push(newUser)
        return newUser
    }

    if (e.node.req.method === 'GET') {
        return db.users
    }
})