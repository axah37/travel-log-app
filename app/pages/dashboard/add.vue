<script setup lang="ts">
import type { FetchError } from "ofetch";

import { toTypedSchema } from "@vee-validate/zod";
import { CENTER_USA } from "~~/shared/constants";
import { InsertLocation } from "~~/shared/db/schema";

const { $csrfFetch } = useNuxtApp();
const router = useRouter();
const submitError = ref("");
const loading = ref(false);
const submitted = ref(false);
const mapStore = useMapStore();

const { handleSubmit, errors, meta, setErrors, setFieldValue, controlledValues } = useForm({
  validationSchema: toTypedSchema(InsertLocation),
  initialValues: {
    name: "",
    description: "",
    long: (CENTER_USA as [number, number])[0],
    lat: (CENTER_USA as [number, number])[1],
  },
});

const onSubmit = handleSubmit(async (values) => {
  try {
    submitError.value = "";
    loading.value = true;
    await $csrfFetch("/api/locations", {
      method: "post",
      body: values,
    });
    submitted.value = true;
    navigateTo("/dashboard");
  }
  catch (e) {
    const error = e as FetchError;
    if (error.data?.data) {
      setErrors(error.data?.data);
    }
    submitError.value = error.data?.statusMessage || error.statusMessage || "An unknown error occurred.";
  }
  finally {
    loading.value = false;
  }
});

onBeforeRouteLeave(() => {
  if (!submitted.value && meta.value.dirty) {
    // eslint-disable-next-line no-alert
    const confirm = window.confirm("Are you sure you want to leave? All unsave changes will be lost");
    if (!confirm) {
      return false;
    }
  }
  mapStore.addedPoint = null;
  return true;
});

onMounted(() => {
  mapStore.addedPoint = {
    id: 1,
    name: "Added Point",
    description: "",
    long: (CENTER_USA as [number, number])[0],
    lat: (CENTER_USA as [number, number])[1],
  };
});

effect(() => {
  if (mapStore.addedPoint) {
    setFieldValue("lat", mapStore.addedPoint.lat);
    setFieldValue("long", mapStore.addedPoint.long);
  }
});

function formatNumber(value?: number) {
  if (!value) {
    return 0;
  }
  return value.toFixed(5);
}
</script>

<template>
  <div class="container max-w-md mx-auto p-4">
    <div class="my-4">
      <h1 class="text-lg">
        Add Location
      </h1>
      <p class="text-sm">
        A location is a place you have traveled or will travel to. It can be a city, country, state or point of interest. You can add specific times you visited this location after adding it.
      </p>
    </div>

    <div v-if="submitError" class="alert alert-error">
      <span>{{ submitError }}</span>
    </div>

    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <AppFormField
        name="name"
        label="Name"
        :error="errors.name"
        :disabled="loading"
      />

      <AppFormField
        name="description"
        type="textarea"
        label="description"
        :disabled="loading"
        :error="errors.description"
      />
      <p>Drag the <Icon name="tabler:map-pin-filled" class="text-warning" /> marker to your desired location</p>
      <p>Or double click on the map.</p>
      <p class="text-xs text-grey-400">
        Current location: {{ formatNumber(controlledValues.lat) }}, {{ formatNumber(controlledValues.long) }}
      </p>

      <div class="flex justify-between">
        <button
          :disabled="loading"
          type="button"
          class="btn btn-primary btn-outline"
          @click="router.back"
        >
          Cancel
          <Icon name="tabler:arrow-left" size="24" />
        </button>

        <button
          :disabled="loading"
          type="submit"
          class="btn btn-primary"
        >
          Add
          <span v-if="loading" class="loading loading-spinner loading-sm" />
          <Icon
            v-else
            name="tabler:circle-plus-filled"
            size="24"
          />
        </button>
      </div>
    </form>
  </div>
</template>
