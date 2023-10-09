<script setup lang="ts">
import { useUsersStore } from './hooks/useUsersStore'
import { storeToRefs } from 'pinia'
import UsersList from './components/UsersList.vue'
import Header from './components/Header.vue'

const store = useUsersStore()
const { sortedUsers, loading, error } = storeToRefs(store)
const { loadMoreResults } = store
</script>

<template>
  <h1>Prueba tecnica</h1>
  <Header />
  <main>
    <UsersList v-if="sortedUsers.length > 0" :users="sortedUsers" />
    <span v-if="!error && sortedUsers.length === 0">No hay mas usuarios</span>
    <strong v-if="loading">Cargando...</strong>
    <span v-if="error">Ha ocurrido un error</span>
    <button v-if="!loading && !error" @click="loadMoreResults">Cargar mas resultados</button>
  </main>
</template>

<style scoped>
button {
  margin-top: 10px;
}
</style>
