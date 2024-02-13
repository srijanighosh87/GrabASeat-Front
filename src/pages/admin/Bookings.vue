<template>
  <Menu />
  <div class="container">
    <div class="page-header" id="banner">
      <div class="row">
        <div class="col-lg-11 col-md-7 col-sm-6" style="padding-top:100px">
          <!-- <p class="lead">Booking Overview</p> -->
          <h3 class="bg-gradient-primary text-white" style="padding-bottom: 1%;">Booking Overview</h3>
        </div>
      </div>
    </div>

    <!-- 2 Textboxes After the Reserve Button -->
    <div class="col-lg-12">
      <div class="row">

        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name" class="col-sm-4">Name/Ref No.</label>
            <div class="col-sm-8">
              <input type="text" v-model="name" class="form-control form-control-sm" id="name" placeholder="Name">
            </div>
          </div>
        </div>

        <div class="col-lg-1">
          <div class="form-group custom-form-group">
            <a href="#" class="btn btn-ok btn-success btn-sm" @click="searchByName()"> <i class="bi bi-search"></i></a>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="form-group custom-form-group row">
            <label for="date" class="col-sm-2">Date</label>
            <div class="col-sm-9">
              <VueDatePicker v-model="date" format="yyyy-MM-dd" name="starttime"></VueDatePicker>
            </div>
          </div>
        </div>

        <div class="col-lg-3">
          <div class="form-group custom-form-group">
            <a href="#" class="btn btn-ok btn-success btn-sm" @click="searchByDate()"> <i class="bi bi-search"></i></a>
          </div>
        </div>

        <div class="col-lg-1">
          <router-link :to="`/reservation`" class="btn btn-ok btn-success btn-sm">Reserve</router-link>
        </div>
      </div>
    </div>


    <div class="bs-docs-section clearfix" style="padding-top:3%">
      <div class="row">
        <div class="col-lg-12">
          <div class="table-container">
            <div class="table-responsive big">
              <table class="table table-striped table-sm">
                <thead>
                  <tr>
                    <th scope="col">Reference</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Table Number</th>
                    <th scope="col">Party Size</th>
                    <th scope="col">Booking Datetime</th>
                    <th scope="col">Duration (hrs.)</th>
                    <th scope="col">Comments</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="booking in bookings" :key="booking.id">
                    <td>{{ booking.bookingReference }}</td>
                    <td>{{ booking.customerName }}</td>
                    <td>{{ booking.customerContact }}</td>
                    <td>{{ booking.tableNumber }}</td>
                    <td>{{ booking.partySize }}</td>
                    <td>{{ new Date(booking.bookingStartDateTime).toLocaleString('en-GB', {
                      day: '2-digit', month:
                        '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
                    }) }}</td>
                    <td>2</td>
                    <td>{{ booking.comments }}</td>
                    <td>
                      <div class="btn-group mr-2">
                        <router-link :to="`/updatereservation/${booking.id}/edit`" class="btn btn-ok btn-info btn-sm"><i
                            class="bi bi-pencil"></i></router-link>
                        <a href="#" class="btn btn-danger btn-sm" @click="del(booking.id)"><i class="bi bi-trash"></i></a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="container">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" @click="goToPage(currentPage - 1)" :class="{ 'disabled-link': currentPage === 1 }">Previous</a>
              </li>


              <li v-for="pageNumber in totalpages" :key="index" class="page-item">
                <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
              </li>


              <li class="page-item">
                <a class="page-link" href="#" @click="goToPage(currentPage + 1)" :class="{ 'disabled-link': currentPage === totalpages }">Next</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Menu from '@/components/Menu'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router';

export default
  {
    name: 'vue/Bookings-Component',
    components:
    {
      Nav,
      Menu,
      VueDatePicker
    },
    data() {
      return {
        date: null,
        name: '',
        endIndex: 100,
      }
    },
    setup() {
      // Get toast interface
      const toast = useToast();
      const router = useRouter()

      const bookings = ref([]) // waiting for bookings to change its value. once changes, loads in HTML
      const name = ref('')
      const date = ref('')
      let currentPage = ref(1)
      const itemsPerPage = ref(10)
      let startIndex = ref(0)
      const totalpages = ref(0)
      let isPreviousButtonDisabled = ref(false)


      // show all data
      onMounted(async () => {
        await fetch('https://grabaseatbookingservice.azurewebsites.net/api/Booking/GetAllBookings')
          //await fetch('https://localhost:7000/api/Booking/GetAllBookings')
          .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json')
            const data = isJson && await response.json()
            if (!response.ok) {
              toast.error(`Error while fetching all booking data : ${data.message}`);
            }
            else {
              bookings.value = data.result
              console.log("Loading Bookings page..." + bookings.value.length)

              //pagination logic
              startIndex = (currentPage.value - 1) * itemsPerPage.value
              let endIndex = startIndex + itemsPerPage.value
              console.log(startIndex + ' - ' + endIndex)

              // Make sure endIndex doesn't exceed the length of the bookings array
              endIndex = Math.min(endIndex, bookings.value.length)


              bookings.value = data.result.slice(startIndex, endIndex);
              startIndex = endIndex + 1;
              console.log('StartIndex -> ' + startIndex)
              totalpages.value = Math.floor(bookings.value.length / itemsPerPage.value) + 1
              console.log('Total pages -> ' + totalpages.value)
              isPreviousButtonDisabled.value = true
            }
          })
          .catch(error => {
            toast.error(`Failed to fetch booking data : ${error}`);
          })
      })

      //Delete
      const del = async (id) => {
        if (confirm('Are you sure you want to cancel the booking?')) {
          await fetch(`https://grabaseatbookingservice.azurewebsites.net/api/Booking/${id}`, { method: 'DELETE' })
            //await fetch(`https://localhost:7000/api/Booking/${id}`, { method: 'DELETE' })
            .then(async response => {
              const isJson = response.headers.get('content-type').includes('application/json')
              const data = isJson && await response.json()
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

      const searchByName = async () => {
        console.log('Search clicked. Name:', name.value);
        await fetch('https://grabaseatbookingservice.azurewebsites.net/api/Booking/GetAllBookings')
          //await fetch('https://localhost:7000/api/Booking/GetAllBookings')
          .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json')
            const data = isJson && await response.json()
            if (!response.ok) {
              toast.error(`Error while fetching booking data : ${data.message}`);
            }
            else {
              bookings.value = data.result
            }
          })
          .catch(error => {
            toast.error(`Failed to fetch booking data : ${error}`);
          })
        if (name.value !== '') {
          bookings.value = bookings.value.filter(b => (b.customerName.toLowerCase().includes(name.value.toLowerCase()))
            || (b.bookingReference.toLowerCase() === name.value.toLowerCase()))
        }

      }

      const searchByDate = async () => {
        console.log('Search clicked. Date:', date.value);
        await fetch('https://grabaseatbookingservice.azurewebsites.net/api/Booking/GetAllBookings')
          //await fetch('https://localhost:7000/api/Booking/GetAllBookings')
          .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json')
            const data = isJson && await response.json()
            if (!response.ok) {
              toast.error(`Error while fetching booking data : ${data.message}`);
            }
            else {
              bookings.value = data.result
            }
          })
          .catch(error => {
            toast.error(`Failed to fetch booking data : ${error}`);
          })
        if (date.value !== null && date.value !== '') {
          const enteredDateString = date.value.toISOString().split('T')[0]
          bookings.value = bookings.value.filter(b => {
            //console.log(b.bookingStartDateTime)
            const bookingDate = new Date(b.bookingStartDateTime)
            const bookingDateString = bookingDate.toISOString().split('T')[0]
            //console.log(bookingDateString)
            return bookingDateString === enteredDateString;
          })
        }
      }

      const goToPage = async (currentPageNumber) => {
        console.log("Pagination")
        currentPage.value = currentPageNumber
        console.log("Currentpage ->" + currentPage.value)
        if(currentPage.value === 1) isPreviousButtonDisabled.value = true
        
        await fetch('https://grabaseatbookingservice.azurewebsites.net/api/Booking/GetAllBookings')
          .then(async response => {
            const isJson = response.headers.get('content-type').includes('application/json')
            const data = isJson && await response.json()
            if (!response.ok) {
              toast.error(`Error while fetching booking data : ${data.message}`);
            }
            else {
              bookings.value = data.result

              //pagination logic
              let startIndex = (currentPage.value - 1) * itemsPerPage.value
              let endIndex = startIndex + itemsPerPage.value
              console.log(startIndex + ' - ' + endIndex)

              // Make sure endIndex doesn't exceed the length of the bookings array
              endIndex = Math.min(endIndex, bookings.value.length)


              bookings.value = data.result.slice(startIndex, endIndex);
              startIndex = endIndex + 1;

              console.log("Currentpage ->" + currentPage.value)
            }
          })
          .catch(error => {
            toast.error(`Failed to fetch booking data : ${error}`);
          })
        if (date.value !== null && date.value !== '') {
          const enteredDateString = date.value.toISOString().split('T')[0]
          bookings.value = bookings.value.filter(b => {
            const bookingDate = new Date(b.bookingStartDateTime)
            const bookingDateString = bookingDate.toISOString().split('T')[0]
            return bookingDateString === enteredDateString;
          })
        }
      }

      return {
        bookings,
        del,
        searchByName,
        name,
        date,
        searchByDate,
        goToPage,
        currentPage,
        totalpages
      }
    }
  }

</script>

<style>
/* datepicke style */
.dp__input_icon_pad {
  height: 33px;
  width: 235px
}

.table-container {
  max-height: 60vh;
  /* Adjust the height as needed */
  overflow-y: auto;
}

.disabled-link {
  pointer-events: none; /* Disable pointer events */
  color: #6c757d; /* Adjust color for disabled state */
}
</style>
