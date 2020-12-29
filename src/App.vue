<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='scss'>
.page {
  padding: 10px;
  box-sizing: border-box;
}
.shadow{
  box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
  margin: 15px 0;
}
</style>
