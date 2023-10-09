<script setup lang="ts">
import type { User } from '../types.d'
import { SortBy } from '../consts'
import { useUsersStore } from '../hooks/useUsersStore'
import { storeToRefs } from 'pinia'

const store = useUsersStore()
const { showColors } = storeToRefs(store)
const { handleDelete, handleSort } = store

defineProps<{
  users: User[]
}>()
</script>

<template>
  <table width="100%">
    <thead>
      <tr>
        <th>Foto</th>
        <th class="filter" @click="() => handleSort(SortBy.NAME)">Nombre</th>
        <th class="filter" @click="() => handleSort(SortBy.LAST)">Apellido</th>
        <th class="filter" @click="() => handleSort(SortBy.COUNTRY)">Pais</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody :class="showColors ? 'show-colors' : ''">
      <tr v-for="user of users" :key="user.id.value">
        <td>
          <img :src="user.picture.thumbnail" :alt="user.name.first" />
        </td>
        <td>
          {{ user.name.first }}
        </td>
        <td>
          {{ user.name.last }}
        </td>
        <td>
          {{ user.location.country }}
        </td>
        <td>
          <button @click="() => handleDelete(user.id.value)">
            Borrar
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
.filter {
  cursor: pointer;
}
.filter:hover {
  background: #555;
}
.show-colors tr:nth-child(odd) {
  background-color: #333;
}
.show-colors tr:nth-child(even) {
  background-color: #555;
}
</style>
