import books from '~/assets/books'

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
    online: boolean
}

export interface Book {
    id: number,
    title: string,
    author: string,
    rating: number,
    voters: string,
    price: number,
    currency: string,
    description: string
    publisher: string,
    page_count: number,
    genres: string,
    ISBN: string,
    language: string,
    published_date: string
}

export const db = {
    users: [] as User[],
    books: books as Book[]
}