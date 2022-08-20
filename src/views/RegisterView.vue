<script>
import axios from 'axios'
import {config} from '../config';

export default {

  data() {
    return {
      data: {
        name: '',
        email: '',
        password: ''
      },
      errors: '',
    }
  },
  methods: {
    register() {

      axios.post(config.base_url+'register', this.data).then((response)=>{

        // console.log(response);
        this.$router.push('/');

      }).catch(error => {
          let message;
          if (axios.isAxiosError(error) && error.response) {
            message = error.response.data.message;
          }
          this.errors = message;
      });

    }
  },

}

</script>

<template>

  <div class="row justify-content-center pt-5">
    <h2 class="text-center">Q & A Forum</h2>
  </div>
  <div class="row justify-content-center pt-5">
    <div class="col-4">
      <div class="card">
        <div class="card-header text-center">
          User Registration
        </div>
        <div class="card-body">
          <div class="mb-3">
            <p v-if="errors" style="color:red">{{errors}}</p>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Name</label>
            <input type="text" class="form-control" v-model="data.name">
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" v-model="data.email">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="data.password">
          </div>
          <div class="mb-3 d-flex justify-content-between">
            <button type="button" @click="register()" class="btn btn-primary">Register</button>
            <RouterLink class="text-white" to="/">
              <button type="button" class="btn btn-secondary">Login</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
