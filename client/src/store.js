import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import Cookies from "js-cookie";

Vue.use(Vuex);


export default new Vuex.Store({
   state:{
      parent: {},
      authStatus: 'Logged Out',
      token: localStorage.getItem("token") || '',
      isLoggedIn : false,
      baseURL : '',
      affirmativeMessage:'',
      registerStatus:'',
      authErrorResponse:'',
      authErrorMessage:'',
      newChildID: '',
      children: [],
      addChildStatus: ''
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
      authStatus: state=>state.authStatus,
      affirmativeMessage: state=>state.affirmativeMessage,
      registerStatus: state=>state.registerStatus,
      isLoggedIn: state=>state.isLoggedIn,
      token: state=>state.token,
      state: state=>state,
      authErrorMessage: state=> state.authErrorMessage,
      authErrorResponse: state=> state.authErrorResponse,
      newChildID:state=> state.newChildID,
      children: state=>state.children,
      addChildStatus: state=>state.addChildStatus
   },
   mutations:{
      authSuccess(state,token){
         state.token = token;
         state.authStatus = 'Logged In';
         state.isLoggedIn = true;
      },
      authFailure(state,response){
         state.token = '';
         state.authStatus = 'Logged Out';
         state.isLoggedIn = false;
         state.parent = {};
         state.authErrorResponse = response.status;
         state.authErrorMessage = "Username or password incorrect";
      },
      updateParent(state,parent){
         state.parent = parent;
      },
      logout(state){
         state.token = '';
         state.authStatus = 'Logged Out';
         state.isLoggedIn = false;
         state.parent = {};
         state.children = [];
         state.addChildStatus = '';
      },
      registerSuccess(state){
         state.affirmativeMessage = "Successfully registered, please login.";
         state.registerStatus = "success";
      },
      registerFailure(state){
         state.affirmativeMessage = "Failed to register user, user already registered.";
         state.registerStatus = "failed";
      },clearAuthError(state){
         state.authErrorMessage = '';
         state.authErrorResponse = '';
      },addNewChild(state,child){
         state.newChildID = child._id;
         alert(child);
         state.children.push(child)[0];
         state.addChildStatus = "Success";
      },addChildFailure(state){
         state.addChildStatus = "Failure";
         state.newChildID = '';
      }
   },
   actions:{
      login({commit},parent){
         return new Promise((resolve, reject) => {
            fetch(`http://localhost:8001/auth/login`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(parent)
            })
            .then(resp=>{
               if(resp.status == 200){
                  return resp.json();
               }else{
                  localStorage.removeItem("token");
                  commit("authFailure",resp);
                  resolve();
               }
            })
            .then(data=>{
               localStorage.setItem("token", data.token);
               commit("authSuccess", data.token);
               commit("updateParent",data.me);
               resolve();
            })
            .catch(err=>{
               reject(err);
            });
         });
      },
      register({commit},parent){
         return new Promise((resolve,reject)=>{
            fetch(`http://localhost:8001/auth/register`, {
               method: "POST",
               headers: {
                  "Content-Type": "application/json"
               },
               body: JSON.stringify(parent)
            })
               .then(resp => {
                  if (resp.status == 200) {
                     //alert(resp.status);
                     commit("registerSuccess");
                     resolve();
                  } else {
                     commit("registerFailure");
                     //alert(resp.status);
                     resolve();
                  }
               })
               .catch(err => {
                  alert(err);
                  reject(err);
               });           
         });
      },
      logout({commit}){
         return new Promise((resolve)=>{
            commit("logout");
            sessionStorage.clear();
            localStorage.removeItem("token");
            resolve();
         });
         
      },
      clearAuthError({commit}){
         return new Promise((resolve)=>{
            commit("clearAuthError");
            resolve();
         });
      },
      addChild({commit},child){
         return new Promise((resolve,reject)=>{
            fetch('http://localhost:8001/child/add',{
               method: "POST",
                  headers: {
                     "Content-Type": "application/json"
                  },
                  body: JSON.stringify(child)
               })
            .then(resp=>{
               if(resp.status == 200){
                  return resp.json();
               }
               else{
                  commit("addChildFailure");
                  alert(resp.status)
                  resolve();
               }
            })
            .then(data=>{
               commit("addNewChild",data.child);
               resolve();
            })
            .catch(err=>{
               commit("addChildFailure");
               reject(err)
            });
         });
      }
   } 
});