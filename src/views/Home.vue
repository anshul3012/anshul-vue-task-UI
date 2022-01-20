<template>
  <div id="thisPage">
    <div class="topbar">
      <button class="button is-warning is-pulled-left" @click.prevent="database()">Hello&nbsp;<u>{{ userName }}</u>&nbsp;!!</button>
      <button class="button is-danger is-pulled-right" @click="logout()">Logout</button>
    </div>
    <div class="body">
      <div class="content">
        <div class="inputs">
          <input class="input" type="text" placeholder="Enter your task" v-model.trim="task" @keyup.enter="addTask()">
        </div>
        <div class="lists" v-if="tasks.length > 0">
          <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
            <thead>
              <tr>
                <th class="has-text-centered">Sr</th>
                <th class="has-text-centered">Task</th>
                <th class="has-text-centered">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) of tasks" :key="index" :class="task.status ? '' : 'strikeout'">
                <td class="has-text-centered" @click="toggleStatus(index)">{{ index + 1 }}</td>
                <td class="has-text-centered" @click="toggleStatus(index)">{{ task.description }}</td>
                <td class="has-text-centered">
                  <span @click="deleteTask(index)" class="has-text-danger">
                    <i class="far fa-trash-alt"></i>
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="lists" v-else>
          <p>No Lists</p>
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
      userName: sessionStorage.userName,
      task: '',
      tasks: [],
    }
  },
  created: async function () {
    await this.getAllTasks();
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem('userName');
      this.$router.push('/login');
    },
    database: function () {
      this.$router.push('/database');
    },
    getAllTasks: async function () {
      const loading = this.$buefy.loading.open();
      try {
        const { data } = await axios.post(`${environment}gettasks`, {userName: this.userName});
        this.tasks = data;
        loading.close();
      } catch (error) {
        loading.close();
        console.log(error);
      };
    },
    addTask: async function () {
      if (!this.task) {
        return this.$buefy.toast.open({
          message: 'Task cannot be empty',
          type: 'is-danger',
          position: 'is-bottom-right',
        });
      };
      const loading = this.$buefy.loading.open();
      try {
        const toPush = {description: this.task, status: true};
        const { data } = await axios.post(`${environment}addtask`, { userName: this.userName, task: toPush });
        if (data) {
          this.tasks.push(toPush);
          this.task = '';
          loading.close();
          this.$buefy.toast.open({
            message: 'Task Added',
            type: 'is-success',
            position: 'is-bottom-right',
          });
        } else {
          loading.close();
          this.$buefy.toast.open({
            message: 'Task not added',
            type: 'is-danger',
            position: 'is-bottom-right',
          });
        }
      } catch (error) {
        loading.close();
        console.log(error);
      }
    },
    toggleStatus: async function (index) {
      try {
        const { data } = await axios.post(`${environment}togglestatus`, { userName: this.userName, index });
        this.tasks[index].status = data;
      } catch (error) {
        console.log(error);
      }
    },
    deleteTask: async function (index) {
      const loading = this.$buefy.loading.open();
      try {
        const { data } = await axios.post(`${environment}deletetask`, {userName: this.userName, index});
        if (data) this.tasks.splice(index, 1);
        loading.close();
      } catch (error) {
        loading.close();
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>
  .topbar {
    color: white;
    background-color: #41B883;
    padding: 0.2rem;
    height: 48px;
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