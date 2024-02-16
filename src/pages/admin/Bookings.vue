<template>
  <Menu />
  <div class="container">
    <div class="page-header" id="banner">
      <div class="row">
        <div class="col-lg-11 col-md-7 col-sm-6" style="padding-top:100px">

          <h3 class="bg-gradient-primary text-white" style="padding-bottom: 1%;">Booking Overview</h3>
        </div>
      </div>
    </div>

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

        <div class="col-lg-3">
          <div class="form-group custom-form-group row">
            <label for="date" class="col-sm-2">Date</label>
            <div class="col-sm-9">
              <VueDatePicker v-model="date" format="yyyy-MM-dd" name="starttime"></VueDatePicker>
            </div>
          </div>
        </div>

        <div class="col-lg-4">
          <div class="form-group custom-form-group">
            <a href="#" class="btn btn-ok btn-success btn-sm" @click="search()"> <i class="bi bi-search"></i></a>
          </div>
        </div>
        <div class="col-lg-1">
          <router-link :to="`/reservation`" class="btn btn-ok btn-success btn-sm">Reserve</router-link>
        </div>
      </div>

      <div class="row">
        <div v-if="filterData" class="mt-2">
        <span class="badge bg-info" style="padding: 4px 8px; font-size: 12px; line-height: 1.5;">{{ filterData }}
          <button class="btn btn-link btn-sm" @click="clearFilter">x</button>
        </span>
      </div>
      </div>
    </div>



    <div class="bs-docs-section clearfix" style="padding-top:3%">
      <div class="container col-lg-12">
        <div class="row justify-content-end">
          <div class="col-lg-11">
          </div>
          <div class="col-lg-1">
            <span style="font-weight: bold;">Count:</span>
            <a href="#" class="btn btn-warning rounded-circle p-0"
              style="width: 30px; height: 30px; line-height: 1.5; margin-bottom: 10%; margin-left: 5%;"> {{ totalRecords
              }}</a>
          </div>
        </div>
      </div>
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

          <!-- pagination -->

          <div class="container col-lg-12">
            <div class="container col-lg-3">
              <ul class="pagination">
                <li class="page-item">
                  <a class="page-link" href="#" @click="goToPage(1)" :class="{ 'disabled-link': currentPage === 1 }">
                    << </a>
                </li>

                <li class="page-item">
                  <a class="page-link" href="#" @click="goToPage(currentPage - 1)"
                    :class="{ 'disabled-link': currentPage === 1 }"> Prev </a>
                </li>

                <li v-for="pageNumber in pagesToShow" :key="pageNumber" class="page-item">
                  <a class="page-link" href="#" @click="goToPage(pageNumber)"
                    :class="{ 'disabled-link': pageNumber === '...', 'selected-page': currentPage === pageNumber && typeof pageNumber === 'number' }">{{
                      pageNumber }}</a>
                </li>

                <li class="page-item">
                  <a class="page-link" href="#" @click="goToPage(currentPage + 1)"
                    :class="{ 'disabled-link': currentPage === totalpages }"> Next </a>
                </li>

                <li class="page-item">
                  <a class="page-link" href="#" @click="goToPage(totalpages)"
                    :class="{ 'disabled-link': currentPage === totalpages }"> >> </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
import Menu from '@/components/Menu'
import { ref, onMounted, watch } from 'vue'
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router';
import BASE_URL from '@/config';

export default
  {
    name: 'vue/Bookings-Component',
    components:
    {
      Nav,
      Menu,
      VueDatePicker,
      BASE_URL
    },
    data() {
      return {
        date: null,
        name: '',
        endIndex: 100,
        fetchPastBookings: false
      }
    },
    setup() {
      // Get toast interface
      const toast = useToast();
      const router = useRouter()

      const bookings = ref([]) // waiting for bookings to change its value. once changes, loads in HTML
      const searchresult = ref([])
      const name = ref('')
      const date = ref('')
      let currentPage = ref(1)
      const itemsPerPage = ref(10)
      let startIndex = ref(0)
      const totalpages = ref(0)
      const totalRecords = ref(0)
      const fetchPastBookings = ref(false)
      let pagesToShow = ref([])
      let filterData = ref('')


      // show all data
      onMounted(async () => {
        await searchBookings(1);
      })

      //Delete
      const del = async (id) => {
        if (confirm('Are you sure you want to cancel the booking?')) {
          const apiUrl = BASE_URL + `Booking/${id}`;
          await fetch(apiUrl, { method: 'DELETE' })
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

                //call API again
                await searchBookings(1);
              }
            })
            .catch(error => {
              toast.error(`Failed to cancel Reservation with error : ${error}`);
            })
        }
      }

      //search
      const search = async () => {
        debugger
        if (date.value !== '' || name.value !== '') {
          currentPage.value = 1
          let apiUrl = BASE_URL + `Booking/SearchBookings`
          let filterVal = ''
          if (name.value !== '') {
            filterData.value = `Name/Ref = ${name.value}`
          }
          if (date.value !== null && date.value !== '') {
            filterVal += `?nameOrRef=${name.value}&date=${date.value.toISOString().split('T')[0]}`;
            filterData.value = filterData.value + ` , Date= ${date.value.toISOString().split('T')[0]}`
          }
          else filterVal += `?nameOrRef=${name.value}`;
          await fetch(apiUrl + filterVal)
            .then(async response => {
              const isJson = response.headers.get('content-type').includes('application/json')
              const data = isJson && await response.json()
              if (!response.ok) {
                toast.error(`Error while fetching booking data : ${data.message}`);
              }
              else {
                searchresult.value = data.result.allDtos

                startIndex.value = 0;
                let endIndex = 10;
                console.log(searchresult.value)
                console.log(searchresult.value.slice(startIndex.value, endIndex))
                bookings.value = searchresult.value.slice(startIndex.value, endIndex);

                totalRecords.value = data.result.count

                totalpages.value = Math.floor(data.result.count / itemsPerPage.value);
                if (data.result.count % itemsPerPage.value !== 0) {
                  totalpages.value += 1;
                }
                console.log(filterData.value)
                calculatePagesToShow(pagesToShow)
              }
            })
            .catch(error => {
              toast.error(`Failed to fetch booking data : ${error}`);
            })
        }
      }

      //pagination - go to a specific page
      const goToPage = async (currentPageNumber) => {
        console.log("clicked page: " + currentPageNumber)
        console.log(filterData.value)
        debugger
        if (filterData.value === '' || filterData.value === undefined) {
          const apiUrl = BASE_URL + `Booking/GetPaginatedbookings?fetchPastBookings=false&numberOfItemsPerPage=${itemsPerPage.value}&pageNumber=${currentPageNumber}`;
          await fetch(apiUrl)
            .then(async response => {
              debugger
              currentPage.value = currentPageNumber
              const isJson = response.headers.get('content-type').includes('application/json')
              const data = isJson && await response.json()
              if (!response.ok) {
                toast.error(`Error while fetching all booking data : ${data.message}`);
              }
              else {
                bookings.value = data.result.allDtos
                totalpages.value = Math.floor(data.result.count / itemsPerPage.value);
                if (data.result.count % itemsPerPage.value !== 0) {
                  totalpages.value += 1;
                }
                calculatePagesToShow(pagesToShow)
              }
            })
            .catch(error => {
              toast.error(`Failed to fetch booking data : ${error}`);
            })
        }
        else {
          currentPage.value = currentPageNumber
          startIndex.value = (currentPageNumber - 1) * itemsPerPage.value;
          let endIndex = startIndex.value + itemsPerPage.value;
          endIndex = Math.min(endIndex, searchresult.value.length);
          console.log(searchresult.value)
          console.log(searchresult.value.slice(startIndex.value, endIndex))
          bookings.value = searchresult.value.slice(startIndex.value, endIndex);
          calculatePagesToShow(pagesToShow)
        }

      }

      // search for all bookings
      const searchBookings = async (pageNumber) => {
        const apiUrl = BASE_URL + `Booking/GetPaginatedbookings?fetchPastBookings=false&numberOfItemsPerPage=${itemsPerPage.value}&pageNumber=${pageNumber}`;
        await fetch(apiUrl)
          .then(async response => {
            debugger
            const isJson = response.headers.get('content-type').includes('application/json')
            const data = isJson && await response.json()
            if (!response.ok) {
              toast.error(`Error while fetching all booking data : ${data.message}`);
            }
            else {
              bookings.value = data.result.allDtos
              totalRecords.value = data.result.count
              totalpages.value = Math.floor(data.result.count / itemsPerPage.value);
              if (data.result.count % itemsPerPage.value !== 0) {
                totalpages.value += 1;
              }
              calculatePagesToShow(pagesToShow)
            }
          })
          .catch(error => {
            toast.error(`Failed to fetch booking data : ${error}`);
          })
      }

      const calculatePagesToShow = (pagesToShow) => {
        debugger
        console.log("totalpages : " + totalpages.value)
        console.log("currentPage : " + currentPage.value)
        if (totalpages.value < 5) {
          pagesToShow.value = Array.from({ length: totalpages.value }, (_, index) => index + 1)
          return
        }
        else {
          // If current page is 4 or more and there are more than 5 pages, show the first 2 and last 2 pages
          const specialPages = [1, 2, totalpages.value - 1, totalpages.value];
          const ExtendedSpecialPages = [1, 2, 3, totalpages.value - 2, totalpages.value - 1, totalpages.value];

          if (specialPages.includes(currentPage.value)) {
            pagesToShow.value = [1, 2, '...', totalpages.value - 1, totalpages.value];
            return
          }
          if (ExtendedSpecialPages.includes(currentPage.value) && currentPage.value == 3) {
            pagesToShow.value = [1, 2, 3, '...', totalpages.value - 1, totalpages.value];
            return
          }
          if (ExtendedSpecialPages.includes(currentPage.value) && currentPage.value == totalpages.value - 2) {
            pagesToShow.value = [1, 2, '...', totalpages.value - 2, totalpages.value - 1, totalpages.value];
            return
          }
          else {
            pagesToShow.value = [1, 2, '...', currentPage.value, '...', totalpages.value - 1, totalpages.value];
            return
          }
        }
      }

      // Function to clear the filter
      const clearFilter = () => {
        debugger
        filterData.value = '';
        searchBookings(1)
      };

      return {
        bookings,
        del,
        name,
        date,
        search,
        goToPage,
        currentPage,
        totalpages,
        fetchPastBookings,
        pagesToShow,
        totalRecords,
        filterData,
        clearFilter
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
  pointer-events: none;
  color: #6c757d;
}

.page-link.selected-page {
  background-color: #cce5ff;
  color: #007bff;
  font-size: 1.2em;
  /* Adjust the font size as needed */
  padding: 4px 12px;
  /* Add padding for a larger area */
  border-radius: 8px;
  /* Optional: Add border-radius for rounded corners */
}

.page-link {
  background-color: #007bff;
  /* Bootstrap primary color */
  color: #fff;
  /* White text */
  border-color: #007bff;
  /* Border color */
}

.page-link:hover,
.page-link:focus {
  background-color: #0056b3;
  /* Darken the color on hover or focus */
  color: #fff;
  /* White text */
  border-color: #0056b3;
  /* Darken the border color on hover or focus */
}
</style>
