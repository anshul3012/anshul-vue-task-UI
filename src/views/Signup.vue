<template>
  <div id="thisPage">
    <div class="hero is-fullheight is-info">
      <div class="hero-body">
        <div class="container has-text-centered">
          <div class="column is-6 is-offset-3">
            <h1 class="has-text-white is-size-3">Sign Up</h1>
            <hr class="login-hr">
            <div class="box">
              <h3 class="has-text-grey">Create your Account</h3>
              <p class="help">&nbsp;</p>
              <form>
                <div class="field">
                  <div class="control has-icons-left">
                    <input class="input" type="text" placeholder="Choose your User Name" autofocus="" v-model.trim="payload.userName">
                    <span class="icon is-small is-left">
                      <i class="fab fa-cc-amex"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control has-icons-left">
                    <input class="input" type="password" placeholder="Set your Password" v-model="payload.password">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
                  <div class="control has-icons-left">
                    <input class="input" type="password" placeholder="confirm Password" v-model="checkPassword">
                    <span class="icon is-small is-left">
                      <i class="fas fa-lock"></i>
                    </span>
                  </div>
                </div>
                <div class="field">
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
                <div class="field">
                  <div class="control">
                    <button class="button is-block is-success is-fullwidth" @click.prevent="signup()">Sign Up</button>
                  </div>
                </div>
                <div class="field">
                  <div class="control">
                    <button class="button is-block is-warning is-fullwidth" @click.prevent="toLogin()">Already have an account ?</button>
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
    </div> -->
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
    methods: {
      signup: async function () {
        const loading = this.$buefy.loading.open();
        try {
          for (const prop in this.payload) {
            if (!this.payload[prop] || !this.checkPassword) {
              loading.close();
              return this.$buefy.toast.open({
                message: 'All fields are Mandatory',
                type: 'is-danger'
              });
            };
          };
          if (this.checkPassword !== this.payload.password) {
            loading.close();
            return this.$buefy.toast.open({
              message: 'Both the passwords are not same',
              type: 'is-danger'
            });
          };
          const { data } = await axios.post(`${environment}signup`, this.payload);
          if (data) {
            this.payload = {userName: '', password: ''};
            this.checkPassword = '';
            this.toLogin();
            loading.close();
            return this.$buefy.toast.open({
              duration: 3000,
              message: 'Signed Up Successfully',
              type: 'is-success'
            });
          }
          else {
            loading.close();
            return this.$buefy.toast.open({
              duration: 3000,
              message: 'User already exist, please Sign In',
              type: 'is-danger'
            });
          }
        } catch (error) {
          loading.close();
          this.$buefy.toast.open({
            message: 'Something went wrong',
            type: 'is-danger'
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
