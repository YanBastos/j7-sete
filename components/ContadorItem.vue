<template>
  <div
    ref="contadorSection"
    class="w-full animate-gradient bg-gradient-to-r from-purple-800 via-purple-500 to-purple-300 px-4 py-8 md:px-12 md:py-10"
  >
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-0">
      <div class="text-center p-4 flex-1">
        <div class="font-bold text-white text-3xl sm:text-4xl md:text-5xl">+{{ Math.floor(projetos) }}</div>
        <div class="font-bold text-white text-xl sm:text-2xl mt-2">projetos entregues</div>
      </div>

      <div class="hidden md:block border-r border-white border-opacity-30"></div>

      <div class="text-center p-4 flex-1">
        <div class="font-bold text-white text-3xl sm:text-4xl md:text-5xl">+{{ Math.floor(empresas) }}</div>
        <div class="font-bold text-white text-xl sm:text-2xl mt-2">empresas alavancadas</div>
      </div>

      <div class="hidden md:block border-r border-white border-opacity-30"></div>

      <div class="text-center p-4 flex-1">
        <div class="font-bold text-white text-3xl sm:text-4xl md:text-5xl">{{ avaliacao.toFixed(1) }}</div>
        <div class="font-bold text-white text-xl sm:text-2xl mt-2">avaliação de clientes</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'

const contadorSection = ref(null)
const { observe } = useIntersectionObserver()

// Valores iniciais
const projetos = ref(0)
const empresas = ref(0)
const avaliacao = ref(0)
const jaAnimou = ref(false) // Controle de estado

const animarContador = (alvo, valorFinal) => {
  const duracao = 1500
  const intervalo = 20
  const passos = duracao / intervalo
  const incremento = valorFinal / passos
  let contador = 0

  const timer = setInterval(() => {
    alvo.value += incremento
    contador++

    if (contador >= passos) {
      alvo.value = valorFinal
      clearInterval(timer)
    }
  }, intervalo)
}

onMounted(() => {
  if (contadorSection.value && !jaAnimou.value) {
    observe(contadorSection.value, (entry) => {
      if (entry.isIntersecting && !jaAnimou.value) {
        jaAnimou.value = true
        animarContador(projetos, 300)
        animarContador(empresas, 350)
        animarContador(avaliacao, 4.9)
      }
    })
  }
})
</script>

<style scoped>
.animate-gradient {
  background: linear-gradient(270deg, #9f5afd, #c4bfdd, #9f5afd);
  background-size: 400% 400%;
  animation: gradient-move 10s linear infinite;
}

@keyframes gradient-move {
  0% { background-position: 0% 50%; }
  100% { background-position: 100% 50%; }
}

@media (max-width: 767px) {
  .animate-gradient { animation-duration: 15s; }
}
</style>