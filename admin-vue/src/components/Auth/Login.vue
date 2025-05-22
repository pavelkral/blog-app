<template>
    <div>

        <nav class="navbar navbar-default navbar-static-top">
            <div class="container">
                <div class="navbar-header">

                    <!-- Collapsed Hamburger -->
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse"
                            data-target="#app-navbar-collapse">
                        <span class="sr-only">Toggle Navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>

                    <!-- Branding Image -->
                    <router-link tag="a" to="/">
                     <a class="navbar-brand" >
                        My Application
                    </a>
                    </router-link>
                   
                </div>

                <div class="collapse navbar-collapse" id="app-navbar-collapse">
                    <!-- Left Side Of Navbar -->
                    <ul class="nav navbar-nav">
                        &nbsp;
                    </ul>

                    <!-- Right Side Of Navbar -->
                    <ul class="nav navbar-nav navbar-right">
                        <!-- Authentication Links -->
                        <li>
                            <router-link to="/login">
                                Login
                            </router-link>
                        </li>
                        <li>
                            <router-link to="/register">
                                Register
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="panel panel-default">
                        <div class="panel-heading">Login</div>
                        <div class="panel-body">
                            <form class="form-horizontal" role="form" @submit.prevent="login">
                                <p v-if="$route.query.redirect">
                                    You need to login first.
                                </p>
                                <div class="form-group">
                                    <label for="email" class="col-md-4 control-label">E-Mail Address</label>

                                    <div class="col-md-6">
                                        <input id="email" v-model="email" type="email" class="form-control" name="email"
                                               value="" required autofocus>

                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="password" class="col-md-4 control-label">Password </label>

                                    <div class="col-md-6">
                                        <input id="password" v-model="pass" type="password" class="form-control"
                                               name="password" required>

                                    </div>
                                </div>

                                <div class="form-group">
                                    <div class="col-md-6 col-md-offset-4">
                                        <div class="checkbox">
                                            <label>
                                                <input type="checkbox" name="remember"> Remember Me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <p v-if="error" class="error">Bad login information</p>
                                <div class="form-group">
                                    <div class="col-md-8 col-md-offset-4">
                                        <button type="submit" class="btn btn-primary">
                                            Login
                                        </button>

                                        <router-link class="btn btn-link" to="/forgot-password">
                                            Forgot Your Password?
                                        </router-link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  //  import auth from '../../auth'
    export default {
        mounted() {
           if(this.$store.state.auth == true){
                this.$router.replace(this.$route.query.redirect || '/setup')
           }
        },
        data () {
            return {
                email: 'devlog@devlog.cz',
                pass: 'devlog@devlog.cz',
                error: false
            }
        },
        methods: {
            login () {

                this.$store.dispatch('login',{ _this:this, email: this.email, pass: this.pass,})
                /*auth.login(this.email, this.pass, loggedIn => {
                    if (!loggedIn) {
                        this.error = true
                    } else {
                        this.$router.replace(this.$route.query.redirect || '/')
                    }
                })*/
               //  if(this.$store.state.auth == false){
                  //  this.error = true
               // }
            }
        }
    }
</script>

<style>
    .error {
        color: red;
    }
</style>