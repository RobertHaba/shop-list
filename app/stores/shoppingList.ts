import type { RouteParamValue } from 'vue-router'

export const useShoppingListStore = defineStore('shoppingList', () => {
  const list = apiRef({
    route: '/api/shopping-lists/:listId',
    method: 'get',
    defaultValue: undefined,
  })

  async function getList(id: RouteParamValue) {
    const { data } = await useFetch(`/api/shopping-lists/${id}`)

    list.value = data.value
  }

  return { getList, list }
})
