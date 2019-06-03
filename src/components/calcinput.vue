<template id="app-calctable-template"  type="text/x-template">
  <div class="calc-input"> 
    <input v-model="value" @keydown="keydown($event)" ref="mstCalcEdit"></input>
  </div> 
</template>

<script>
export default {
  props: {
    value: '',
    type: String,
    setup: {},
  },
  computed: {
    // interface: {
    //   get() {
    //     return this.value
    //   },
    //   set(val) {
    //     this.$emit('input', val)
    //   }
    // },
  },
  data: function(){
    return {
    }
  },
  mounted: function() {
    this.$refs.mstCalcEdit.focus();
  },  
  methods: {
    keydown: function(val){
      switch(val.keyCode){
        case 27:  //esc
          this.$emit('canceledit');
          break;
        case 13:  //enter
          this.$emit('setvalue', this.value)
          break;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

