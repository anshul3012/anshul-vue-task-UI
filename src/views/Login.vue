<template>
  <div id="thisPage">
    <div class="columns">
      <div class="column full">
        <img src="../assets/vue.jpg" alt="image" class="cover">
      </div>
      <div class="column full is-5">
    <div id="login">
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">User Name</label>
        </div>
        <div class="field-body">
          <div class="field">
            <div class="control">
              <input type="text" class="input" placeholder="Enter Your Username" v-model.trim="payload.userName">
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
              <input type="password" class="input" placeholder="Enter Your Password" v-model.trim="payload.password">
            </div>
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
                    <input class="button is-success" type="submit" value="Login" @click="login()">
                  </div>
                </div>
                <div class="level-right">
                  <div class="level-item">
                    <p>Not Signed Up Yet ??</p>
                  </div>
                  <div class="level-item">
                    <input class="button is-info" type="submit" value="Sign Up" @click="toSignup()">
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
        }
      }
    },
    methods: {
      login: async function () {
        try {
          for (const prop in this.payload) {
            if (!this.payload[prop]) {
              return this.$buefy.toast.open({
                message: 'All fields are Mandatory',
                type: 'is-danger',
                position: 'is-bottom-right',
              });
            }
          }
          if (this.users.length > 0) {
            for (const e of this.users) {
              if (e.userName === this.payload.userName) {
                if (e.password === this.payload.password) {
                  sessionStorage.userName = e.userName;
                  return this.$router.push({
                    name: 'Home',
                  })
                }
                else return this.$buefy.toast.open({
                  message: 'Incorrect password',
                  type: 'is-danger',
                  position: 'is-bottom-right',
                });
              } else {
                return this.$buefy.toast.open({
                  message: 'User does not exist, Please Sign Up first',
                  type: 'is-danger',
                  position: 'is-bottom-right',
                });
              }
            };
          } else {
            return this.$buefy.toast.open({
              message: 'User does not exist, Please Sign Up first',
              type: 'is-danger',
              position: 'is-bottom-right',
            });
          };
          this.payload = {userName: '', password: ''};
        } catch (error) {
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
  .full {
    height: 100vh;
  }
  #login {
    padding: 10px;
  }
  .cover {
    object-fit: cover;
    height: 100vh;
  }
</style>
