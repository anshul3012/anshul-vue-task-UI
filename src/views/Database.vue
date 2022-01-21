<template>
  <div id="thisPage">
    <div class="topbar">
      <button class="button" @click="home()">Home</button>
      <button class="button is-danger is-pulled-right" @click="logout()">Logout</button>
    </div>
    <div class="pad">
      <div class="columns">
        <div class="column">
          <div id="users">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <h1>All Users</h1>
                <tr>
                  <th class="has-text-centered has-text-white has-background-black">Sr No#</th>
                  <th class="has-text-centered has-text-white has-background-black">User Name</th>
                  <th class="has-text-centered has-text-white has-background-black">Password</th>
                  <!-- <th class="has-text-centered has-text-white has-background-black">Delete</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(user, index) of users" :key="index" :class="user.userName === 'dev' ? 'is-selected' : ''">
                  <td class="has-text-centered">{{ index + 1 }}</td>
                  <td class="has-text-centered">{{ user.userName }}</td>
                  <td class="has-text-centered">{{ user.password }}</td>
                  <!-- <td class="has-text-centered"><span v-show="!doNotDelete.includes(user.userName)" class="has-text-danger" @click="deleteUser(user.userName)">
                    <i class="far fa-trash-alt"></i>
                  </span></td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="column">
          <div id="tasks">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
              <thead>
                <h1>All Tasks</h1>
                <tr>
                  <th class="has-text-centered has-text-white has-background-black">Sr</th>
                  <th class="has-text-centered has-text-white has-background-black">User Name</th>
                  <th class="has-text-centered has-text-white has-background-black">Task</th>
                  <!-- <th class="has-text-centered has-text-white has-background-black">Delete</th> -->
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) of tasks" :key="index" :class="item.task.status ? '' : 'strikeout'">
                  <td class="has-text-centered">{{ index + 1 }}</td>
                  <td class="has-text-centered">{{ item.userName }}</td>
                  <td class="has-text-centered">{{ item.task.description  }}</td>
                  <!-- <td class="has-text-centered"></td> -->
                </tr>
              </tbody>
            </table>
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
  name: 'Database',
  data () {
    return {
      users: [],
      tasks: [],
      doNotDelete: ['dev', 'test'],
    }
  },
  created: async function () {
    const loading = this.$buefy.loading.open();
    try {
      const { data } = await axios.get(`${environment}database`);
      this.users = data.users;
      const taskObject = data.tasks;
      const taskArray = Object.entries(taskObject);
      const allTasks = [];
      for (const user of taskArray) {
        for (const task of user[1]) {
          allTasks.push({userName: user[0], task})
        };
      };
      this.tasks = allTasks;
      loading.close();
    } catch (error) {
      loading.close();
      console.log(error);
    }
  },
  methods: {
    home: function () {
      this.$router.push('/');
    },
    logout: function () {
      sessionStorage.removeItem('userName');
      sessionStorage.removeItem('tagMode');
      this.$router.push('/login');
    },
    deleteUser: async function (userName) {
      try {
        await console.log(userName);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
  .topbar {
    color: white;
    background-color: #91b2c7;
    padding: 0.2rem 11px 0.2rem;
    height: 48px;
  }
  .pad {
    padding: 11px;
  }
  table {
    border-collapse: collapse;
  }
  td {
    position: relative;
    padding: 5px 10px;
  }
  tr.strikeout td:before {
    content: " ";
    position: absolute;
    top: 50%;
    left: 0;
    border-bottom: 1px dotted red;
    width: 100%;
  }
</style>
