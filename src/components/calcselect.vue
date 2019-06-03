<template id="app-calctable-template"  type="text/x-template">
  <div class="calc-select"> 
    <select :id="idselect" :class="selectclass" v-model="interface"><option v-for="(item, key) in options" :value="getOptionValue(item)" :selected="isSelected(key)">{{getOptionText(item)}}</option></select>
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
    valuefield: ()=>{
      if(this.setup['valuefield'] != null)
        return this.setup['valuefield'];
      return 'value';
    },
    idfield: ()=>{
      if(this.setup['idfield'] != null)
        return this.setup['idfield'];
      return 'id';
    },
    options: ()=>{
      if(this.setup['options'] != null)
        return this.setup['options'];
      return [];
    },
    interface: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
  },
  data: function(){
    return {
    }
  },
  mounted: function() {
  },  
  methods: {
    isSelected: function (key) {
      if (this.options != null) {
        if (this.options.length > 0 && this.options[key]) {
          if (this.list[key]['id'] == this.calcvalue)
            return 'selected';
        }
      }
      return '';
    },
    getOptionValue: function(item){
      //console.log(item);
      return item[this.idfield];
    },
    getOptionText: function(item){
      return item[this.valuefield];
    },
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

