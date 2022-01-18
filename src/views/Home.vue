<template>
  <div id="thisPage">
    <h1>Hiii {{ userName }}</h1>
    <h1>Hello</h1>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: sessionStorage.userName,
    }
  }
}
</script>