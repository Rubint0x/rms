<template>
  <div id="app">
    <mainpage></mainpage>

  </div>
</template>

<script>
import mainpage from './components/main'
import menuItems from './components/menu/item'
export default {
  name: 'App',
  components: {
    mainpage,
    menuItems
  }
}
</script>

<style>

</style>