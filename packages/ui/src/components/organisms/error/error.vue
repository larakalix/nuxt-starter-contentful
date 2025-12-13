<script setup lang="ts">
import type { ErrorProps } from "./types";

const props = defineProps<ErrorProps>();
</script>

<template>
    <div v-if="props.message"
        class="flex items-start gap-2 rounded-md border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
        <svg class="size-4 flex-shrink-0 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 9v3m0 4h.01M4.93 4.93l14.14 14.14M12 2a10 10 0 100 20 10 10 0 000-20z" />
        </svg>

        <span class="leading-snug">
            {{ props.message }}
        </span>

        <button v-if="props.refresh" @click="props.refresh" class="ml-auto text-red-600 hover:underline">
            Retry
        </button>
    </div>
</template>