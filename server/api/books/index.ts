import { Book, db } from '~/server/db'

interface PaginatedResponse {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
    data: Book[];
}

export default defineEventHandler(async (e) => {

    const { method, url } = e.node.req;

    const query = new URLSearchParams(url?.substring(url?.indexOf('?')))

    const page = Number(query.get('page')) || 1;
    const perPage = Number(query.get('per_page')) || 30;
    const search = query.get('search')?.trim() || ''
    const genre = query.get('genre')?.trim() || ''
    const author = query.get('author')?.trim() || ''
    const language = query.get('language')?.trim() || ''
    const sort = query.get('sort') || '';

    if (method === 'GET') {
        // Apply filters
        let filteredBooks = db.books.filter(book => {
            let valid = true;

            if (genre && !book.genres.includes(genre)) {
                valid = false;
            }

            if (author && book.author.trim() !== author) {
                valid = false;
            }

            if (language && book.language.trim() !== language) {
                valid = false;
            }

            if (search) {
                const searchTerm = search.toLowerCase();
                if (!book.title.toLowerCase().includes(searchTerm) &&
                    !book.description.toLowerCase().includes(searchTerm)) {
                    valid = false;
                }
            }

            return valid;
        });

        // Apply sorting
        const [sortBy, sortDirection] = sort.split('-');
        filteredBooks.sort((a, b) => {
            switch (sortBy) {
                case 'title':
                    return sortDirection === 'asc' ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title);
                case 'price':
                    return sortDirection === 'asc' ? a.price - b.price : b.price - a.price;
                case 'rating':
                    return sortDirection === 'asc' ? a.rating - b.rating : b.rating - a.rating;
                case 'published_date':
                    return sortDirection === 'asc' ? Date.parse(a.published_date) - Date.parse(b.published_date) : Date.parse(b.published_date) - Date.parse(a.published_date);
                default:
                    return 0;
            }
        });

        // Calculate pagination
        const total = filteredBooks.length;
        const lastPage = Math.ceil(total / perPage);
        const start = (page - 1) * perPage;
        const end = start + perPage;
        const data = filteredBooks.slice(start, end);

        // Create response object
        const response: PaginatedResponse = {
            total,
            per_page: perPage,
            current_page: page,
            last_page: lastPage,
            data,
        };

        return response
    }
})