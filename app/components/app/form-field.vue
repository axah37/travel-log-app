<script setup lang="ts">
const props = defineProps<{
  label: string;
  name: string;
  error?: string;
  type?: "text" | "textarea" | "number";
}>();
</script>

<template>
  <fieldset>
    <legend class="fieldset-legend">
      {{ label }}
    </legend>
    <Field
      :as="type === 'textarea' ? 'textarea' : 'input'"
      :name="name"
      :type="type || 'text'"
      class="w-full"
      :class="{ 'input-error': error, 'input': !type || type === 'text' || type === 'number', 'textarea': type === 'textarea' }"
    />
    <p v-if="props.error" class="fieldset-label text-error">
      {{ error }}
    </p>
  </fieldset>
</template>
