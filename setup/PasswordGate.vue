<template>
  <div v-if="!isAuthenticated" class="password-gate">
    <div class="password-card">
      <div class="header">
        <h1>GEOSA HD Maps</h1>
        <p>{{ instructions }}</p>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <input
            v-model="passwordInput"
            type="password"
            :placeholder="placeholder"
            autocomplete="off"
            autofocus
            class="password-input"
          />
        </div>

        <div v-if="error" class="error-message">
          {{ errorMessage }}
        </div>

        <div class="remember-group">
          <label>
            <input v-model="rememberMe" type="checkbox" />
            <span>{{ rememberText }}</span>
          </label>
        </div>

        <button type="submit" class="submit-button">
          {{ buttonText }}
        </button>
      </form>
    </div>
  </div>

  <slot v-else />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const props = defineProps<{
  password: string;
  lang?: string;
}>();

const isAuthenticated = ref(false);
const passwordInput = ref("");
const rememberMe = ref(true);
const error = ref(false);

const STORAGE_KEY = "slidev_auth_hash";

// RTL language detection
const isRTL = props.lang === "ar" || props.lang === "he" || props.lang === "fa";

// Localized strings
const instructions = isRTL
  ? "أدخل كلمة المرور لعرض العرض التقديمي"
  : "Enter password to view the presentation";

const placeholder = isRTL ? "كلمة المرور" : "Password";
const rememberText = isRTL ? "تذكرني" : "Remember me";
const buttonText = isRTL ? "دخول" : "Enter";
const errorMessage = isRTL ? "كلمة المرور غير صحيحة" : "Incorrect password";

// Simple hash function (SHA-256 equivalent using Web Crypto API)
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function checkStoredAuth() {
  if (!rememberMe.value) return false;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return false;

  const correctHash = await hashPassword(props.password);
  return stored === correctHash;
}

async function handleSubmit() {
  if (passwordInput.value === props.password) {
    error.value = false;

    if (rememberMe.value) {
      const hash = await hashPassword(props.password);
      localStorage.setItem(STORAGE_KEY, hash);
    }

    isAuthenticated.value = true;
  } else {
    error.value = true;
    passwordInput.value = "";
  }
}

onMounted(async () => {
  const isStored = await checkStoredAuth();
  if (isStored) {
    isAuthenticated.value = true;
  }
});
</script>

<style scoped>
.password-gate {
  position: fixed;
  inset: 0;
  background: linear-gradient(135deg, #08353c 0%, #0a3d41 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  font-family: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
}

.password-card {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 16px;
  padding: 3rem;
  max-width: 450px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.header {
  text-align: center;
  margin-bottom: 2rem;
}

.header h1 {
  color: #0070c0;
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
}

.header p {
  color: #666;
  font-size: 0.95rem;
  margin: 0;
}

.input-group {
  margin-bottom: 1rem;
}

.password-input {
  width: 100%;
  padding: 0.875rem 1rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.password-input:focus {
  border-color: #0070c0;
  box-shadow: 0 0 0 3px rgba(0, 112, 192, 0.1);
}

.error-message {
  color: #dc2626;
  font-size: 0.875rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  background: #fee;
  border-radius: 4px;
  text-align: center;
}

.remember-group {
  margin-bottom: 1.5rem;
}

.remember-group label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
}

.remember-group input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.submit-button {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, #0070c0 0%, #0090d0 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 112, 192, 0.3);
}

.submit-button:active {
  transform: translateY(0);
}
</style>
