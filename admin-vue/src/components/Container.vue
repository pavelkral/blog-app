<template>
    <div id="app">
        <AppHeader></AppHeader>
       
        <div class="container">
           <AppSidebar :nav='nav'></AppSidebar>  
             <router-view></router-view>
        </div>
       
        <AppFooter></AppFooter>
    </div>
</template>
<script>
    import AppHeader from '../components/AppHeader.vue'
    import AppFooter from '../components/AppFooter.vue'
    import AppSidebar from '../components/AppSidebar.vue'

    export default {
        data() {
            return {
              nav: 'home'
            };
          },
        components: {
            AppHeader, AppFooter, AppSidebar
        }
    }
</script>