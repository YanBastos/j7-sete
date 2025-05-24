<template>
  <nav class="bg-[#0A0118] text-white py-4 px-6 md:px-8 flex justify-between items-center fixed w-full z-50 top-0 left-0 shadow-lg">
    <!-- Logo -->
    <NuxtLink to="/" class="text-xl font-bold z-50">
      <img src="~/assets/images/logo.png" alt="Logo" class="h-10" />
    </NuxtLink>

    <!-- Botão WhatsApp (mobile) -->
    <NuxtLink
      to="http://wa.me//51992908052"
      class="md:hidden tracking-wider text-sm text-white font-bold rounded-full px-4 py-2 bg-[#5241a7] hover:bg-[#6d5bbf] transition-colors duration-300 mr-2"
      target="_blank"
    >
      WHATSAPP
    </NuxtLink>

    <!-- Botão Menu Hamburguer -->
    <button
      @click="toggleMenu"
      class="md:hidden text-white focus:outline-none z-50 p-2"
      aria-label="Menu"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          :d="isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'"
        ></path>
      </svg>
    </button>

    <!-- Links de Navegação (desktop) -->
    <div class="hidden md:flex gap-6 items-center">
      <NuxtLink
        to="/"
        class="text-white hover:text-[#a78bfa] transition-colors duration-300"
        :class="{ 'font-bold text-[#a78bfa]': $route.path === '/' }"
      >
        Início
      </NuxtLink>

      <NuxtLink
        to="/dashboard"
        class="text-white hover:text-[#a78bfa] transition-colors duration-300"
        :class="{ 'font-bold text-[#a78bfa]': $route.path === '/dashboard' }"
      >
        Portfólio
      </NuxtLink>

      <NuxtLink
        to="/sobre"
        class="text-white hover:text-[#a78bfa] transition-colors duration-300"
        :class="{ 'font-bold text-[#a78bfa]': $route.path === '/sobre' }"
      >
        Contato
      </NuxtLink>

      <!-- Botão WhatsApp (desktop) -->
      <NuxtLink
        to="http://wa.me//51992908052"
        class="tracking-wider text-sm text-white font-bold rounded-full px-5 py-2 bg-[#5241a7] hover:bg-[#6d5bbf] transition-colors duration-300 ml-4"
        target="_blank"
      >
        WHATSAPP
      </NuxtLink>
    </div>

    <!-- Menu Mobile (Overlay) -->
    <Transition name="fade">
      <div
        v-show="isOpen"
        class="fixed inset-0 bg-[#0A0118] bg-opacity-95 flex flex-col items-center justify-center space-y-8 z-40 pt-20"
        @click="closeMenu"
      >
        <NuxtLink
          to="/"
          class="text-2xl text-white hover:text-[#a78bfa] transition-colors duration-300 py-2"
          :class="{ 'font-bold text-[#a78bfa]': $route.path === '/' }"
          @click="closeMenu"
        >
          Início
        </NuxtLink>

        <NuxtLink
          to="/dashboard"
          class="text-2xl text-white hover:text-[#a78bfa] transition-colors duration-300 py-2"
          :class="{ 'font-bold text-[#a78bfa]': $route.path === '/dashboard' }"
          @click="closeMenu"
        >
          Portfólio
        </NuxtLink>

        <NuxtLink
          to="/sobre"
          class="text-2xl text-white hover:text-[#a78bfa] transition-colors duration-300 py-2"
          :class="{ 'font-bold text-[#a78bfa]': $route.path === '/sobre' }"
          @click="closeMenu"
        >
          Contato
        </NuxtLink>
      </div>
    </Transition>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue';

const isOpen = ref(false);
const route = useRoute();

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

// Fechar menu ao mudar de rota
watch(() => route.path, () => {
  closeMenu();
});

// Fechar menu ao pressionar ESC
const handleEscape = (e) => {
  if (e.key === 'Escape') {
    closeMenu();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
});
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Desabilita scroll quando menu está aberto */
body.menu-open {
  overflow: hidden;
}
</style>