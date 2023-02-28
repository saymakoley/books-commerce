<template>
    <!-- HTML markup -->
    <main class="container">
        <div class="flex flex-col items-center py-8">
            <div class="w-full">
                <h1 class="text-3xl font-bold mb-4">Shopping Cart</h1>
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul class="divide-y divide-gray-200">
                        <li
                            v-for="(item, index) in cartItems"
                            :key="item.id"
                            class="flex px-4 py-4 sm:px-6"
                        >
                            <div class="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden">
                                <img
                                    class="w-full h-full object-cover"
                                    src="/images/book-cover.jpeg"
                                    :alt="item.title"
                                />
                            </div>
                            <div class="ml-3 flex-1">
                                <div class="flex items-center justify-between">
                                    <h2
                                        class="text-base font-semibold text-gray-900"
                                    >
                                        {{ item.title }}
                                    </h2>
                                    <div class="flex items-center">
                                        <button
                                            type="button"
                                            class="text-gray-500 hover:text-gray-700"
                                            @click="decreaseQuantity(index)"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-6 h-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M18 12H6"
                                                />
                                            </svg>
                                        </button>
                                        <span class="mx-2 text-gray-700">{{
                                            item.quantity
                                        }}</span>
                                        <button
                                            type="button"
                                            class="text-gray-500 hover:text-gray-700"
                                            @click="increaseQuantity(index)"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke-width="1.5"
                                                stroke="currentColor"
                                                class="w-6 h-6"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    d="M12 6v12m6-6H6"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                                <div class="mt-2 text-sm text-gray-500">
                                    By <strong>{{ item.author }}</strong>; Released on <strong>{{ item.release_date }}</strong>
                                </div>
                                <div class="mt-2 flex items-center">
                                    <div class="mr-2 font-medium text-gray-900">
                                        {{ formatPrice(item.price) }}
                                    </div>
                                    <button
                                        type="button"
                                        class="text-red-500 hover:text-red-700"
                                        @click="removeItem(index)"
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="mt-4 flex items-center justify-between">
                    <a href="#" class="text-primary hover:text-primary-dark"
                        >Continue Shopping</a
                    >
                    <div class="ml-4 font-medium text-gray-900">
                        {{ formatPrice(cartTotal) }}
                    </div>
                </div>
                <div class="mt-4 flex items-center justify-end">
                    <button
                        type="button"
                        class="btn btn-primary"
                        @click="checkout"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    </main>
</template>
  
  <script>
export default {
    setup() {
        const cartItems = ref([
            {
                id: 1,
                title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    language: "English",
    category: "Literary Fiction",
    release_date: "April 10, 1925",
                price: 19.99,
                quantity: 1,
            },
            {
                id: 2,
                title: "Moby-Dick",
    author: "Herman Melville",
    language: "English",
    category: "Adventure",
    release_date: "October 18, 1851",
                price: 24.99,
                quantity: 1,
            },
            {
                id: 3,
                title: "One Hundred Years of Solitude",
    author: "Gabriel García Márquez",
    language: "Spanish",
    category: "Magical Realism",
    release_date: "May 30, 1967",
                price: 29.99,
                quantity: 1,
            },
        ]);

        const cartTotal = computed(() => {
            return cartItems.value.reduce((total, item) => {
                return total + item.price * item.quantity;
            }, 0);
        });

        const formatPrice = (price) => {
            return "$" + price.toFixed(2);
        };

        const increaseQuantity = (index) => {
            cartItems.value[index].quantity++;
        };

        const decreaseQuantity = (index) => {
            if (cartItems.value[index].quantity > 1) {
                cartItems.value[index].quantity--;
            }
        };

        const removeItem = (index) => {
            cartItems.value.splice(index, 1);
        };

        const checkout = () => {
            alert("TODO: Implement checkout functionality");
        };

        return {
            cartItems,
            cartTotal,
            formatPrice,
            increaseQuantity,
            decreaseQuantity,
            removeItem,
            checkout,
        };
    },
};
</script>
  