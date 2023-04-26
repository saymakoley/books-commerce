<template>
    <section class="rounded-xl shadow p-4 sm:sticky sm:top-28 h-auto">
        <FormKit
            type="search"
            placeholder="Search books..."
            suffix-icon="search"
        />

        <button
            class="sm:hidden w-full flex justify-between items-center"
            @click.prevent="toggle"
        >
            <span>Filters</span>
            <svg
                class="w-4 h-4 transition duration-200"
                :class="open ? 'rotate-180' : 'rotate-0'"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="3"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
            </svg>
        </button>

        <div class="sm:block pt-8" v-show="open">
            <FormKit
                type="radio"
                label="Sort books by"
                :options="[
                    'Alphabetical (A-Z)',
                    'Alphabetical (Z-A)',
                    'Newest',
                    'Oldest',
                ]"
            />

            <br />

            <FormKit
                v-if="genres"
                type="select"
                name="genres"
                label="Filter by genres"
                :options="genres"
            />

            <FormKit
                type="select"
                name="author"
                label="Filter by author"
                :options="authors"
            />

            <FormKit
                type="select"
                name="languages"
                label="Filter by language"
                :options="languages"
            />
        </div>
    </section>
</template>

<script>
export default {
    props: {
        genres: {
            type: [Object, Array],
            required: true
        },
        authors: {
            type: [Object, Array],
            required: true
        },
        languages: {
            type: [Object, Array],
            required: true
        },
        genre: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        language: {
            type: String,
            required: true,
        },
    },          
    setup() {
        const open = ref(true);

        const toggle = () => (open.value = !open.value);

        return {
            open,
            toggle,
        };
    },
};
</script>