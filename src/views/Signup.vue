<template>
  <div id="thisPage">
    <div class="columns">
      <div class="column full">
        <img src="../assets/vue.jpg" alt="image" class="cover">
      </div>
      <div class="column full is-5">
        <div class="box" id="signup">
          <h1>SIGN UP !!</h1>
          <div class="field">
            <p class="control has-icons-left">
              <input type="email" class="input" placeholder="Choose Your Username" v-model.trim="payload.userName">
              <span class="icon is-small is-left">
                <i class="fab fa-cc-amex"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input type="password" class="input" placeholder="Choose Your Password" v-model.trim="payload.password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input type="password" class="input" placeholder="Confirm Your Password" v-model.trim="checkPassword">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
            <p class="help is-success" v-if="checkPassword.length > 0 && checkPassword === payload.password">
              Password is matching
            </p>
            <p class="help is-danger" v-else-if="checkPassword.length > 0 && checkPassword !== payload.password">
              Password is not matching
            </p>
            <p class="help" v-else>
              Enter your password again for Sign Up
            </p>
          </div>
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <input class="button is-info" type="submit" value="Sign Up" @click="signup()">
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <input class="button is-warning" type="submit" value="Sign In" @click="toLogin()">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import environment from '../utils/environment';
  export default {
    data () {
      return {
        payload: {
          userName: '',
          password: '',
        },
        checkPassword: '',
      }
    },
    created: async function () {
      try {
        const { data: result } = await axios.get(`${environment}signup`);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    },
    methods: {
      signup: async function () {
        try {
          for (const prop in this.payload) {
            if (!this.payload[prop] || !this.checkPassword) {
              return this.$buefy.toast.open({
                message: 'All fields are Mandatory',
                type: 'is-danger',
                position: 'is-bottom-right',
              });
            };
          };
          if (this.checkPassword !== this.payload.password) {
            return this.$buefy.toast.open({
              message: 'Both the passwords are not same',
              type: 'is-danger',
              position: 'is-bottom-right',
            });
          };
          const { data } = await axios.post(`${environment}signup`, this.payload);
          if (data) {
            this.payload = {userName: '', password: ''};
            this.checkPassword = '';
            this.toLogin();
            return this.$buefy.toast.open({
              duration: 3000,
              message: 'Signed Up Successfully',
              type: 'is-success',
              position: 'is-bottom-right',
            });
          }
          else {
            return this.$buefy.toast.open({
              duration: 3000,
              message: 'User already exist, please Sign In',
              type: 'is-danger',
              position: 'is-bottom-right',
            });
          }
        } catch (error) {
          this.$buefy.toast.open({
            message: 'Something went wrong',
            type: 'is-danger',
            position: 'is-bottom-right',
          });
          console.log(error);
        }
      },
      toLogin: function () {
        this.$router.push({
          name: 'Login'
        })
      },
    },
  }
</script>

<style scoped>
  .full {
    height: 100vh;
  }
  #signup {
    padding: 10px;
  }
  .cover {
    object-fit: cover;
    height: 100vh;
  }
</style>
