<template>
  <div id="thisPage">
    <div class="columns">
      <div class="column full">
        <img src="../assets/vue.jpg" alt="image" class="cover">
      </div>
      <div class="column full is-5">
    <div id="signup">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">User Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="email" class="input" placeholder="Choose Your Username" v-model.trim="payload.userName">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="password" class="input" placeholder="Choose Your Password" v-model.trim="payload.password">
            </div>
          </div>
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Confirm Password</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="password" class="input" placeholder="Enter Your Password again" v-model.trim="checkPassword">
            </div>
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
        </div>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal"></div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <div class="level">
                <div class="level-left">
                  <div class="level-item">
                    <input class="button is-info" type="submit" value="Sign Up" @click="signup()">
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <p>Already Signed Up ??</p>
                  </div>
                  <div class="level-item">
                    <input class="button is-warning" type="submit" value="Sign In" @click="toLogin()">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>

<script>
  import users from '../database/users';
  export default {
    data () {
      return {
        users,
        payload: {
          userName: '',
          password: '',
        },
        checkPassword: '',
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
          for (const user of this.users) {
            if (user.userName === this.payload.userName) {
              return this.$buefy.toast.open({
                duration: 3000,
                message: 'User already exist, please Sign In',
                type: 'is-danger',
                position: 'is-bottom-right',
              });
            }
          };
          await this.users.push(this.payload);
          this.$buefy.toast.open({
            duration: 3000,
            message: 'Signed Up Successfully',
            type: 'is-success',
            position: 'is-bottom-right',
          });
          this.payload = {userName: '', password: ''};
          this.checkPassword = '';
          this.toLogin();
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
