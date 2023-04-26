import { db } from '~/server/db'

export default defineEventHandler(async (event) => {
    const findBookByTitle = (title: string) => {
        let index: number = 0;

        const book = db.books.find((item, i) => {
            if (item.title === title) index = i
            return item.title === title
        })

        if (!book) {
            const notFoundError = createError({
                statusCode: 404,
                statusMessage: 'Book not found'
            })

            sendError(event, notFoundError)
        }

        return { book, index }
    }

    if (event.node.req.method === 'GET') {
        const { title } = event.context.params

        const decodedTitle = decodeURIComponent(title)

        const { book } = findBookByTitle(decodedTitle)

        return book
    }
})