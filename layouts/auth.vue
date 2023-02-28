<template>
    <section class="bg-gray-50">
        <div
            class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
        >
            <nuxt-link
                to="/"
                class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <img src="~/assets/svgs/logo.svg" alt="Books" class="w-32" />
            </nuxt-link>

            <div
                class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
            >
                <slot />
            </div>
        </div>
    </section>
</template>

<script>
export default {};
</script>