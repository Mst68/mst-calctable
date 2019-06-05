<template>
  <div id="app">
    <div>
      This is example of calculating table. AAA.
    </div>
    <calc-table :rows="calcData" :setup="calcDef"></calc-table>
  </div>
</template>
<script>
  import calctable from './components/calctable';
  
  export default {
    name: 'app',
    props: {},
    components: {
      'calc-table': calctable,
    },
    computed: {
      calcData: function () {
        // debugger;
        return this.$store.state.calcData;
      },
      calcDef: function () {
        return this.$store.state.calcDef;
      }
    },
    data(){
      return {}
    }

  }
</script>
<style lang="scss">
  #app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
  #nav {
    padding: 30px;
    a {
      font-weight: bold;
      color: #2c3e50;
      &.router-link-exact-active {
        color: #42b983;
      }
    }
  }
</style>
