import Vue from "vue";
import Vuex from "vuex";
import definition from "./data/definition.js"
import data from "./data/data.js"

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    calcDef: definition,
    calcData: data
  },
  mutations: {
    setLicencesList: function(state){
      console.log('state.record.licences',state.record.licences);
      items = [];
      for(let key in state.record.licences){
        items.push(state.record.licences[key]);
      }
      state.record.licences = items;
    },
    updateCount: function(state){
    
    }
  },
  actions: {
    getRecord: function ( {state, commit, dispatch}){
      console.log('getRecord', state);
      var route = '/seafarerapp/application2/getappdata';

      setTimeout(function(){
        state.record = sampleRecord;
        console.log('wgralem record');
        dispatch('getLanguages');
        commit('setLicencesList');
      }, 200);
    },
    saveRecord: function ( {state, dispatch}){
      var url = '/seafarerapp/application2/savedata';
      setTimeout(function(){
        commit('setLicencesList');
      }, 200);
    },
  }
});
