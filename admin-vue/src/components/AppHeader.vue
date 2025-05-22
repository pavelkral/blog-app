<template>
<header class="main-header">
<nav class="navbar navbar-inverse">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
       <router-link tag="a" to="/">
         <a class="navbar-brand" style="margin-left:10px;">
            Scms - {{ user }}
        </a>
        </router-link>
   
    </div>
    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
     
      <ul class="nav navbar-nav navbar-right">
        <li><a href="#">Home</a></li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Profile <span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li> <router-link to="/logout"><span class="glyphicon glyphicon-log-out"></span>
                &emsp;Logout</router-link></li>
           
            <li role="separator" class="divider"></li>
            
          </ul>
        </li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

    </header>

</template>

<script>


    export default {
        mounted() {
           this.isLoged();
        },
        data(){
            return {
                message: " started",
                appName:"My Application",
                users:{}
            }

        },
        methods:{
            getUserData:function () {
                Vue.http.get(this.$store.state.apiurl + 'api/me'+ '?token=' + localStorage.getItem('user_token')).then((response) => {
                this.user =  response.json().user;
                }, (response) => {
                    return false;
                });
            },
            isLoged:function(){
                 let token = localStorage.getItem('user_token');
                if (token !== null && token !== 'undefined') {
                   Vue.http.get(this.$store.state.apiurl + 'api/me' + '?token=' + localStorage.getItem('user_token')).then((response)  => {
                    this.$store.dispatch('loged',{ name: response.data.name, token: token,})
                    console.log('loged');
                  //  me(store, response.data.user.name, token);
                  }, (response) => {
                   // logout(store);
                   console.log('not loged');
                   this.$store.dispatch('logout')
                  });
                }
                else{
                     this.$store.dispatch('logout')
                   console.log('not loged'); 
                }
            }
        },
        computed: {
            user() {
                return this.$store.getters.getName;
            }
        }
    }
</script>
