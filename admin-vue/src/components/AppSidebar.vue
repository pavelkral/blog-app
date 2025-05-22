<template>
    <div class="col-md-3">
    <div class="panel panel-default my-panel">
    <div class="panel-heading">NAV</div>
    <div class="panel-body">
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">
             <ul class="list-group" v-if="is('setup')">
                <li class="list-group-item">
                <router-link to="/setup"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Dashboard</router-link>
                </li>
                 <li class="list-group-item">
                     <router-link to="/setup/confroom"><span class="glyphicon glyphicon-menu-hamburger"></span>
                         &emsp;Confroom</router-link>
                 </li>
                <li class="list-group-item">
                <router-link to="/setup/add"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;New Article</router-link>
                </li>
                 <li class="list-group-item">
                <router-link to="/setup/articles"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Articles</router-link>
                </li>

                <li class="list-group-item">
                <router-link to="/logout"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Logout</router-link>
                </li>
             </ul>
                <!-- Sidebar Menu -->
              <ul class="list-group" v-if="is('home')">
                <li class="list-group-item">
                <router-link to="/"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Home</router-link>
                </li>

                <li class="list-group-item">
                <router-link to="/todos"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Todos</router-link>
                </li>
                <li class="list-group-item">
                <router-link to="/setup"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Dashboard</router-link>
                </li>
               <!--  <li class="list-group-item">
                <router-link to="/login"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Login</router-link>
                </li>
                 <li class="list-group-item">
                <router-link to="/register"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Registr</router-link>
                </li>

                <li class="list-group-item">
                <router-link to="/logout"><span class="glyphicon glyphicon-menu-hamburger"></span>
                &emsp;Logout</router-link>
                </li> -->
            </ul>
                <!-- /.sidebar-menu -->
            </section>
            <!-- /.sidebar -->
        </aside>
    </div>
    </div></div>
</template>

<script>
    export default {
        props: ['nav'],
        ready() {
            console.log('Component ready.')
        },
        data(){
            return {
                message: "side Bar "
            }

        },
        computed: {
            demo: function () {
                return {
                    displayName: "smaple",
                    avatar: "smaple",
                    email: "smaple",
                    randomCard: "smaple",
                }
            }
        },
         methods: {
          is(nav) {
            return this.nav === nav;
          }
        }
    }
</script>
