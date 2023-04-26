interface SortOptions {
    value: string;
    label: string;
}

export default defineEventHandler( async (e) => {
    const sortOptions: SortOptions[] = [
      { value: '', label: 'Default' },
        { value: 'title-asc', label: 'Alphabetic (A-Z)' },
        { value: 'title-desc', label: 'Alphabetic (Z-A)' },
        { value: 'price-asc', label: 'Price (Low to High)' },
        { value: 'price-desc', label: 'Price (High to Low)' },
        { value: 'rating-desc', label: 'Rating (High to Low)' },
        { value: 'rating-asc', label: 'Rating (Low to High)' },
        { value: 'published_date-desc', label: 'Newest' },
        { value: 'published_date-asc', label: 'Oldest' },
      ];

      if (e.node.req.method === 'GET') {
        return sortOptions
      }
} )