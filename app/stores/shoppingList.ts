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

  async function addItem(listId: RouteParamValue, { productId, name, categoryId }: { productId: number, name: string, categoryId: number }) {
    const response = await $fetch(`/api/shopping-lists/${listId}/items`, {
      method: 'post',
      body: { productId, name, categoryId },
    })

    if (response && list.value) {
      list.value.items.push(response)
    }

    return response
  }

  async function updateItem(listId: number, itemId: number, body: Record<string, any>) {
    const response = await $fetch(`/api/shopping-lists/${listId}/items/${itemId}`, {
      method: 'put',
      body,
    })

    if (response && list.value) {
      const item = list.value.items.find(item => item.id === itemId)

      if (item) {
        Object.assign(item, response)
      }
    }

    return response
  }

  async function deleteItem(listId: number, itemId: number) {
    const response = await $fetch(`/api/shopping-lists/${listId}/items/${itemId}`, {
      method: 'delete',
    })

    if (response && list.value) {
      const index = list.value.items.findIndex(item => item.id === itemId)

      if (index > -1) {
        list.value.items.splice(index, 1)
      }
    }

    return response
  }

  return { getList, list, addItem, updateItem, deleteItem }
})
