<template>
    <!-- HTML markup -->
    <main class="container">
        <div class="flex flex-col items-center py-8">
            <div class="w-full">
                <h1 class="text-3xl font-bold mb-4">Shopping Cart</h1>
                <div class="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul class="divide-y divide-gray-200">
                        <li
                            v-for="(item, index) in cart"
                            :key="item.id"
                            class="flex px-4 py-4 sm:px-6"
                        >
                            <div
                                class="flex-shrink-0 h-12 w-12 rounded-full overflow-hidden"
                            >
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
                                </div>
                                <div class="mt-2 text-sm text-gray-500">
                                    By <strong>{{ item.author }}</strong
                                    >; Released on
                                    <strong>{{ item.published_date }}</strong>
                                </div>
                                <div class="mt-2 flex items-center">
                                    <div class="mr-2 font-medium text-gray-900">
                                        {{ item.price }}
                                    </div>
                                    <button
                                        type="button"
                                        class="text-red-500 hover:text-red-700"
                                        @click="removeBookFromCart(index)"
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
        const cart = useCart().value

        const cartTotal = computed(() => cart.reduce((total, item) => total + parseFloat(item.price.replace('£', '')) * item.quantity, 0))

        const formatPrice = (price) => {
            return "$" + price.toFixed(2);
        };

        const removeBookFromCart = (index) => {
            cart.splice(index, 1);
        };

        const checkout = () => {
            alert("TODO: Implement checkout functionality");
        };

        return {
            cart,
            cartTotal,
            formatPrice,
            removeBookFromCart,
            checkout,
        };
    },
};
</script>
  