<template>
  <div id="app">
    <h2>
      MST Calculating Table
    </h2>
    <calc-table :rows="calcData" :setup="calcDef"></calc-table>
    <div class="desc">
      <p>
        Let's think about table for operator like excel spreadsheet. Each cell can have special value and other can have calculation formula. 
        Connection of data from database and calculating values in dedicated application often use defined functions for each purpose.<br/>
        This component connect possibility of values calculations ith dedicated formulas, which are defined in application.<br/>
        Examples? Payroll, refund, allotments, rates, fee, prices, invoices etc. Additionaly in application each of this types can have many different versions. 
      </p>
      <p>
        Main component creates a table from definition with rows data. Each column contains set of properties. 
        Component use subcomponents to show, edit, select and display value. <br/>
      </p>
      <p>
        This example contains two subcomponents: simple edit and checked. In the future I'll add more working components.
        Column [Total] is calucated from [Days] and [Day rate]. If [Total] is not empty and not 0, [Checked] will be display as checkbox.
        
      </p>
    </div>
  </div>
</template>
<script>
  import calctable from './components/calctable';
  import sassStyles from './sass/mststyle.scss';
  
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
  p {
    padding-bottom: 10px;
  }
  .desc {
      text-align: left;
      padding: 30px;
  }
</style>
