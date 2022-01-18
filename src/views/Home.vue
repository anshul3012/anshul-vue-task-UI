<template>
  <div id="thisPage">
    <div class="topbar">
      <div class="container">
        <button class="button is-danger is-pulled-right" @click="logout()">Logout</button>
      </div>
    </div>
    <div class="body">
      <div class="content">
        <div class="inputs">
          <input class="input" type="text" placeholder="Enter your task" v-model="item" @keyup.enter="addItem()">
        </div>
        <div class="lists" v-if="items.length > 0">
          <table class="table">
            <thead>
              <tr>
                <th>Sr</th>
                <th>Task</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, index) of items" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ item }}</td>
                <td>
                  <span @click="deleteItem(index)" class="is-text-danger">
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
export default {
  data () {
    return { 
      item: '',
      items: [],
    }
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem('userName');
      this.$router.push('/login');
    },
    addItem: function () {
      this.items.push(this.item);
      this.item = '';
    },
    deleteItem: function (index) {
      this.items.splice(index, 1);
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
    width: 100vw;
  }
</style>