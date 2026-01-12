<template>
  <PasswordGate v-if="hasPassword" :password="password" :lang="lang" />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import PasswordGate from "./setup/PasswordGate.vue";

// Get password from environment variable
const password = import.meta.env.VITE_SLIDEV_PASSWORD || "";
const hasPassword = computed(() => password && password.trim() !== "");

// Get language from route for RTL support
const route = useRoute();
const lang = computed(() => {
  const path = route.path;
  const match = path.match(/\/(ar|en|he|fa)\//);
  return match ? match[1] : "en";
});
</script>
