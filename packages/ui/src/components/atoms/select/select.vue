<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { selectVariants } from "./variants";
import { useVirtualList } from "./composables/use-virtual-list";
import type { SelectOption, SelectProps } from "./types";

const props = withDefaults(defineProps<SelectProps>(), {
  searchable: false,
  variant: "default",
});

const emit = defineEmits<{
  (e: "update:modelValue", value?: string): void;
}>();

const open = ref(false);
const query = ref("");
const activeIndex = ref(0);
const root = ref<HTMLElement | null>(null);

const styles = selectVariants({ variant: props.variant });

const filtered = computed(() => {
  if (!props.searchable || !query.value) return props.options;
  return props.options.filter(o =>
    o.label.toLowerCase().includes(query.value.toLowerCase())
  );
});

const selected = computed(() =>
  props.options.find(o => o.value === props.modelValue)
);

/* Virtual list */
const {
  visibleItems,
  offsetTop,
  totalHeight,
  onScroll,
} = useVirtualList(() => filtered.value);

/* Keyboard handling */
function onKey(e: KeyboardEvent) {
  if (!open.value && ["ArrowDown", "Enter"].includes(e.key)) {
    open.value = true;
    e.preventDefault();
    return;
  }

  if (!open.value) return;

  if (e.key === "Escape") {
    open.value = false;
  }

  if (e.key === "ArrowDown") {
    activeIndex.value =
      (activeIndex.value + 1) % filtered.value.length;
  }

  if (e.key === "ArrowUp") {
    activeIndex.value =
      (activeIndex.value - 1 + filtered.value.length) %
      filtered.value.length;
  }

  if (e.key === "Enter") {
    const option = filtered.value[activeIndex.value];
    if (option) select(option);
  }
}

function select(option: SelectOption) {
  emit("update:modelValue", option.value);
  open.value = false;
  query.value = "";
}

function onClickOutside(e: MouseEvent) {
  if (!root.value?.contains(e.target as Node)) {
    open.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", onClickOutside);
  document.addEventListener("keydown", onKey);
});

onUnmounted(() => {
  document.removeEventListener("click", onClickOutside);
  document.removeEventListener("keydown", onKey);
});
</script>

<template>
  <div ref="root" :class="styles.root()">
    <!-- Trigger -->
    <button type="button" :class="styles.trigger()" @click="open = !open" :disabled="disabled">
      <span :class="selected ? 'text-gray-900' : 'text-gray-400'">
        {{ selected?.label ?? placeholder ?? "Select…" }}
      </span>
      <span class="text-gray-400">▾</span>
    </button>

    <!-- Dropdown -->
    <div v-if="open" :class="styles.dropdown()">
      <div v-if="searchable" class="p-2 border-b border-border">
        <input v-model="query" :class="styles.search()" placeholder="Search…" />
      </div>

      <div class="max-h-60 overflow-auto relative" @scroll="onScroll">
        <div :style="{ height: totalHeight + 'px' }" />

        <ul class="absolute top-0 left-0 right-0" :style="{ transform: `translateY(${offsetTop}px)` }">
          <li v-for="(option, i) in visibleItems" :key="option.value" :class="styles.option({
            selected: option.value === modelValue,
            active:
              filtered.indexOf(option) === activeIndex,
          })" @mouseenter="activeIndex = filtered.indexOf(option)" @click="select(option)">
            {{ option.label }}
          </li>
        </ul>
      </div>
    </div>

    <p v-if="helper" :class="styles.helper()">
      {{ helper }}
    </p>
  </div>
</template>
