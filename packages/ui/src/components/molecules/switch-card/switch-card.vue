<script setup lang="ts">
import { Switch } from '../../atoms';


defineProps<{
  modelValue: boolean;
  label: string;
  sublabel?: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
}>();
</script>

<template>
  <button type="button" class="
      flex w-full items-center justify-between gap-4 rounded-xl
      border border-gray-700 p-4 text-left transition
      hover:border-primary/60
      focus:outline-none focus:ring-2 focus:ring-primary/40
    " @click="emit('update:modelValue', !modelValue)">
    <div class="flex items-start gap-3">
      <div class="h-6 w-6 rounded-full bg-gradient-to-br from-yellow-400 to-red-500" />
      <div class="flex flex-col">
        <span class="text-sm font-medium text-white">
          {{ label }}
        </span>
        <span class="text-xs text-gray-400">
          {{ sublabel }}
        </span>
      </div>
    </div>

    <Switch :modelValue="modelValue" variant="success" @update:modelValue="emit('update:modelValue', $event)" />
  </button>
</template>
