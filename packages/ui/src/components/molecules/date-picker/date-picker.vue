<style scoped lang="css">
@import './date-picker.css';
</style>

<script setup lang="ts">
import { VueDatePicker } from '@vuepic/vue-datepicker';
import { ref } from "vue";
import type { DatePickerProps } from './types';

const props = defineProps<DatePickerProps>();

const value = ref(props.modelValue);

const emit = defineEmits(["update:modelValue"]);

function onSelect(date: Date | null) {
  const isDate = date instanceof Date && !isNaN(date.getTime());
  if (!isDate) return;
  emit("update:modelValue", date);
}
</script>

<template>
  <div>
    <VueDatePicker v-model="value" :disabled="props.disabled" :range="props.range" :month-picker="props.monthPicker"
      :year-picker="props.yearPicker" :quarter-picker="props.quarterPicker" :week-picker="props.weekPicker"
      :week-numbers="props.weekNumbers" :multi-calendars="props.multiCalendars" :time-picker="props.timePicker"
      :multiDates="props.multiDates" :arrow-navigation="props.arrowNavigation" :day-names="props.dayNames"
      :class="props.class" @update:modelValue="onSelect"></VueDatePicker>
  </div>
</template>