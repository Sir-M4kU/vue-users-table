<script setup lang="ts">
import { useUsersStore } from '../hooks/useUsersStore'
import { SortBy } from '../consts'
import { storeToRefs } from 'pinia'

const store = useUsersStore()
const { filterCountry, sorting } = storeToRefs(store)
const { toggleColors, toggleSortByCountry, handleReset } = store
</script>

<template>
  <header>
    <button @click="toggleColors">
      Colorear filas
  </button>
  <button @click="toggleSortByCountry">
    {{ sorting === SortBy.COUNTRY ? 'No ordenar por pais' : 'Ordenar por pais' }}
  </button>
  <button @click="handleReset">
    Resetear estado
  </button>
  <input placeholder="Filtra por pais" v-model="filterCountry" />
  </header>
</template>

<style scoped>
  header {
    display: flex;
    justify-content: center;
    gap: 16px;
    margin-bottom: 16px;
  }
</style>
