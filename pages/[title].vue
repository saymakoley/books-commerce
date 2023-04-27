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
                    v-if="!isBookInCart"
                    class="btn btn-primary"
                    @click.prevent="addToCart()"
                >
                    Add to cart
                </button>
                <button
                v-else
                    class="btn btn-outline-primary"
                    @click.prevent="removeFromCart()"
                >
                    Remove from cart
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

        const cart = useCart().value;

        const addToCart = () => {
            const cartItem = cart.find((item) => book.id === item.id);
            if (!cartItem) {
                cart.push({ ...book, quantity: 1 });
            }
        };

        const removeFromCart = () => {
            const index = cart.findIndex(item => book.id === item.id)

            cart.splice(index, 1);
        };

        const isBookInCart = computed(() => cart.find((item) => book.id === item.id))

        onMounted(async () => {
            const title = route.params.title

            book.value = await $fetch(`/api/books/${encodeURIComponent(title)}`)
        })

        return {
            book,
            cart,
            addToCart,
            removeFromCart,
            isBookInCart
        };
    },
};
</script>
  