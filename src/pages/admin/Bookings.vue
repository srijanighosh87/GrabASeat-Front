<template>
  <Menu />
  <div class="container">
    <div class="page-header" id="banner">
      <div class="row">
        <div class="col-lg-11 col-md-7 col-sm-6" style="padding-top:100px">
          <p class="lead">Booking Overview</p>
        </div>
        <div class="col-lg-1 col-md-7 col-sm-6" style="padding-top:100px">
          <div class="btn-group">
            <a href="#" class="btn btn-ok btn-success btn-sm" @click="del(booking.id)">Reserve</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Three Textboxes After the Reserve Button -->
    <div class="col-lg-12 col-md-7 col-sm-6">
      <div class="row">
        <div class="col-lg-3">
          <div class="form-group custom-form-group row">
            <label for="name" class="col-sm-3">Name</label>
            <div class="col-sm-9">
              <input type="text" class="form-control form-control-sm" id="name" placeholder="Name">
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="form-group custom-form-group row">
            <label for="date" class="col-sm-5">Booking Date</label>
            <div class="col-sm-7">
              <input type="text" class="form-control form-control-sm" id="name" placeholder="Name">
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="form-group custom-form-group">
            <a href="#" class="btn btn-ok btn-success btn-sm" @click="del(booking.id)"><i class="bi bi-search"></i></a>
          </div>
        </div>
      </div>
    </div>



    <div class="bs-docs-section clearfix" style="padding-top:20px">
      <div class="row">
        <div class="col-lg-12">
          <div class="table-responsive big">
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
                  <td>{{ booking.bookingReference }}</td>
                  <td>{{ booking.customerName }}</td>
                  <td>{{ booking.tableNumber }}</td>
                  <td>{{ booking.partySize }}</td>
                  <td>{{ booking.comments }}</td>
                  <td>
                    <div class="btn-group mr-2">
                      <a href="#" class="btn btn-ok btn-info btn-sm" @click="del(booking.id)"><i
                          class="bi bi-pencil"></i></a>
                      <a href="#" class="btn btn-danger btn-sm" @click="del(booking.id)"><i class="bi bi-trash"></i></a>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
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
    setup() {
      // Get toast interface
      const toast = useToast();

      const bookings = ref([]) // waiting for bookings to change its value. once changes, loads in HTML

      // show all data
      onMounted(async () => {
        await fetch('https://grabaseatbookingservice.azurewebsites.net/api/Booking/GetAllBookings')
          .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json')
            const data = isJson && await response.json()
            console.log(data)
            if (!response.ok) {
              toast.error(`Error while fetching all booking data : ${data.message}`);
            }
            else { // do nothing for now
              bookings.value = data.result
            }
          })
          .catch(error => {
            toast.error(`Failed to cancel Reservation with error : ${error}`);
          })
      })

      //Delete
      const del = async (id) => {
        if (confirm('Are you sure you want to cancel the booking?')) {
          await fetch(`https://grabaseatbookingservice.azurewebsites.net/api/Booking/${id}`, { method: 'DELETE' })
            .then(async response => {
              const isJson = response.headers.get('content-type').includes('application/json')
              const data = isJson && await response.json()
              console.log(data)
              if (!response.ok) {
                toast.error(`Failed to cancel Reservation with error : ${data.message}`);
              }
              else {
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

      return {
        bookings,
        del
      }
    }
  }
</script>

<style></style>
