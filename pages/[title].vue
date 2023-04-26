<template>
    <main class="container">
    <div class="flex flex-col items-center mx-auto max-w-3xl" v-if="book">
        <div class="w-full flex justify-center">
            <img src="/images/book-cover.jpeg" alt="book.title" class="h-64 object-contain" />
        </div>

        <h1 class="text-3xl font-semibold my-4">{{ book.title }}</h1>

        <div class="flex items-center justify-center">
            <Rating :rating="book.rating" />
        </div>

        <div class="flex justify-between w-full">
            <div>
                <div>
                    <strong>{{ book.page_count }}</strong> Pages
                    &bull;
                    {{ (new Date(book.published_date)).getFullYear() }}
                    &bull;
                    {{ book.language }}
                </div>
                <p><strong>by:</strong> {{ book.author }}</p>
                <p>{{ book.genres.split(',').join('•') }}</p>
            </div>

            <div class="text-right">
                <p class="text-xl font-semibold mb-2">
                    {{ $convertPrice(book).price }}
                </p>
                <button
                    class="btn btn-primary"
                    @click="addToCart"
                >
                    Add to Cart
                </button>
            </div>
        </div>

        <div class="my-6 flex flex-col items-center justify-center">
            <h2 class="text-xl font-semibold mb-2">Description</h2>
            <p>{{ book.description || 'N/A' }}</p>
        </div>
    </div>
    </main>
</template>
  
  <script>
export default {
    setup(props) {
        const route = useRoute()

        const book = ref()
        const cartItems = ref([]);

        const addToCart = () => {
            const existingItem = cartItems.value.find(
                (item) => item.id === props.book.id
            );
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cartItems.value.push({
                    ...props.book,
                    quantity: 1,
                });
            }
        };

        const removeItem = (index) => {
            cartItems.value.splice(index, 1);
        };

        onMounted(async () => {
            const title = route.params.title

            book.value = await $fetch(`/api/books/${encodeURIComponent(title)}`)
        })

        return {
            book,
            cartItems,
            addToCart,
            removeItem,
        };
    },
};
</script>
  