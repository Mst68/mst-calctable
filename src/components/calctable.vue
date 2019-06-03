<template>
  <div class="table-calc">
    <div class="" :class="options.containerClass">
      <table class="table" @keydown.stop.prevent="keydown($event)" tabindex="0" ref="tableCalcTable">
        <thead>
          <tr :class="options.headerClass">
            <th v-for="(item, index) in cols" :class="item.labelClass" >{{item.label}}
            </th>
          </tr>
        </thead>
        <tfoot>
          <tr>
            <td v-for="(item, index) in footer">
              <button class="button" :class="item.class" @click="action(item.action, index)">{{item.label}}</button>
            </td>
          </tr>
        </tfoot>
        <tbody>
          <tr v-for="(item, rowindex) in rows" :class="options.rowClass">
            <td v-for="(col, colindex) in cols" :class="col.class">
              <div class="item-value" :class="cellSelected(colindex, rowindex)" @click="selectCell(colindex, rowindex)" @dblclick="setEdit()"  :ref="getId(colindex, rowindex)">
                <div :class="getDisplayValueClass(item, col)">
                  <span class="value-text">{{display(item,col)}}&nbsp;</span>
                  <span class="checkmark"></span>
                  <span class="dummy-text"></span>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="edit_component" ref="editcomp">
      <component v-if="editMode" :is="componentType" :setup="editSetup" v-model="editValue" @setvalue="setEditValue($event)" @canceledit="cancelEdit()"></component>
    </div>
  <div>
</template>

<script>
export default {
  props: {
    rows: Array,
    setup: Object,
    definitions: Object //definicje, które mogą zawierać listy
  },
  computed: {
    cols: function(){
      console.log('cols');
      if(this.setup.hasOwnProperty('cols'))
        return this.setup['cols'];
      return [];
    },
    maxCol: function(){
      return this.cols.length;
    },
    maxRow: function(){
      return this.rows.length;
    },
    idNo: function(){
      if(this.setup['name'] != null)
        return this.setup['name'];
      return 'calctable';
    }, 
    actions: function(){
      console.log('actions');
      if(this.setup.hasOwnProperty('actions'))
        return this.setup['actions'];
      return [];
    },
    footer: function(){
      console.log('footer');
      if(this.setup.hasOwnProperty('footer'))
        return this.setup['footer'];
      return [];
    },
    options: function(){
      if(this.setup.hasOwnProperty('options'))
        return this.setup['options'];
      return {};
    },
    functions: function(){
      if(this.setup.hasOwnProperty('functions'))
        return this.setup['functions'];
      return {};
    },
    editValue: {
      get() {
        // debugger;
        if(this.cols[this.curX] != null){
          try {
            return this.rows[this.curY][this.cols[this.curX]['name']];
          }
          catch(e){
            return null;
          }
        }
        return null;
      },
      set(val) {
        this.$emit('input', val);
      }
    },
    editSetup: function(){
      var setup = {};
      if(this.cols[this.curX] != null && this.cols[this.curX]['setup'] != null){
        setup = this.cols[this.curX]['setup'];
      }
      setup.offset = {};
      return setup;
    },
    componentType: function(){
      // debugger;
      let component = 'mstCalcInput';
      if(this.cols[this.curX]['component'] != null && this.cols[this.curX]['component'] != '')
        component = this.cols[this.curX]['component'];

      return component;
    },
  },
  data: function () {
    return {
      curX: 0,
      curY: 0,
      curValue: '',
      editMode: false,
    }
  },
  methods: {
    display: function(item, colDef){
      if(item[colDef.name] == null)
        return '';
      if(colDef['displayFn'] != null){
        dfn = colDef['displayFn'];
        return dfn(item, colDef);
      }
      else
        return item[colDef.name];
    },
    cellSelected: function(colindex, rowindex){
      if(this.curX == colindex && this.curY == rowindex)
        return 'select-cell';
      return '';
    },
    selectCell: function(colindex, rowindex){
      if(this.editMode)
        return;
      this.curX = colindex;
      this.curY = rowindex;
    },
    keydown: function(val){
      switch(val.keyCode){
        case 40:  //down
          this.curY++;
          if(this.curY > this.maxRow-1)
            this.curY = 0;
          this.showSelectedCell();
          break;  
        case 38:  //up
          this.curY--;
          if(this.curY < 0)
            this.curY = this.maxRow-1;
          this.showSelectedCell();
          break;
        case 37:  //left
          this.curX--;
          if(this.curX < 0)
            this.curX = this.maxCol-1;
          this.showSelectedCell();
          break;
        case 39:  //right
          this.curX++;
          if(this.curX > this.maxCol-1)
            this.curX = 0;
          this.showSelectedCell();
          break;
        case 13:  //enter
          this.setEdit();
          break;
      }       
    },
    showSelectedCell: function(){
      // let sn = this.idNo + '_' + this.curX + '_' + this.curY;
      // if(this.$refs[sn] != null)
      //   this.$refs[sn].$el.children[0].focus();
    },
    getId(colindex, rowindex){
      return this.idNo + '_' + colindex + '_' + rowindex;
    },
    getCurId(){
      return this.idNo + '_' + this.curX + '_' + this.curY;
    },
    getCurrentCell(colindex, rowindex){
      try{
        var curId = this.getCurId();
        var el = this.$refs[curId][0];
        return el;
      }
      catch(e){};
      return null;
    },
    action: function(action, rowindex){
      //console.log(action, rowindex);
      try{
        var fn = this.functions[action];
        fn(this.items, rowindex);
      }catch(e){
        console.log('No action defined: ', action);
      }
    },
    getColCount: function(){
      console.log('getColCount', this.cols.length+1);
      return this.cols.length+1;
    },
    setEdit: function(){
      var self = this;
      if(this.cols[this.curX]['disabled'] != '')
        return;

      this.editMode = true;
      this.setComponentPosition();
      console.log('editnow');
    },
    setComponentPosition(){
      let componentElement = this.$refs.editcomp;
      if(componentElement != null){
        let cell = this.getCurrentCell();
        if(cell != null){
          componentElement.style.left = (cell.offsetLeft + cell.parentElement.offsetLeft) + 'px';
          componentElement.style.top = (cell.offsetTop + cell.parentElement.offsetTop) + 'px';
          componentElement.style.width = (cell.parentElement.offsetWidth) + 'px';
          componentElement.style.height = (cell.parentElement.offsetHeight) + 'px';
        }
      }
    },
    setEditValue: function(value){
      try {
        this.rows[this.curY][this.cols[this.curX]['name']] = value;
        if(this.cols[this.curX]['func'] != null){
          var fn = this.cols[this.curX]['func'];
          fn(this.rows, this.curX, this.curY, this.setup);
        }
      }
      catch(e){
        debugger;
      }
      this.editMode = false;
      this.$refs.tableCalcTable.focus();
    },
    cancelEdit: function(){
      this.editMode = false;
      this.$refs.tableCalcTable.focus();
    },
    getDisplayValueClass: function(item, colDef){
      result = [];
      if(colDef.type == 'checkbox'){
        result.push('chbox');
        var val = this.display(item, colDef);
        if(val != null && val != ''){
          result.push('checked');
        }
      }
      else{
        result.push('calc-value-text');
      }
      return result.join(' ');
    },
  },
  mounted: function(){
    //console.log('itemList mounted');
//    this.$store.dispatch('getRecord');
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

