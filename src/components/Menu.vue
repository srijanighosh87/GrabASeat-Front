<template>
    <div class="navbar navbar-expand-lg fixed-top bg-primary" data-bs-theme="dark">
      <div class="container">
        <a href="../" class="navbar-brand">Grab-A-Seat</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="./bookings">Bookings</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="./reservation">Reserve A Table</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'vue/Menu-Component'
}
</script>
