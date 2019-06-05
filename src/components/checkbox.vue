<template>
  <div class="control" :class="controlclass">
    <div class="b-checkbox" :class="[classtype, classinline, classcircular]">
        <input :id="id" class="styled" :checked="checked" type="checkbox" @click="click"/>
        <label :for="id"><slot></slot></label>
    </div>
  </div> 
</template>

<script>
export default {
  props: {
    value: 0,
    label: '',
    setup: Object,
    id: ''
  },
//  model :{
//    prop: 'value',
//    event: 'input'
//  },
  computed: {
    checked: function () {
      if(this.value == 0)
        return '';
      else
        return 'checked';
    },
  },
  data: function () {
    return {
      controlclass: '',
      classtype: '',
      classinline: '', 
      classcircular: '',
    };
  },
  mounted: function(){
    if(this.setup['controlclass'] != null)
      this.controlclass = this.setup['controlclass'];
    if(this.setup['classtype'] != null)
      this.classtype = this.setup['classtype'];
    if(this.setup['classinline'] != null)
      this.classinline = 'is-inline';
    if(this.setup['classcircular'] != null)
      this.classcircular = 'is-circular';
  },
  methods: {
    click: function (ev) {
//      console.log('changed', ev.target.value);
      this.$emit('input', ev.target.checked);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>

