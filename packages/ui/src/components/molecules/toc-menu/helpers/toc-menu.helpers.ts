export const headingSelector = "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]";

export const isScrollable = (el: HTMLElement) => {
    const style = getComputedStyle(el);
    const oy = style.overflowY;
    const o = style.overflow;

    return /(auto|scroll)/.test(oy) || /(auto|scroll)/.test(o);
};

export const findScrollRoot = (start: HTMLElement): HTMLElement | null => {
    let el: HTMLElement | null = start;
    while (el) {
        if (isScrollable(el) && el.scrollHeight > el.clientHeight) return el;
        el = el.parentElement;
    }

    return null;
};
