<template>
  <section class="min-h-screen bg-[#231930] text-white flex flex-col items-center py-12 px-4 pt-24">
    <!-- Título -->
    <p class="text-sm mb-2">ACESSE DEMAIS SERVIÇOS</p>
    <h1 class="text-2xl md:text-4xl font-extrabold text-center mb-10">
      CONSULTORIA COMPLETA PARA OS <br />
      SEGMENTOS DE:
    </h1>

    <!-- Container dos Cards -->
    <div class="flex flex-wrap justify-center gap-6 max-w-[1200px]">
      <!-- Card -->
      <div
        v-for="(card, index) in cards"
        :key="index"
        :ref="(el) => (cardRefs[index] = el)"
        class="bg-[#2E203F] rounded-2xl overflow-hidden w-80 h-[550px] flex flex-col opacity-0 scale-90 translate-y-6 transition-all duration-500 ease-out relative z-10"
      >
        <!-- Cabeçalho -->
        <div class="bg-[#3B2D56] h-[70px] flex items-center justify-center">
          <h2 class="text-center font-bold text-xl px-2">
            {{ card.title }}
          </h2>
        </div>

        <!-- Espaço para Imagem -->
        <div class="w-full h-[240px] bg-white"></div>

        <!-- Lista de Serviços -->
        <div class="flex-1 p-4 text-sm">
          <ul class="space-y-2">
            <li v-for="(item, idx) in card.items" :key="idx">• {{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const cards = [
  {
    title: "SUPERMERCADO",
    items: [
      "Gestão Completa das Redes Sociais",
      "Criação de Encartes Profissionais",
      "Automação de Atendimento para WhatsApp",
      "Produção Audiovisual",
      "Tráfego Pago",
    ],
  },
  {
    title: "BARES, RESTAURANTES E DELIVERY",
    items: [
      "Gestão Completa das Redes Sociais",
      "Foto Gourmet",
      "Produção Audiovisual",
      "Gestão de Tráfego",
    ],
  },
  {
    title: "IMOBILIÁRIAS",
    items: [
      "Gestão Completa das Redes Sociais",
      "Produção Audiovisual",
      "Gestão de Tráfego",
    ],
  },
  {
    title: "CLÍNICAS E CONSULTÓRIOS",
    items: [
      "Gestão Completa das Redes Sociais",
      "Produção Audiovisual",
      "Gestão de Tráfego",
      "Identidade Visual",
    ],
  },
  {
    title: "LOJAS DE ROUPAS",
    items: [
      "Gestão Completa das Redes Sociais",
      "Produção de Ensaios Fotográficos",
      "Produção Audiovisual",
      "Gestão de Tráfego",
    ],
  },
];

const cardRefs = ref([]);

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.remove('opacity-0', 'scale-90', 'translate-y-6');
        entry.target.classList.add('opacity-100', 'scale-100', 'translate-y-0');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px'
  });

  // Adiciona um delay progressivo para cada card
  setTimeout(() => {
    cardRefs.value.forEach((el, index) => {
      if (el) {
        setTimeout(() => observer.observe(el), index * 150);
      }
    });
  }, 100);
});
</script>