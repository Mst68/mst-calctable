export default {
  cols: [
    {
      name: 'id',
      label: 'Id',
      class: '',
      component: '',
      disabled: true,
      hidden: false,
      func: function(){

      }
    },
    {
      name: 'name',
      label: 'Name',
      class: '',
      component: '',
      disabled: true,
      hidden: false,
      func: function(){

      }
    },
    {
      name: 'rank',
      label: 'Rank',
      class: '',
      component: '',
      disabled: false,
      hidden: false,
      func: function(){

      }
    },
    {
      name: 'days',
      label: 'Days',
      class: '',
      component: '',
      disabled: false,
      hidden: false,
      func: function(data, curX, curY, setup){
        if(setup.functions.hasOwnProperty('calculateValue')){
          var fn = setup.functions['calculateValue'];
          fn(data, curX, curY)
        }
      }
    },
    {
      name: 'day_rate',
      label: 'Day rate',
      class: '',
      component: '',
      disabled: false,
      hidden: false,
      func: function(data, curX, curY, setup){
        if(setup.functions.hasOwnProperty('calculateValue')){
          var fn = setup.functions['calculateValue'];
          fn(data, curX, curY)
        }
      }
    },
    {
      name: 'bonus',
      label: 'Bonus',
      class: '',
      component: 'mstCalcSelect',
      disabled: true,
      hidden: false,
      func: function(){

      },
      setup: {
        idfield: 'id',
        valuefield: 'name',
        options:[
          {id: 1, name: 'Test1'},
          {id: 2, name: 'Ala'},
          {id: 3, name: 'Kod'},
          {id: 4, name: 'Prezes'},
        ]
      }
    },
    {
      name: 'total',
      label: 'Total',
      class: '',
      component: '',
      disabled: true,
      hidden: false,
      func: function(){

      }
    },
    {
      name: 'checked',
      label: 'Checked',
      class: '',
      component: '',
      type: 'mstCheckbox',
      disabled: false,
      hidden: false,
      func: function(){

      }
    },
  ],
  rows: [
    
  ],
  header: [],
  footer: [],
  options: {

  },
  functions: {
    calculateValue: function(data, curX, curY){
      try {
        var dr = parseFloat(data[curY]['day_rate']);
        var days = parseFloat(data[curY]['days']);
        if(!isNaN(dr) && !isNaN(days))
          data[curY]['total'] = Math.round(days * dr * 100)/ 100;
        else
          data[curY]['total'] = 'Err';
      }
      catch(e){
        data[curY]['total'] = '';
      }
    }
  }
};

