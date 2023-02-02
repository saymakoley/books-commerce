import books from '~/assets/books'

export const state = () => ({
    books,
})

export const getters = {
    books: (state) => state.books
}