<template>
  <div></div>
</template>

<script setup>
const user = useStrapiUser();
const route = useRoute();
const projectId = route.params.id;

const { data: company, refresh } = await useAsyncData("company", () =>
  find("companies", projectId)
);
</script>
