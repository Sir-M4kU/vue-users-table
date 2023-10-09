import type { APIResult } from '../types.d'

export async function fetchUsers (page: number) {
  const api = await fetch(`https://randomuser.me/api?results=10&seed=m4ku&page=${page}`)
  if (!api.ok) throw new Error('Ocurrio un error al obtener los datos')
  const resJSON: APIResult = await api.json()
  return resJSON.results
}
