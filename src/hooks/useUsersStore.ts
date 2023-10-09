import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { User, SortBy } from '../types.d'
import { fetchUsers } from '../services/api'
import { SortBy as SORT_BY } from '../consts'

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const loading = ref(true)
  const error = ref(false)
  const showColors = ref(false)
  const sorting = ref<SortBy>(SORT_BY.NONE)
  const filterCountry = ref('')
  const currentPage = ref(1)
  let originalUsers: User[] = []
  
  const filteredUsers = computed(() => {
    return filterCountry.value.length > 0
      ? users.value.filter(user => user.location.country.toLowerCase().includes(filterCountry.value.toLowerCase()))
      : users.value
  })
  const sortedUsers = computed(() => {
    if (sorting.value === SORT_BY.NONE) return filteredUsers.value

    // For extract the propertie and sort it
    const compareProperties: Record<string, (user: User) => string> = {
      [SORT_BY.COUNTRY]: user => user.location.country,
      [SORT_BY.NAME]: user => user.name.first,
      [SORT_BY.LAST]: user => user.name.last,
    }

    return filteredUsers.value.toSorted((a, b) => {
        const extractProperty = compareProperties[sorting.value]
        const compareA = extractProperty(a)
        const compareB = extractProperty(b)
        return compareA.localeCompare(compareB)
    })
  })

  function handleReset () {
    users.value = originalUsers
  }
  function toggleColors () { 
    showColors.value = !showColors.value
  }
  function toggleSortByCountry () {
    const newSortingValue = sorting.value === SORT_BY.NONE ? SORT_BY.COUNTRY : SORT_BY.NONE
    sorting.value = newSortingValue
  }
  function handleDelete (id: string) {
    const filteredUsers = users.value.filter((user) => user.id.value !== id)
    users.value = filteredUsers
  }
  function handleSort (sort: SortBy) {
    sorting.value = sort
  }
  function loadMoreResults () {
    currentPage.value++
  }

  fetchUsers(currentPage.value)
  .then(res => {
      users.value = users.value
      originalUsers = res
    })
    .catch(err => {
      error.value = true
      console.error(err)
    })
    .finally(() => loading.value = false)

  watch(currentPage, async (newPage, prevPage) => {
    if (newPage !== prevPage) {
      try {
        loading.value = true
        const newUsers = await fetchUsers(newPage)
        users.value = users.value.concat(newUsers)
      } catch (err) {
        error.value = true
        console.error(err)
      } finally {
        loading.value = false
      }
    }
  }, { immediate: true })

  return {
    sortedUsers,
    loading,
    error,
    showColors,
    filterCountry,
    sorting,
    handleReset,
    loadMoreResults,
    toggleColors,
    toggleSortByCountry,
    handleDelete,
    handleSort
  }
})
