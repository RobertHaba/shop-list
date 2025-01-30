export const useProductListStore = defineStore('productList', () => {
  const productList = apiRef({
    route: '/api/products',
    method: 'get',
    defaultValue: undefined,
  })

  async function getProductList() {
    if (productList.value?.length)
      return

    const { data } = await useFetch(`/api/products`)

    productList.value = data.value
  }

  return { getProductList, productList }
})
