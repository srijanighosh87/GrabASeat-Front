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
              <input type="text" v-model="name" class="form-control form-control-sm" id="name1" placeholder="Name">
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-4">Contact</label>
            <div class="col-sm-8">
              <input type="text" v-model="contact" class="form-control form-control-sm" id="contact" placeholder="Mobile no.">
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-4">Party Size</label>
            <div class="col-sm-8">
              <input type="text" v-model="partysize" class="form-control form-control-sm" id="partysize" placeholder="How many people?">
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
      

      <!-- save booking button -->
      <div class="row mb-4">
        <div class="col-lg-4">
          <div class="form-group custom-form-group row">
            <label for="name2" class="col-sm-9"></label>
            <div class="col-sm-3">
              <a href="#" class="btn btn-ok btn-success btn-sm" @click="reserve()">Reserve</a>
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

export default {
  name: 'vue/Reservation-Component',
  components:
  {
    Nav,
    Menu
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