<template>
    <div class="flex items-center">
            <svg
            v-for="i in 5" :key="i"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke-width="1.5"
                stroke="#87b23f"
                :class="[i <= fullStars ? 'text-primary' : 'text-transparent', size]"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
            </svg>
        <span class="ml-2 text-gray-700">{{ rating }}</span>
    </div>
</template>
  
  <script>
export default {
    props: {
        rating: {
            type: Number,
            required: true,
        },
        size: {
            type: String,
            default: 'w-6 h-6'
        }
    },
    computed: {
        fullStars() {
            return Math.floor(this.rating);
        },
    },
};
</script>
  
  <style>
/* Add styles here as needed */
</style>
  