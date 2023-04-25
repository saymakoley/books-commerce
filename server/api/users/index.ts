import { db } from '~/server/db'
import { v4 as uuid } from 'uuid'
import { sendError } from 'h3'

export default defineEventHandler(async (e) => {

    switch (e.node.req.method) {
        case 'POST': {
            console.log(e)
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

        case 'GET': {
            return db.books
        }

        default: {
            const badRequestErr = createError({
                statusCode: 400,
                statusMessage: "Route not found"
            })

            sendError(e, badRequestErr)
        }
    }
})