<template>
  <section class="rounded-xl shadow p-4 sm:sticky sm:top-28 h-auto">
    <FormKit type="search" placeholder="Search books..." suffix-icon="search" />

    <br>

    <FormKit
  type="radio"
  label="Sort books by"
  :options="['Alphabetical (A-Z)', 'Alphabetical (Z-A)', 'Newest', 'Oldest']"  
/>

<br>

    <FormKit
      type="select"
      name="categories"
      label="Filter by category"
      :options="categories"
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
  </section>
</template>

<script>
import books from '~/assets/books'

export default {
  setup() {
    const categories = reactive([...new Set(books.map(book => book.category))])

    const authors = reactive([...new Set(books.map(book => book.author))])

    const languages = reactive([...new Set(books.map(book => book.language))])

    return {
      categories,
      authors,
      languages
    }
  }
}
</script>