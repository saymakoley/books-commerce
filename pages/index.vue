<template>
    <main class="container grid sm:grid-cols-3 gap-6 items-start w-full">
        <Sidebar />

        <section class="flex flex-col justify-start sm:col-span-2">
            <h2 class="text-lg">
                Showing <strong>{{ books.length }}</strong> results
            </h2>

            <div class="grid grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
                <div
                    v-for="(book, index) in books"
                    :key="index"
                    class="flex flex-col rounded-lg shadow justify-between"
                >
                    <img
                        class="w-full h-32 object-contain"
                        src="/images/book-cover.jpeg"
                        alt="To Kill a Mockingbird cover"
                    />
                    <div class="p-2">
                        <div class="font-bold text-lg mb-2">
                            {{ book.title }}
                        </div>
                        <div class="text-gray-700 mb-2">
                            <strong>Author</strong>: {{ book.author }}
                        </div>
                        <div class="text-gray-700">
                            <strong>Released</strong>: {{ book.release_date }}
                        </div>
                    </div>

                    <div class="p-2">
                      <button class="btn btn-sm btn-outline-primary w-full mt-4">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>

<script>
import booksArray from "~/assets/books";
export default {
    setup() {
        const books = reactive(booksArray);

        return {
            books,
        };
    },
};
</script>

<style>
</style>