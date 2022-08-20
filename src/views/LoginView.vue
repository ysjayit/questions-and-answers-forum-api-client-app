<script>
import axios from 'axios'
import {config} from '../config';

export default {

  data() {
    return {
      data: {
        email: '',
        password: ''
      },
      errors: '',
    }
  },
  methods: {
    login() {

      axios.post(config.base_url+'login', this.data).then((response)=>{

        localStorage.setItem('user-token', response.data.data.token);
        localStorage.setItem('user-role', response.data.data.role);
        this.$router.push('/dashboard');

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
          User Login
        </div>
        <div class="card-body">
          <div class="mb-3">
            <p v-if="errors" style="color:red">{{errors}}</p>
          </div>
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" class="form-control" v-model="data.email">
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" v-model="data.password">
          </div>
          <div class="mb-3 d-flex justify-content-between">
            <button type="button" @click="login()" class="btn btn-primary">Login</button>
            <RouterLink class="text-white" to="/register">
              <button type="button" class="btn btn-secondary">Register</button>
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
