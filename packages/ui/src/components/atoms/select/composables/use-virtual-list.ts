import { computed, ref } from "vue";

export function useVirtualList<T>(
    items: () => T[],
    itemHeight = 36,
    containerHeight = 240
) {
    const scrollTop = ref(0);

    const visibleCount = Math.ceil(containerHeight / itemHeight);
    const start = computed(() => Math.floor(scrollTop.value / itemHeight));

    const end = computed(() => start.value + visibleCount + 2);

    const visibleItems = computed(() => items().slice(start.value, end.value));

    function onScroll(e: Event) {
        scrollTop.value = (e.target as HTMLElement).scrollTop;
    }

    return {
        start,
        visibleItems,
        totalHeight: computed(() => items().length * itemHeight),
        offsetTop: computed(() => start.value * itemHeight),
        onScroll,
    };
}
