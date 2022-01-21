<template>
  <div id="thisPage">
    <div class="hero is-fullheight is-info">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <h1 class="has-text-white is-size-3">Login</h1>
            <hr class="login-hr">
            <div class="box">
              <h3 class="has-text-grey">Enter your User Name and Password</h3>
              <p class="help">&nbsp;</p>
              <form>
                <div class="field">
                  <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="User Name" autofocus="" v-model.trim="payload.userName">
                    <span class="icon is-small is-left">
                      <i class="fab fa-cc-amex"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control has-icons-left">
                    <input class="input" type="password" placeholder="Password" v-model="payload.password">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-block is-success is-fullwidth" @click.prevent="login()">Login</button>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-block is-danger is-fullwidth" @click.prevent="toSignup()">Sign Up</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="columns">
      <div class="column full">
        <img src="../assets/vue.jpg" alt="image" class="cover">
      </div>
      <div class="column full is-5">
        <div class="box" id="login">
          <h1>LOGIN !!</h1>
          <div class="field">
            <p class="control has-icons-left">
              <input type="text" class="input" placeholder="Enter Your Username" v-model.trim="payload.userName">
              <span class="icon is-left">
                <i class="fab fa-cc-amex"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input type="password" class="input" placeholder="Enter Your Password" v-model.trim="payload.password">
              <span class="icon is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <input class="button is-success" type="submit" value="Login" @click="login()">
              </div>
            </div>
            <div class="level-right">
              <div class="level-item">
                <input class="button is-info" type="submit" value="Sign Up" @click="toSignup()">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
  import axios from 'axios';
  import environment from '../utils/environment';
  import users from '../database/users';
  export default {
    data () {
      return {
        users,
        payload: {
          userName: '',
          password: '',
        }
      }
    },
    methods: {
      login: async function () {
        const loading = this.$buefy.loading.open();
        try {
          for (const prop in this.payload) {
            if (!this.payload[prop]) {
              loading.close();
              return this.$buefy.toast.open({
                message: 'All fields are Mandatory',
                type: 'is-danger'
              });
            }
          }
          const { data } = await axios.post(`${environment}login`, this.payload);
          if (data === 'success') {
            sessionStorage.userName = this.payload.userName;
            this.payload = {userName: '', password: ''};
            loading.close();
            return this.$router.push({
              name: 'Home',
            });
          } else if (data === 'failed') {
            loading.close();
            return this.$buefy.toast.open({
              message: 'Incorrect password',
              type: 'is-danger'
            });
          } else {
            loading.close();
            return this.$buefy.toast.open({
              message: 'User does not exist, Please Sign Up first',
              type: 'is-danger'
            });
          }
        } catch (error) {
          loading.close();
          console.log(error);
        }
      },
      toSignup: function () {
        this.$router.push({
          name: 'Signup'
        })
      },
    }
  }
</script>

<style scoped>
  /* .full {
    height: 100vh;
  }
  #login {
    padding: 10px;
  }
  .cover {
    object-fit: cover;
    height: 100vh;
  } */
</style>
