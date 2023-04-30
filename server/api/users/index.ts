import { db } from '~/server/db'
import { v4 as uuid } from 'uuid'
import { sendError } from 'h3'

export default defineEventHandler(async (e) => {

    switch (e.node.req.method) {
        case 'POST': {
            const body = await readBody(e)

            if (!body.email) {
                const badRequestErr = createError({
                    statusCode: 400,
                    statusMessage: "Email property not found"
                })

                sendError(e, badRequestErr)
            }

            const newUser = {
                id: uuid(),
                name: body.name || 'N/A',
                email: body.email,
                password: body.password,
                online: true,
            }

            db.users.push(newUser)

            useStorage().setItem('users', db.users)

            useStorage().setItem('user', newUser)

            return newUser
        }

        case 'GET': {
            return db.users
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