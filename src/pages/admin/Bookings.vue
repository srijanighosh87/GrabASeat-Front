<template>
  <div class="container-fluid">
    <div class="row">
      <Menu />
      <Nav />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div class="table-responsive small">
          <table class="table table-striped table-sm">
            <thead>
              <tr>
                <th scope="col">Booking Reference</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Table Number</th>
                <th scope="col">Party Size</th>
                <th scope="col">Booking Date-Time</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="booking in bookings" :key="booking.id">
                <td>{{booking.bookingReference}}</td>
                <td>{{booking.customerName}}</td>
                <td>{{booking.tableNumber}}</td>
                <td>{{booking.partySize}}</td>
                <td>{{booking.comments}}</td>
                <td>
                  <div class="btn-group mr-2">
                    <a href="#" class="btn btn-sm btn-outline-secondary">Update</a>
                    <a href="#" class="btn btn-sm btn-outline-secondary" @click="del(booking.id)">Delete</a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import Nav from '@/components/Nav'
import Menu from '@/components/Menu'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification';


export default
{
  name: 'vue/Bookings-Component',
  components:
  {
    Nav,
    Menu
  },
  setup ()
  {
    // Get toast interface
    const toast = useToast();

    const bookings = ref([]) // waiting for bookings to change its value. once changes, loads in HTML
    
    // show all data
    onMounted(async() => {
      await fetch('https://grabaseatbookingservice.azurewebsites.net/api/Booking/GetAllBookings')
      .then(async response => {
          const isJson = response.headers.get('content-type').includes('application/json')
          const data = isJson && await response.json()
          console.log(data)
          if(!response.ok){
            toast.error(`Error while fetching all booking data : ${data.message}`);
          }
          else{ // do nothing for now
            bookings.value = data.result
          }
        })
        .catch(error => {
          toast.error(`Failed to cancel Reservation with error : ${error}`);
        })
    })

    //Delete
    const del = async (id) => {
      if(confirm('Are you sure you want to cancel the booking?'))
      {
        await fetch(`https://grabaseatbookingservice.azurewebsites.net/api/Booking/${id}`, { method: 'DELETE'})
        .then(async response => {
          const isJson = response.headers.get('content-type').includes('application/json')
          const data = isJson && await response.json()
          console.log(data)
          if(!response.ok){
            toast.error(`Failed to cancel Reservation with error : ${data.message}`);
          }
          else{
            const removedBooking = bookings.value.find(b => b.id == id);
            toast.success(`Reservation ${removedBooking.bookingReference} Cancelled`, {
              timeout: 2000
            });
            bookings.value = bookings.value.filter(b => b.id != id)
          }
        })
        .catch(error => {
          toast.error(`Failed to cancel Reservation with error : ${error}`);
        })
      }
    }

    return{
      bookings,
      del
    }
  }
}
</script>
