<template>
    <main class="container grid sm:grid-cols-3 gap-6 items-start w-full">
        <Sidebar
            :sortOptions="sortOptions"
            :genres="genres"
            :authors="authors"
            :languages="languages"
            @updateSearch="searchBooks"
            @updateSortby="sortBooks"
            @updateGenre="filterBooksByGenre"
            @updateAuthor="filterBooksByAuthor"
            @updateLanguage="filterBooksByLanguage"
        />

        <section class="flex flex-col justify-start sm:col-span-2">
            <h2 class="text-lg">
                Showing <strong>{{ books.length }}</strong> results
            </h2>

            <div v-if="books && books.length > 0" class="space-y-8">
                <div
                    class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-8"
                >
                    <nuxt-link
                        v-for="(book, index) in books"
                        :key="index"
                        class="flex flex-col rounded-lg space-y-3 shadow justify-between"
                        :to="`/${book.title}`"
                    >
                        <img
                            class="w-full h-32 object-contain"
                            src="/images/book-cover.jpeg"
                            alt="To Kill a Mockingbird cover"
                        />

                        <div class="flex items-center justify-center">
                            <Rating :rating="book.rating" size="w-5 h-5" />
                        </div>

                        <div class="p-2">
                            <div
                                class="flex justify-between items-center space-x-4"
                            >
                                <h4 class="font-bold text-lg mb-2">
                                    {{ $clipText(book.title, 50) }}
                                </h4>
                                <p class="font-italic">
                                    {{ $convertPrice(book).price }}
                                </p>
                            </div>
                            <div class="text-gray-600 mb-2">
                                <span>{{ book.author }}</span>
                                <span class="mx-2">|</span>
                                <span>{{ book.published_date }}</span>
                            </div>
                            <div class="text-gray-700 mb-2">
                                <strong>Genres</strong>:
                                {{ book.genres }}
                            </div>
                            <div class="text-gray-600 mb-2">
                                <span>{{ book.language }}</span>
                                <span class="mx-2">|</span>
                                <span
                                    ><strong>{{ book.page_count }}</strong>
                                    pages</span
                                >
                            </div>
                        </div>

                        <div class="p-2">
                            <button
                            v-if="!isItemInCart(book)"
                                @click.prevent="addBookToCart(book)"
                                class="btn btn-sm btn-outline-primary w-full mt-4"
                            >
                                Add to cart
                            </button>
                        </div>
                    </nuxt-link>
                </div>
            </div>

            <div
                v-if="!books || books.length === 0"
                class="flex flex-col items-center justify-center space-y-4"
            >
                <iframe
                    title="empty"
                    src="https://embed.lottiefiles.com/animation/79572"
                ></iframe>
                <p class="text-lg font-bold">No books found.</p>
            </div>

            <div class="flex justify-center my-5" v-if="pagination.total">
                <div class="flex items-center">
                    <button
                        class="px-3 py-2 text-gray-500 bg-white border rounded-l-md hover:text-gray-700 hover:bg-gray-100"
                        :disabled="pagination.current_page === 1"
                        @click="setCurrentPage(pagination.current_page - 1)"
                    >
                        Previous
                    </button>
                    <div
                        class="flex items-center justify-center h-10 px-3 font-medium text-gray-500 bg-white border-t border-b"
                    >
                        <div>{{ pagination.current_page }}</div>
                        <div class="mx-2">of</div>
                        <div>{{ pagination.last_page }}</div>
                    </div>
                    <button
                        class="px-3 py-2 text-gray-500 bg-white border rounded-r-md hover:text-gray-700 hover:bg-gray-100"
                        :disabled="
                            pagination.current_page === pagination.last_page
                        "
                        @click="setCurrentPage(pagination.current_page + 1)"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    </main>
</template>

<script lang="ts">
interface QueryParams {
    search?: string;
    sort?: string;
    genre?: string;
    language?: string;
    author?: string;
    page?: number;
}

interface Pagination {
    total: number;
    per_page: number;
    current_page: number;
    last_page: number;
}

export default {
    async setup() {
        const queryParams = ref<QueryParams>({});
        const pagination = ref<Pagination>({
            total: 0,
            per_page: 0,
            current_page: 0,
            last_page: 0,
        });
        const books = ref();

        const cart = useCart().value;

        const sortOptions = await $fetch("/api/sort-options");
        const genres = await $fetch("/api/genres");
        const authors = await $fetch("/api/authors");
        const languages = await $fetch("/api/languages");

        const getBooks = async (endpoint: string = "/api/books") => {
            const url = `${endpoint}`;
            const response = await $fetch(url);

            console.log(url);

            books.value = response.data;
            pagination.value = { ...response };
        };

        const searchBooks = (value: string) =>
            (queryParams.value.search = value);
        const sortBooks = (value: string) => (queryParams.value.sort = value);
        const filterBooksByGenre = (value: string) =>
            (queryParams.value.genre = value);
        const filterBooksByAuthor = (value: string) =>
            (queryParams.value.author = value);
        const filterBooksByLanguage = (value: string) =>
            (queryParams.value.language = value);
        const setCurrentPage = (value: number) =>
            (queryParams.value.page = value);

        const addBookToCart = (book) => {
            const cartItem = !!isItemInCart(book);
            if (!cartItem) {
                cart.push({ ...book, quantity: 1 });
            }
        };

        const isItemInCart = (book) => cart.find((item) => book.id === item.id)

        await getBooks("/api/books?per_page=40");

        watch(
            queryParams,
            async (params) => {
                const url = new URL("/api/books", location.href);
                url.search = new URLSearchParams(params).toString();

                url.search += `&per_page=40`;

                getBooks(url.href);
            },
            {
                deep: true,
            }
        );

        return {
            books,
            pagination,
            sortOptions,
            genres,
            authors,
            languages,
            getBooks,
            searchBooks,
            sortBooks,
            filterBooksByGenre,
            filterBooksByAuthor,
            filterBooksByLanguage,
            setCurrentPage,
            addBookToCart,
            isItemInCart
        };
    },
};
</script>

<style>
</style>