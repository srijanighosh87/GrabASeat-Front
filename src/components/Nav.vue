<template>
    <div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
        <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu"
            aria-labelledby="sidebarMenuLabel">
            <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
                <ul class="nav flex-column">
                  <li class="nav-item">
                        <a class="nav-link active" href="/home">
                            Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/bookings">
                            Bookings
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link active" href="/reservation">
                            Reservation
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'vue/Nav-Component'
}
</script>
