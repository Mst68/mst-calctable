<template>
    <div class="calc-edit"> 
    <component :is="getType()" v-model="interface"></component>
  </div> 
</template>

<script>
export default {
  props: {
    value: '',
    type: String,
    setup: {},
    options: Array,
  },
//  model :{
//    prop: 'value',
//    event: 'input'
//  },
  computed: {
    interface: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    getType: function(){
      if(this.type == null || this.type =='')
        return 'mst-calcedit-input';
      return this.type;
    },
  },
  data: function(){
    return {
    }
  },
  mounted: function() {
//    var self = this;
//    console.log('radio mounted', this.setup);
  },  
  methods: {
    setValue(value){
//      this.value = value;
      this.$emit('input', value);
    },
    iconValue: function(value){
      if(this.dvalue == null)
        this.dvalue = value;
      
      if(value == this.dvalue)
        return this.icons.checked;
      else
        return this.icons.unchecked;
    },
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

