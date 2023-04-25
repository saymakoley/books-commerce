import { db } from '../../db'

export default defineEventHandler(async (e) => {
    if (e.req.method === 'GET') {
        return db.users
    }
})