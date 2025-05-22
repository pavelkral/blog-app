import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        message: 'App state ready',
        auth:false,
        username:'',
        token:'',
        apiurl:'http://127.0.0.1:3000/'
    },
    mutations: {

        LOGIN(state,{name,token}){
            state.auth = true
            state.username = name
            state.token = token
            
            console.log('called login' + name);

        },
        LOGED(state,{name,token}){
            state.auth = true
            state.username = name
            state.token = token
            
            console.log('called loged' + name);

        },
        LOGOUT(state){
            state.username = ''
            state.token = ''
            state.auth = false
            
            //  delete localStorage.token
            console.log('called logout');
        },
        CHECK_AUTH(state){
           // state.auth = !!localStorage.getItem('user_token');
            if (state.auth) {
             // Vue.$http.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('id_token')}`;
                return true;
            } 
            else{
                return false;
            }
        }
       
       
    },
    actions: {
        login({commit},{_this,email,pass}){

            Vue.http.post(_this.$store.state.apiurl + 'api/login', {
                email: email,
                password: pass
            }).then((response) => {
                if (response.data.access_token) {
                 //   console.log(response.data.access_token)
                    console.log(JSON.stringify(response.data))
                    localStorage.setItem('user_token', response.data.access_token)
                    commit('LOGIN',{token:response.data.access_token,name:response.data.name})
                  // localStorage.token = response.data.token
                   _this.$router.replace(_this.$route.query.redirect || '/setup')
                } else {
                    _this.error = true
                    console.log('token not retrived')
                }
            }, (response) => {
                _this.error = true
                console.log('token not retrived')
               
            });

            
        },
         logout({commit}){
            commit('LOGOUT')
            localStorage.removeItem('user_token')
          //  delete localStorage.token
            //_this.$router.replace(_this.$route.query.redirect || '/')
        },
         loged({commit},{name,token}){
            commit('LOGED',{name,token})
        },
         checkauth({commit}){
            commit('CHECK_AUTH')
        }
       

    },
    getters: {
         getAuth: state => state.auth,
         getToken: state => state.token,
         getName: state => state.username
       // newTodo: state => state.newTodo,
      //  todos: state => state.todos.filter((todo) => {return !todo.completed}),
       // completedTodos: state => state.todos.filter((todo) => {return todo.completed})
    }

})