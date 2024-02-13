<template>
  <Menu />
  <div class="container">
    <div class="page-header" id="banner">
      <div class="row">
        <div class="col-lg-11 col-md-7 col-sm-6" style="padding-top:100px">
          <h3 class="bg-gradient-primary text-white" style="padding-bottom: 1%;">Reserve a Table</h3>
        </div>
      </div>
    </div>
    <div class="col-lg-12">
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name1" class="col-sm-4">Name</label>
            <div class="col-sm-8">
              <input type="text" v-model="name" class="form-control form-control-sm" id="name" placeholder="Name">
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-4">Contact</label>
            <div class="col-sm-8">
              <input type="text" v-model="contact" class="form-control form-control-sm" id="contact"
                placeholder="Mobile no.">
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-4">Party Size</label>
            <div class="col-sm-8">
              <input type="text" v-model="partysize" class="form-control form-control-sm" id="partysize"
                placeholder="How many people?">
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-4">Booking Date</label>
            <div class="col-sm-8">
              <VueDatePicker v-model="date" format="yyyy-MM-dd HH:mm" name="starttime"></VueDatePicker>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-4">Comments</label>
            <div class="col-sm-8">
              <input type="text" v-model="comments" class="form-control form-control-sm" id="comments"
                placeholder="Anything we should know about?">
            </div>
          </div>
        </div>
      </div>

      <!-- save booking button -->
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-9"></label>
            <div class="col-sm-3">
              <a href="#" class="btn btn-ok btn-success btn-sm" @click="createReservation()">  <FontAwesomeIcon icon="fa-brands fa-twitter" />Reserve</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import Menu from '@/components/Menu'
import { ref, onMounted } from 'vue'
import { useToast } from 'vue-toastification';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { useRouter } from 'vue-router'
import BASE_URL from '@/config'

export default {
  name: 'vue/Reservation-Component',
  components:
  {
    Menu,
    BASE_URL
  },
  data() {
    return {
      date: null,
      name: '',
      contact: '',
      partysize: '',
      comments: '',
    }
  },
  setup() {
    // Get toast interface
    const toast = useToast()

    const name = ref('')
    const contact = ref('')
    const partysize = ref('')
    const date = ref('')
    const comments = ref('')
    const router = useRouter()

    const createReservation = async () => {
      console.log(`Creating reservation  ${name.value}, ${contact.value}, ${partysize.value}, ${date.value}, ${comments.value}`);
      const apiUrl = BASE_URL + 'Booking';
      await fetch(apiUrl, 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            CustomerName: name.value,
            CustomerContact: contact.value,
            partysize: partysize.value,
            BookingDateTime: date.value,
            comments: comments.value
          })
        })
        .then(async response => {
          const isJson = response.headers.get('content-type').includes('application/json')
          if (isJson) {
            const data = isJson && await response.json()
            if (!response.ok) {

              if (data.message !== undefined)
                toast.error(`Error while creating reservation : ${data.message}`)
              else
                toast.error(`Error while creating reservation : ${data.errors}`)
            }
            else {
              toast.success(`Reservation updated successfully!`, {
                timeout: 2000
              });
              await router.push('/bookings')
            }
          }
          else {
            const isProblemJson = response.headers.get('content-type').includes('application/problem+json')
            const data = isProblemJson && await response.json()
            if (data.errors) {
              const errorString = Object.entries(data.errors)
                .map(([property, messages]) => `${property}: ${messages.join(', ')}`)
                .join(', ');
              toast.error(`Error while creating reservation : ${errorString}`)
            }
          }


        })
        .catch(error => {
          toast.error(`Error while creating reservation11 : ${error}`);
        })
    };

    return {
      name,
      contact,
      partysize,
      date,
      createReservation,
      comments
    }
  },
  methods: {
    
  }
}
</script>

<style>
/* datepicke style */
.dp__input_icon_pad {
  height: 33px;
  width: 265px
}
</style>