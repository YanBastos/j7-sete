<template>
  <div
    ref="contadorSection"
    class="w-full animate-gradient bg-gradient-to-r from-purple-800 via-purple-500 to-purple-300 px-4 py-8 md:px-12 md:py-10"
  >
    <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6 md:gap-0">
      <!-- Itens do contador -->
      <ContadorItem 
        :valor="projetos" 
        texto="projetos entregues" 
        prefixo="+"
      />
      <div class="hidden md:block border-r border-white border-opacity-30"></div>
      <ContadorItem 
        :valor="empresas" 
        texto="empresas alavancadas" 
        prefixo="+"
      />
      <div class="hidden md:block border-r border-white border-opacity-30"></div>
      <ContadorItem 
        :valor="avaliacao" 
        texto="avaliação de clientes" 
        :decimal="1"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useIntersectionObserver } from '~/composables/useIntersectionObserver'
import ContadorItem from '~/components/ContadorItem.vue'

// Configurações
const config = {
  projetos: { final: 300, intervalo: 20, duracao: 1500 },
  empresas: { final: 350, intervalo: 20, duracao: 1500 },
  avaliacao: { final: 4.9, intervalo: 20, duracao: 1500 }
}

// Estado reativo
const contadores = ref({
  projetos: 0,
  empresas: 0,
  avaliacao: 0
})

// Referências
const contadorSection = ref(null)
const { observe } = useIntersectionObserver({ threshold: 0.3 })

// Animação do contador
const animarContador = (alvo, valorFinal, intervalo, duracao) => {
  const passos = duracao / intervalo
  const incremento = valorFinal / passos
  let valorAtual = 0
  let contador = 0

  const animacao = setInterval(() => {
    valorAtual += incremento
    contador++
    
    if (contador >= passos) {
      contadores.value[alvo] = valorFinal
      clearInterval(animacao)
    } else {
      contadores.value[alvo] = valorAtual
    }
  }, intervalo)
}

// Iniciar observação quando o componente for montado
onMounted(() => {
  if (contadorSection.value) {
    observe(contadorSection.value, (entry) => {
      if (entry.isIntersecting) {
        Object.keys(config).forEach(key => {
          const { final, intervalo, duracao } = config[key]
          animarContador(key, final, intervalo, duracao)
        })
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