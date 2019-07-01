<template>
    <div></div>
</template>

<script>
export default {
  created () {
    this.$cookies.remove('sessionID')
    this.$router.push({name: 'home'})
  }
}
</script>
