<template>
    <main class="container grid sm:grid-cols-3 gap-6 items-start w-full">
        <Sidebar
            :sortOptions="sortOptions"
            :genres="genres"
            :authors="authors"
            :languages="languages"
        />

        <section class="flex flex-col justify-start sm:col-span-2">
            <h2 class="text-lg">
                Showing <strong>{{ books.length }}</strong> results
            </h2>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
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
                            <p class="font-italic">{{ $convertPrice(book).price }}</p>
                        </div>
                        <div class="text-gray-700 mb-2">
                            <strong>Author</strong>: {{ book.author }}
                        </div>
                        <div class="text-gray-700 mb-2">
                            <strong>Released</strong>: {{ book.published_date }}
                        </div>
                        <div class="text-gray-700">
                            <strong>Pages</strong>:
                            <strong>{{ book.page_count }}</strong> pages
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
        </section>
    </main>
</template>

<script>
export default {
    async setup() {
        const genre = ref("");
        const author = ref("");
        const language = ref("");

        const response = await $fetch("/api/books");

        const books = reactive(response.data);

        const sortOptions = await $fetch("/api/sort-options");

        const genres = await $fetch("/api/genres");

        const authors = await $fetch("/api/authors");

        const languages = await $fetch("/api/languages");

        return {
            books,
            sortOptions,
            genres,
            authors,
            languages,
        };
    },
};
</script>

<style>
</style>