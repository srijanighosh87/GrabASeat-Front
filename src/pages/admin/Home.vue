<template>
  <div class="container-fluid">
    <div class="row">
      <!-- Assuming Menu is a component -->
      <Menu />

      <div class="container position-relative">
        <div class="page-header" id="banner">
          <div class="row">
            <div class="col-lg-12 col-md-12 col-sm-12 p-0">
              <!-- Food Image with text overlay -->
              <div class="position-fixed">
                <img src="../../resources/homepage-image2.jpg" alt="Food Image" class="img-fluid" style="max-width: 100%;">

                <!-- Text overlay -->
                <div class="text-overlay">
                  <h1 class="bg-gradient-primary text-white d-inline-block p-3 shadow" style="font-size: 5em;">Grab A Seat <i class="bi bi-egg-fried"></i></h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.text-overlay {
  position: absolute;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
}

.shadow {
  text-shadow: 10px 2px 10px rgba(17, 17, 17, 0.5);
}

.text-black {
  color: black;
}
</style>


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
