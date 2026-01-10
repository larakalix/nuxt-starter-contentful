<script setup lang="ts">
import { computed, inject } from "vue";
import { swatchVariants } from "../variants";
import type { RadioGroupContext, RadioSwatchProps } from "../types";

const props = defineProps<RadioSwatchProps>();

const ctx = inject<RadioGroupContext>("RADIO_GROUP_CTX");
if (!ctx) {
    throw new Error("<RadioSwatch> must be used inside <RadioGroup>");
}

const checked = computed(() => ctx.modelValue.value === props.value);
const s = computed(() => swatchVariants({ checked: checked.value }));

function select() {
    if (!ctx) return;

    if (ctx.disabled) return;
    ctx.setValue(props.value);
}
</script>

<template>
    <button type="button" role="radio" :aria-checked="checked" :aria-label="ariaLabel" @click="select"
        :disabled="ctx.disabled" class="focus:outline-none">
        <span class="block" :class="[
            s.swatch(),
            colorClass,
            checked ? s.ring() : '',
        ]" />
    </button>
</template>
