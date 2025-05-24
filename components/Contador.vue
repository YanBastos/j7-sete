<template>
  <div
    ref="contadorSection"
    class="flex justify-between animate-gradient bg-gradient-to-r from-purple-800 via-purple-500 to-purple-300 pl-50 pr-50 p-10"
  >
    <div class="text-center">
      <div class="font-bold text-white text-4xl">+{{ Math.floor(projetos) }}</div>
      <div class="font-bold text-white text-2xl">projetos entregues</div>
    </div>

    <div class="text-center">
      <div class="font-bold text-white text-4xl">+{{ Math.floor(empresas) }}</div>
      <div class="font-bold text-white text-2xl">empresas alavancadas</div>
    </div>

    <div class="text-center">
      <div class="font-bold text-white text-4xl">{{ avaliacao.toFixed(1) }}</div>
      <div class="font-bold text-white text-2xl">avaliação de clientes</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

// 🔢 Valores finais
const projetosFinal = 300
const empresasFinal = 350
const avaliacaoFinal = 4.9

// 🔢 Valores exibidos
const projetos = ref(0)
const empresas = ref(0)
const avaliacao = ref(0)

// 🔍 Controle
const jaAnimou = ref(false)
const contadorSection = ref(null)

// ⚙️ Configuração da animação
const tempo_intervalo = 20 // intervalo em ms
const tempo_total = 1500   // duração total em ms

function animarContador(variavel, valorFinal) {
  const passos = tempo_total / tempo_intervalo
  const incremento = valorFinal / passos

  const timer = setInterval(() => {
    variavel.value += incremento

    if (variavel.value >= valorFinal) {
      variavel.value = valorFinal
      clearInterval(timer)
    }
  }, tempo_intervalo)
}

// 👀 Observer
let observer

onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !jaAnimou.value) {
          animarContador(projetos, projetosFinal)
          animarContador(empresas, empresasFinal)
          animarContador(avaliacao, avaliacaoFinal)
          jaAnimou.value = true
        }
      })
    },
    {
      threshold: 0.3, // ativa quando 30% estiver visível
    }
  )

  if (contadorSection.value) {
    observer.observe(contadorSection.value)
  }
})

onBeforeUnmount(() => {
  if (observer && contadorSection.value) {
    observer.unobserve(contadorSection.value)
  }
})
</script>

<style scoped>
@keyframes gradient-move {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.animate-gradient {
  background: linear-gradient(270deg, #9f5afd, #c4bfdd, #9f5afd);
  background-size: 400% 400%;
  animation: gradient-move 10s linear infinite;
}
</style>
