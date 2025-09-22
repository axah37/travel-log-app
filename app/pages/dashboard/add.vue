<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { insertLocation } from "~~/shared/db/schema";

const { handleSubmit, errors } = useForm({
  validationSchema: toTypedSchema(insertLocation),
});

const onSubmit = handleSubmit((values) => {
  console.log(values);
});
</script>

<template>
  <div class="container max-w-md mx-auto">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>

    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField name="name" label="Name" :error="errors.name" />

      <AppFormField
        name="description"
        type="textarea"
        label="description"
        :error="errors.description"
      />

      <AppFormField
        name="lat"
        type="number"
        label="Latitude"
        :error="errors.lat"
      />

      <AppFormField
        name="long"
        type="number"
        label="Latitude"
        :error="errors.lat"
      />

      <div class="flex justify-between">
        <button type="button" class="btn btn-primary btn-outline">
          Cancel
          <Icon name="tabler:arrow-left" size="24" />
        </button>

        <button type="submit" class="btn btn-primary">
          Add
          <Icon name="tabler:circle-plus-filled" size="24" />
        </button>
      </div>
    </form>
  </div>
</template>
