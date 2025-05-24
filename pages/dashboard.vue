<!-- pages/dashboard.vue -->
<template>
  <div class="flex min-h-screen bg-gray-100">
    <!-- Sidebar à esquerda -->
    <Sidebar />

    <!-- Conteúdo principal -->
    <div class="flex-1 p-6 space-y-6 overflow-auto">
      <h1 class="text-2xl font-bold text-gray-800">Dashboard User</h1>

      <!-- Cards de métricas -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard title="Earning" value="$628" icon="💰" />
        <MetricCard title="Share" value="2434" icon="📤" />
        <MetricCard title="Likes" value="1259" icon="👍" />
        <MetricCard title="Rating" value="8,5" icon="⭐" />
      </div>

      <!-- Gráfico de barras + círculo de progresso -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <BarChart class="lg:col-span-2" />
        <ProgressCircle />
      </div>

      <!-- Linha do tempo + calendário -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <LineChart />
        <CalendarMini />
      </div>
    </div>
  </div>
</template>

<script setup>


</script>
