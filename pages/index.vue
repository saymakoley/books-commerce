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

            <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 w-full mt-8" v-if="books && books.length > 0">
                <nuxt-link
                    v-for="(book, index) in books"
                    :key="index"
                    class="flex flex-col rounded-lg shadow justify-between"
                    to="/book-details"
                >
                    <img
                        class="w-full h-32 object-contain"
                        src="/images/book-cover.jpeg"
                        alt="To Kill a Mockingbird cover"
                    />
                    <div class="p-2">
                        <div
                            class="flex justify-between items-center space-x-4"
                        >
                            <h4 class="font-bold text-lg mb-2">
                                {{ book.title }}
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
                            class="btn btn-sm btn-outline-primary w-full mt-4"
                        >
                            Add to cart
                        </button>
                    </div>
                </nuxt-link>
            </div>

            <div v-if="!books || books.length === 0" class="flex flex-col items-center justify-center space-y-4">
                <iframe src="https://embed.lottiefiles.com/animation/79572"></iframe>
      <p class="text-lg font-bold">No books found.</p>
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
}

export default {
    async setup() {
        const queryParams = ref<QueryParams>({});

        const response = await $fetch("/api/books");

        const books = ref(response.data);

        const sortOptions = await $fetch("/api/sort-options");
        const genres = await $fetch("/api/genres");
        const authors = await $fetch("/api/authors");
        const languages = await $fetch("/api/languages");

        watch(
            queryParams,
            async (params) => {
                const url = new URL("/api/books", location.href);
                url.search = new URLSearchParams(params).toString();

                const response = await $fetch(url.href);
                books.value = response.data
            },
            {
                deep: true,
            }
        );

        const searchBooks = (value: string) =>
            (queryParams.value.search = value);
        const sortBooks = (value: string) => (queryParams.value.sort = value);
        const filterBooksByGenre = (value: string) =>
            (queryParams.value.genre = value);
        const filterBooksByAuthor = (value: string) =>
            (queryParams.value.author = value);
        const filterBooksByLanguage = (value: string) =>
            (queryParams.value.language = value);

        return {
            books,
            sortOptions,
            genres,
            authors,
            languages,
            searchBooks,
            sortBooks,
            filterBooksByGenre,
            filterBooksByAuthor,
            filterBooksByLanguage,
        };
    },
};
</script>

<style>
</style>