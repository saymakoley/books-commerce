<template>
    <main class="container">
    <div class="flex flex-col items-center mx-auto max-w-3xl">
        <div class="w-full flex justify-center">
            <img src="/images/book-cover.jpeg" alt="book.title" class="h-64 object-contain" />
        </div>

        <h1 class="text-3xl font-semibold my-4">{{ book.title }}</h1>

        <div class="flex justify-between w-full">
            <div>
                <p><strong>Author:</strong> {{ book.author }}</p>
                <p><strong>Language:</strong> {{ book.language }}</p>
                <p><strong>Category:</strong> {{ book.category }}</p>
                <p><strong>Release Date:</strong> {{ book.release_date }}</p>
            </div>

            <div class="text-right">
                <p class="text-xl font-semibold">
                    {{ formatPrice(book.price) }}
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

        <div class="my-6 flex flex-col items-center justify-center">
            <h2 class="text-xl font-semibold mb-2">Reviews</h2>
            <p>No reviews yet.</p>
        </div>
    </div>
    </main>
</template>
  
  <script>
export default {
    props: {
        book: {
            type: Object,
            required: true,
            default: () => ({
                title: "Moby-Dick",
                author: "Herman Melville",
                language: "English",
                category: "Adventure",
                release_date: "October 18, 1851",
                image: "https://example.com/mobydick.jpg",
                price: 10.99,
            }),
        },
    },
    setup(props) {
        const cartItems = ref([]);

        const formatPrice = (price) => {
            return "$" + price.toFixed(2);
        };

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

        return {
            cartItems,
            formatPrice,
            addToCart,
            removeItem,
        };
    },
};
</script>
  