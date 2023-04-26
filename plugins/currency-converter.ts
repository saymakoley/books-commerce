import { Plugin } from '@nuxt/types'

interface Book {
  id: number;
  title: string;
  author: string;
  rating: number;
  voters: string;
  price: any;
  currency: string;
  description: string;
  publisher: string;
  page_count: number;
  genres: string;
  ISBN: string;
  language: string;
  published_date: string;
}

const SAR_TO_GBP = 0.21;

const priceFilter: Plugin = (context, inject) => {
  const convertPrice = (book: Book) => {
    if (book.currency === 'SAR') {
      book.price = book.price * SAR_TO_GBP;
      book.currency = 'GBP';
    }

    book.price = parseFloat(book.price?.toFixed(2));
    book.price = book.price.toLocaleString('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    });
    return book;
  };

  inject('convertPrice', convertPrice);
};

export default priceFilter;
