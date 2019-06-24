<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  height: 100%;
}
body {
  min-height: 100%;
}
main{
  min-height: calc(100vh - 160px);
}
</style>
