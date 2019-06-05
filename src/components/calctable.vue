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
  </div>
</template>

<script>
  import calcinput from './calcinput';
  import calcselect from './calcselect';
  import calcedit from './calcedit';
  import checkbox from './checkbox';
  
export default {
  props: {
    rows: Array,
    setup: Object,
    definitions: Object //definicje, które mogą zawierać listy
  },
  components: {
    'mstCalcInput': calcinput,
    'mstCalcSelect': calcselect,
    'mstCalcEdit': calcedit,
    'mstCheckbox': checkbox,
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
      var result = [];
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
h2 {
  font-size: 16px;
  font-weight: bold;
}

.table-list {
  width: 100%;
  overflow-x: scroll;
}

.table-calc  {
  position: relative;
  & table {
    border: 2px solid #c2c2c2;
      
  }
  
  & th {
    min-width: 80px;
    padding: 6px;
  }
  & tr {
      min-height: 20px;
  }
}

.table-calc .select-cell {
  background-color: #dedede;
}
.table-calc .item-value {
  min-width: 20px;
}

.table-calc .calc-input {
  width: 100%;
  height: 100%;
}
.table-calc #edit_component {
  position: absolute;
  margin: -.5em -.75em;
}

.table-calc #edit_component input {
  width: 100%;
  height: 100%;
}


.table-calc .item-value .chbox {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 0px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  line-height: 0.8em;
}
.table-calc .item-value .chbox .value-text {
  display: none;
}

/* Create a custom checkbox */
.table-calc .item-value .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 25px;
  width: 25px;
}
.table-calc .item-value .calc-value-text .checkmark {
  display: none;
}

.table-calc .item-value .dummy-text {
  font-size: 0px;
}
/* When the checkbox is checked, add a blue background */
.table-calc .item-value .chbox.checked .checkmark {
  background-color: #2196F3;
}

/* Create the checkmark/indicator (hidden when not checked) */
.table-calc .item-value .chbox .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.table-calc .item-value .chbox.checked .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.table-calc .item-value .chbox.checked .checkmark:after {
  left: 10px;
  top: 6px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>

