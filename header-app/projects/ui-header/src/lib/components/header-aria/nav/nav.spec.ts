import { describe, it, expect } from 'vitest';

describe('Nav Layout', () => {
  const computeVisibleCount = (widths: number[], availableWidth: number, gap: number, moreWidth: number) => {
    let total = 0;
    let count = 0;
    for (let i = 0; i < widths.length; i += 1) {
      const nextTotal = total + widths[i] + (count > 0 ? gap : 0);
      const remaining = widths.length - (i + 1);
      if (remaining > 0) {
        const withMore = nextTotal + gap + moreWidth;
        if (withMore > availableWidth) {
          break;
        }
      } else if (nextTotal > availableWidth) {
        break;
      }
      total = nextTotal;
      count += 1;
    }
    return count;
  };

  it('shows all items when space allows', () => {
    const widths = [60, 60, 60];
    const availableWidth = 220;
    const gap = 8;
    const moreWidth = 60;

    expect(computeVisibleCount(widths, availableWidth, gap, moreWidth)).toBe(3);
  });

  it('reserves space for "More" when overflow', () => {
    const widths = [80, 80, 80];
    const availableWidth = 200;
    const gap = 8;
    const moreWidth = 60;

    expect(computeVisibleCount(widths, availableWidth, gap, moreWidth)).toBe(1);
  });
});
