<script setup lang="ts">
import { computed, inject } from "vue";
import type { RadioGroupContext, RadioGroupProps, RadioOptionProps } from "../types";
import { radioOptionVariants } from "../variants";

const props = defineProps<RadioOptionProps>();

const ctx = inject<RadioGroupContext>("RADIO_GROUP_CTX");
if (!ctx) {
    throw new Error("<RadioOption> must be used inside <RadioGroup>");
}

const checked = computed(() => ctx.modelValue.value === props.value);

const styles = computed(() =>
    radioOptionVariants({
        variant: ctx.variant as RadioGroupProps["variant"],
        checked: checked.value,
    })
);

function select() {
    if (!ctx) return;

    if (ctx.disabled) return;
    ctx.setValue(props.value);
}
</script>

<template>
    <div :class="styles.item()">
        <button type="button" role="radio" :aria-checked="checked" @click="select" :disabled="ctx.disabled"
            :class="styles.button()">
            <!-- dot -->
            <span v-if="ctx.variant !== 'swatch'" :class="styles.dotWrap()">
                <span v-if="checked" :class="styles.dot()" />
            </span>

            <!-- content -->
            <span v-if="ctx.variant !== 'swatch'" :class="styles.text()">
                <span v-if="label" :class="styles.label()">{{ label }}</span>
                <span v-if="description" :class="styles.description()">
                    {{ description }}
                </span>

                <!-- expansion ONLY in list variant -->
                <span v-if="$slots.expansion && ctx.variant === 'list' && checked" :class="styles.expansion()">
                    <slot name="expansion" />
                </span>
            </span>

            <!-- swatch uses a slot or separate component -->
            <slot v-else />
        </button>
    </div>
</template>
