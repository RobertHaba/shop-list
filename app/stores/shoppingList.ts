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

  async function addItem(listId: RouteParamValue, productId: number) {
    const response = await $fetch(`/api/shopping-lists/${listId}/items`, {
      method: 'post',
      body: { productId },
    })

    if (response && list.value) {
      list.value.items.push(response)
    }

    return response
  }

  return { getList, list, addItem }
})
