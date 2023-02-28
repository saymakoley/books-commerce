<template>
    <header
        class="fixed top-0 w-full z-50"
        :class="{
            'shadow-lg backdrop-filter backdrop-blur bg-opacity-80': scrolled,
        }"
    >
        <div class="container flex items-center justify-between w-full">
            <nuxt-link to="/"><img src="~/assets/svgs/logo.svg" alt="Books" class="w-32" /></nuxt-link>

            <div class="flex space-x-4 items-center pr-4 sm:pr-0">
                <!-- auth for desktop -->
                <div class="space-x-4 items-center hidden sm:inline-flex">
                    <nuxt-link
                    to="/auth/login"
                    class="btn btn-sm btn-outline-primary"
                    >Login</nuxt-link
                >
                <nuxt-link to="/auth/get-started" class="btn btn-sm btn-primary"
                    >Get Started</nuxt-link
                >
                </div>

                <!-- cart button -->
                <nuxt-link to="/cart" class="relative">
                    <span
                        class="
                            absolute
                            -top-2
                            -right-2
                            rounded-full
                            w-4
                            h-4
                            flex
                            items-center
                            justify-center
                            bg-primary
                            text-white text-sm
                        "
                        >0</span
                    >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="2"
                        stroke="currentColor"
                        class="w-6 h-6"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                        />
                    </svg>
                </nuxt-link>

                <!-- auth for mobile -->
                <div class="relative sm:hidden">
                    <button @click.prevent="toggleMenu" class="pt-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>


                    </button>
                    
                    <transition
      enter-from-class="opacity-0 transform scale-90"
      enter-to-class="opacity-100 scale-100"
      enter-active-class="transition duration-200"
      leave-active-class="transition duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 transform scale-90"
    >
                    <div class="absolute rounded-lg transtion duration-200 p-4 flex flex-col space-y-4 w-32 shadow bg-white top-10 right-2" v-if="isMenuOpen">
                        <nuxt-link
                    to="/auth/login"
                    class="btn btn-sm btn-outline-primary text-center"
                    >Login</nuxt-link
                >
                <nuxt-link to="/auth/get-started" class="btn btn-sm btn-primary text-center"
                    >Get Started</nuxt-link
                >
                    </div>
                    </transition>
                </div>

                
            </div>
        </div>
    </header>
</template>

<script>
export default {
    setup() {
        const scrolled = ref(false);
        const isMenuOpen = ref(false);

        const handleScroll = () => {
            if (window.scrollY > 50) {
                scrolled.value = true;
            } else {
                scrolled.value = false;
            }
        };

        const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value

        onMounted(() => {
            window.addEventListener('scroll', handleScroll)
        })

        return {
            scrolled,
            isMenuOpen,
            toggleMenu
        };
    },
};
</script>