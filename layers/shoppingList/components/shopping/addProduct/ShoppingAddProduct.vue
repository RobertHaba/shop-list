<script setup lang="ts">
import { z } from 'zod'

const productListStore = useProductListStore()

productListStore.getProductList()

useForm({ validationSchema: toTypedSchema(z.object({ search: z.string().optional() })) })
</script>

<template>
  <CnDrawer>
    <CnDrawerTrigger>Open</CnDrawerTrigger>

    <CnDrawerContent>
      <div class="mx-auto w-full flex flex-col gap-2 py-6 max-w-lg">
        <CnDrawerHeader class="gap-4">
          <CnDrawerTitle class="text-white">
            {{ $t('shopping.product.addProductToList') }}
          </CnDrawerTitle>

          <SlInput name="search" icon-prepend="tabler:search" hide-label type="search" />
        </CnDrawerHeader>

        <div class="px-4">
          <ul class="flex flex-col gap-2">
            <li v-for="product in productListStore.productList" :key="product.id">
              <ShoppingAddProductListItem :product />
            </li>
          </ul>
        </div>
      </div>
    </CnDrawerContent>
  </CnDrawer>
</template>
