<template>
    <div class="col-md-9">
        <div class="panel panel-default my-panel">
            <div class="panel-heading">{{ title }}</div>
            <div class="panel-body">
                <h1>{{ title }}</h1>
                <!-- <ul>
                     <li  v-for="(item, index) in items">{{ index }} - {{ item.task }} </li>
                 </ul>
                 <ul>
                     <hr>
                     <li v-for="item in items">
                        Id - <span class="message">{{item.id}}</span><br>
                         Task -<span class="author">{{item.task}}</span>
                         User -<span class="date">{{item.user_id}}</span>
                     </li>
                 </ul>
     -->

                <!-- Main content -->
                <div v-if="message">
                    <alert :message="message"></alert>
                </div>
                <table class="table" style="text-align: center;" v-else>
                    <thead>
                    <tr>
                        <th style="text-align: center;">id#</th>
                        <th style="text-align: center;">NAME</th>
                        <th style="text-align: center;">user id</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="item in items">
                        <td>{{ item.art_id }}</td>
                        <td>{{ item.art_name }}</td>
                        <td>{{ item.user_id }}</td>
                        <td>
                            <div class="btn-group">
                                <button>edit&nbsp;</button>
                                <button  @click="deleteArticle(item.id)">&nbsp;delete</button>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>

import Vue from 'vue'
import axios from 'axios'

export default {

 data() {
      return {
        message:'',
        title:'Articles',
        items: {},
        query: {
          page: 1,
          column: 'id',
          direction: 'desc',
          per_page: 15
        },
        operators: {
          greater_than: '>',
          less_than_or_equal_to: '<=',
          greater_than_or_equal_to: '>=',
          in: 'IN',
          like: 'LIKE'
        }
      }
    },
    components: {

    },
    mounted() {
      this.fetchIndexData()
    },
    methods: {
       deleteArticle(id) {
       console.log(id)
      },
      fetchIndexData() {
        var vm = this
        let token = localStorage.getItem('user_token');
        axios.get(`${this.$store.state.apiurl}api/articles?token=${token}`)
          .then(function(response) {
            Vue.set(vm.$data, 'items', response.data)
            console.log(JSON.stringify(response.data))
           // Vue.set(vm.$data, 'columns', response.data.columns)
          })
          .catch(function(response) {

            console.log(response)
            vm.$store.dispatch('logout')
          })
      }
    }
}
</script>
<style lang="css">

</style>

