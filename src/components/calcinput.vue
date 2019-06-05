<template >
  <div class="calc-input"> 
    <input v-model="value" @keydown="keydown($event)" ref="mstCalcEdit" class="edit-area" />
  </div> 
</template>

<script>
export default {
  props: {
    value: '',
    type: '',
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

<style scoped lang="scss">
  .edit-area {
    width: 100%;
    height: 100%;
  }
</style>

