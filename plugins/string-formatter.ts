import { Plugin } from '@nuxt/types'

const stringFormatter: Plugin = (context, inject) => {
    const clipText = (text: string, index: number) => {
        if (text.length > index) {
          return text.slice(0, index) + '...';
        } else {
          return text;
        }
      }

  inject('clipText', clipText);
};

export default stringFormatter;
