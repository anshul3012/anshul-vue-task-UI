<template>
  <div id="thisPage">
    <div class="topbar">
      <button class="button is-warning is-pulled-left" @click.prevent="database()">Hello&nbsp;<u>{{ userName }}</u>&nbsp;!!</button>
      <button class="button is-danger is-pulled-right" @click="logout()">Logout</button>
    </div>
    <div class="body pad">
      <div class="columns is-gapless">
        <div class="column is-one-third">
          <div id="progress" v-if="tasks.length > 0">
            <p class="help">Percentage of Task Completed : {{ ((value * 100)/max).toFixed(2) }}%</p>
            <progress class="progress is-success" :value="calculateValue()" :max="max"></progress>
          </div>
        </div>
        <br>
        <div class="column is-one-third"></div>
        <div class="column is-one-third">
          <div class="field is-grouped">
            <p class="control is-expanded">
              <input class="input" type="text" placeholder="Enter your task" v-model.trim="task" @keyup.enter="addTask()">
            </p>
            <p class="control">
              <a class="button is-info" @click="addTask()">Add Task</a>
            </p>
          </div>
        </div>
      </div>
      <div class="content" v-if="tasks.length > 0">
        <div id="toggle">
          <div class="columns is-gapless">
            <div class="column"></div>
            <div class="column">
              <div class="field is-grouped">
                <p class="control is-expanded">
                  <span class="help has-text-right"><span>Toggle to {{ tagMode ? 'Table' : 'Tag' }} Mode</span></span>
                </p>
                <p class="control">
                  <b-switch v-model="tagMode" size="is-small"></b-switch>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="allTasks">
          <div id="task-tag" class="field is-grouped is-grouped-multiline pad" v-if="tagMode">
            <div class="control" v-for="(task, index) of tasks" :key="index">
              <div class="tags has-addons are-medium">
                <b-tooltip label="status change" type="is-dark">
                  <span class="tag" @click="toggleStatus(index)" :class="task.status ? 'is-warning' : 'is-success'">{{ task.description }}</span>
                </b-tooltip>
                <b-tooltip label="edit description" type="is-dark" position="is-left">
                  <a class="tag is-info" @click="editDescription(task.description, index)"><i class="far fa-edit"></i></a>
                </b-tooltip>
                <b-tooltip label="delete" type="is-dark" position="is-left">
                  <a class="tag is-danger" @click="deleteTask(index)"><i class="far fa-trash-alt"></i></a>
                </b-tooltip>
              </div>
            </div>
          </div>
          <table id="task-table" class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth" v-else>
            <thead>
              <tr>
                <th width="3%" class="has-text-centered">Sr</th>
                <th class="has-text-centered">Task</th>
                <th width="8%" class="has-text-centered">Status</th>
                <th width="8%" class="has-text-centered">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(task, index) of tasks" :key="index" :class="task.status ? '' : 'strikeout'">
                <td class="has-text-centered">{{ index + 1 }}</td>
                <td class="has-text-centered outOfScreen" @dblclick="editDescription(task.description, index)">{{ task.description }}</td>
                <td class="has-text-centered">
                  <b-tooltip :label="`Make status as ${task.status ? 'Completed' : 'Pending'}`" type="is-dark" position="is-left">
                    <button id="statusButton" class="button is-small" :class="task.status ? 'is-warning' : 'is-success'" @click="toggleStatus(index)">
                      {{ task.status ? 'Pending' : 'Completed' }}
                    </button>
                  </b-tooltip>
                </td>
                <td class="has-text-centered">
                  <b-tooltip label="edit description" type="is-dark" position="is-left">
                    <span class="has-text-info" @click="editDescription(task.description, index)">
                      <span class="icon">
                        <i class="fas fa-edit"></i>
                      </span>
                    </span>
                  </b-tooltip>
                  <b-tooltip label="delete" type="is-dark" position="is-left">
                    <span class="has-text-danger" @click="deleteTask(index)">
                      <span class="icon">
                        <i class="far fa-trash-alt"></i>
                      </span>
                    </span>
                  </b-tooltip>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-else>
        <table>
          <tr>
            <td class="pl-4"><i class="fas fa-plus"></i></td>
            <td class="pl-3">Add task through input field</td>
          </tr>
          <tr>
            <td class="pl-4"><i class="fas fa-mouse-pointer"></i></td>
            <td class="pl-3">Click on status button to toggle status of task between completed & pending</td>
          </tr>
          <tr>
            <td class="pl-4"><i class="far fa-hand-pointer"></i></td>
            <td class="pl-3">Double tap or click on edit button to update description</td>
          </tr>
          <tr>
            <td class="pl-4"><i class="far fa-trash-alt"></i></td>
            <td class="pl-3">Click on delete button to delete task</td>
          </tr>
          <tr>
            <td class="pl-4"><i class="fas fa-toggle-on"></i></td>
            <td class="pl-3">Toggle view through switch button</td>
          </tr>
          <tr>
            <td class="pl-4"><i class="far fa-surprise"></i></td>
            <td class="pl-3">Haven't added any task yet ?</td>
          </tr>
        </table>
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
      max: 0,
      value: 0,
      tagMode: false
    }
  },
  created: async function () {
    await this.getAllTasks();
  },
  watch: {
    tasks: function () {
      this.max = this.tasks.length;
    }
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem('userName');
      this.$router.push('/login');
    },
    database: function () {
      this.$router.push('/database');
    },
    calculateValue: function () {
      let value = 0;
      this.tasks.forEach(e => {
        if (!e.status) value++;
      });
      this.value = value;
      return value;
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
      const loading = this.$buefy.loading.open();
      try {
        const { data } = await axios.post(`${environment}togglestatus`, { userName: this.userName, index });
        this.tasks[index].status = data;
        loading.close();
      } catch (error) {
        loading.close();
        console.log(error);
      }
    },
    editDescription: function (description, index) {
      this.$buefy.dialog.prompt({
        message: `Edit Description of the Task`,
        inputAttrs: {
          value: description
        },
        trapFocus: true,
        onConfirm: (value) => this.updateDescription(value, index)
      });
    },
    updateDescription: async function (description, index) {
      const loading = this.$buefy.loading.open();
      try {
        const { data } = await axios.post(`${environment}updatedescription`, {userName: this.userName, index, description});
        this.tasks[index].description = data;
        loading.close();
      } catch (error) {
        loading.close();
        console.log(error);
      }
    },
    deleteTask: async function (index) {
      this.$buefy.dialog.confirm({
        message: '<strong>Are you sure to delete?</strong>',
        confirmText: 'Yes',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
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
      })
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
  #allTasks {
    border: solid 1px black;
  }
  #statusButton {
    width: 75px;
    height: 24px;
  }
</style>