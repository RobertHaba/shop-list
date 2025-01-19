<script setup lang="ts">
interface Props {
  src?: string
  name: string
}

const { name } = defineProps<Props>()

const { initials } = useInitials()

function useInitials() {
  const getInitials = (fullName: string) => {
    const allNames = fullName.trim().split(' ')
    const initials = allNames.reduce((acc, curr, index) => {
      if (index === 0 || index === allNames.length - 1) {
        acc = `${acc}${curr.charAt(0).toUpperCase()}`
      }

      return acc
    }, '')

    return initials
  }

  const initials = getInitials(name)

  return { initials }
}
</script>

<template>
  <CnAvatar>
    <CnAvatarImage v-if="src" :src :alt="`@${name}`" />

    <CnAvatarFallback>{{ initials }}</CnAvatarFallback>
  </CnAvatar>
</template>
