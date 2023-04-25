import { db } from '~/server/db'

export default defineEventHandler(async (e) => {
    switch (e.node.req.method) {
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