import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);


export default new Vuex.Store({
   state:{
      parent: {},
      authStatus: false,
      token: localStorage.getItem("token") || '',
      isLoggedIn = false,
      baseURL = 'localhost:8001/api/'
   }, 
   plugins: [
      createPersistedState({
         getState: key => Cookies.getJSON(key),
         setState: (key, state) =>
            Cookies.set(key, state, {
               expires: 3,
               secure: false
            })
      })
   ],
   getters:{
      parent: state=>state.parent,
      authStatus: state=>state.authStatus
   },
   mutations:{
      authSuccess(state,token){
         state.token = token,
         state.authStatus = 'success',
         state.isLoggedIn = true
      },
      authFailure(state){
         state.token = '',
         state.authStatus = 'failure',
         state.isLoggedIn = false,
         state.parent = {}
      },
      updateParent(state,parent){
         state.parent = parent,
      }
   },
   actions:{
      login({commit},parent){
         return new Promise((resolve, reject) => {
            console.log(`${this.state.baseURL}/auth/login`)//debugging
            fetch(`${this.state.baseURL}/auth/login`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(parent)
            })
            .then(resp=>{
               if(resp.status == 200){
                  var response = resp.json();
                  localStorage.setItem("token", response.token);
                  commit("authSuccess",response.token);
                  commit("updateParent",response.parent);
                  resolve();
               }else{
                  localStorage.removeItem("token");
                  commit("authFailure");
                  resolve();
               }
            })
            .catch(err){
               reject(err);
            };

         });
      }, 
      register({
         commit
      }, parent) {
         return new Promise((resolve, reject) => {
            fetch('/auth/register');

         });
      }

   }
    
});