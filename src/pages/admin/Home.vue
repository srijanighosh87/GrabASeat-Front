<template>
<div class="container-fluid">
    <div class="row">
      <Menu />
      <Nav />
      I am home page
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Nav from '@/components/Nav'
import Menu from '@/components/Menu'

export default {
  name: 'vue/Home-Component',
  components:
  {
    Nav,
    Menu
  }
}
</script>
