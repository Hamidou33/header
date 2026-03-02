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
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
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
      list.addEventListener = (_event: string, listener: EventListenerOrEventListenerObject) => {
        if (typeof list.addListener === 'function') {
          list.addListener(listener as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
        }
      };
      list.removeEventListener = (_event: string, listener: EventListenerOrEventListenerObject) => {
        if (typeof list.removeListener === 'function') {
          list.removeListener(listener as (this: MediaQueryList, ev: MediaQueryListEvent) => any);
        }
      };
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
