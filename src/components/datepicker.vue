<template id="app-calctable-template"  type="text/x-template">
  <div class="input-group date">
      <input ref="dtpicker" type="text" class="datepicker-here"></input>
  </div> 
</template>

<script>
export default {
  props: {
    value: String|Object,
    setup: Object
  },
  computed: {
    format: function(){
      if(this.setup['format'] != null)
        return this.setup['format'];
      return "yyyy-mm-dd";
    },
    dtvalue: function(){
      if(this.value == null){
        return null;
      }
      if(typeof(this.value) == 'object')
        return this.value;
      return moment(this.value, this.format);
    },
    interface: {
      get() {
        return moment(this.dtvalue).format(this.format);
      },
      set(val) {
        this.$emit('input', val);
      }
    },
  },
  mounted: function() {
    var self = this;

    this.setup['onSelect'] = function (fd, date) {
      debugger;
      self.$emit('input', date);
    };

    var elem = this.$refs.dtpicker;
    $(elem).datepicker(this.setup);
    // if(this.interface != null)
    //   elem.data('datepicker').selectDate(this.interface);

    debugger;
    if(this.dtvalue != null)
      $(elem).data('datepicker').selectDate(this.dtvalue);
    
  },  
  data: function(){
    return {};
  },
  methods: {

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

