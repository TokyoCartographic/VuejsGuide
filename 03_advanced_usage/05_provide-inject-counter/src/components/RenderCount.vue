<template>
  {{ counterContainer.count }}
</template>
<script>
export default {
  // counterContainer を注入する
  inject: ['counterContainer'],
}
</script>
