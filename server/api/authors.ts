import { db } from '~/server/db'

export default defineEventHandler( async (e) => {
    if (e.node.req.method === 'GET') {
        return [
            ...new Set(db.books.map((book) => book.author).sort()),
        ]
    }
})