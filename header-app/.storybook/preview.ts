import type { Preview } from '@storybook/angular';

const ensureMatchMedia = () => {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as unknown as MediaQueryList;
    return;
  }

  const testQuery = window.matchMedia('(min-width: 0px)');
  if (typeof testQuery.addEventListener === 'function') {
    return;
  }

  const originalMatchMedia = window.matchMedia.bind(window);
  window.matchMedia = (query: string) => {
    const list = originalMatchMedia(query);
    if (typeof list.addEventListener !== 'function') {
      list.addEventListener = () => {};
      list.removeEventListener = () => {};
    }
    return list;
  };
};

ensureMatchMedia();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
