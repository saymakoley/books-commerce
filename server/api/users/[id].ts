import { db } from '~/server/db'
import { sendError } from 'h3'

export default defineEventHandler(async (e) => {
    const findUserById = (tid: string) => {
        let index: number = 0;

        const user = db.users.find((u, i) => {
            if (u.id === tid) index = i
            return u.id === tid
        })

        if (!user) {
            const notFoundError = createError({
                statusCode: 404,
                statusMessage: 'User not found'
            })

            sendError(e, notFoundError)
        }

        return { user, index }
    }

    switch (e.req.method) {
        case 'PUT': {
            const { id } = e.context.params

            const { user, index } = findUserById(id)

            const updatedUser = {
                ...user,
                online: !user?.online,
            }

            db.users[index] = updatedUser

            return updatedUser
        }
    
        case 'DELETE': {
            const { id } = e.context.params

            const { index } = findUserById(id)
            db.users.splice(index, 1)

            return {
                message: 'User deleted'
            }
        }

        default: {}
    }
})