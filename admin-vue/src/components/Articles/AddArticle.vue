<template id="ticket-submit-template">
<div class="col-md-9">
<div class="panel panel-default">
    <div class="panel-heading">{{ title }}</div>
    <div class="panel-body">
    <form id="upload" @submit.prevent="submitTicket" class="m-t" role="form" action="/api/dog/test" novalidate enctype="multipart/form-data">
    <div class="form-group">   
    <label for="postname">Post Name</label><br>   
          <input class="form-control" type="text" v-model="artname" name="artname" >
        </div>
        <div class="form-group">
            <label for="art_header">
                <span class="red">*</span>Krátký popis čeho se příspěvek týká <span class="red"> &nbsp;( Min. 10 - max 350 znaků. )</span>
            </label>
            <textarea class="form-control" name="art_header" id="art_header"></textarea>
        </div>
        <div class="form-group">
            <label for="art_sc_id"><span>*</span>Kategorie:</label>
            <select name="art_sc_id" id="art_sc_id" class="form-control">

                <option value="1">cat</option>

            </select>
        </div>

            <div class="form-group" >
                <label for="art_subsc_id"><span>*</span>Kategorie 2:</label>
                <select name="art_subsc_id" id="art_subsc_id" class="form-control">

                    <option value="1">sub</option>

                </select>
            </div>



        <div class="form-group">
            <label for="attachments">Post Attachments</label><br>
           <div class="input-group">
                <ul>
                  <li  v-for="(attachment, index) in attachments">{{ index }} - {{ attachment.name }} </li>
                </ul>
            
            </div>
          <div class="input-group">
                <label class="input-group-btn">
                    <span class="btn btn-primary">
                        Browse&hellip; <input type="file" name="attachments[]" id="attachments" style="display: none;" multiple  v-on:change="onFileChange">
                    </span>
                </label>
                <input type="text"  class="form-control" readonly>
            </div>

        </div>
       
        <div class="form-group">
            <label for="attachments">Post Text</label><br>
            
          <textarea class="summernote"></textarea>
        <!--  <textarea v-model="text"></textarea> -->
        </div>

        <button id="btn-submit-ticket" type="submit" class="btn btn-primary block m-b">Submit</button>
    </form>
    </div>
    <div style="margin-top:0px">
            <div> Response:</div>
            <hr>
            <div><textarea id="response" name="response" class="form-control" >{{ response }}</textarea></div>         
      </div>
    </div></div>
</template>

<script> 
$(document).ready(function() {

});

  export default {

      template: '#ticket-submit-template',
     // props: ['organization'],
      components: {
        "vue-html-editor": require("../../lib/vue-html-editor.js")
      },

      data: function() {
          return {
              title: 'New Post',
              artname: 'New Post',
              attachments:[],
              text: "",
              response:''

          }
      },

      methods: {

        onFileChange(event) {
            this.attachments = [];
            this.attachments = event.target.files || event.dataTransfer.files;
            console.log(this.attachments);

        },
        submitTicket(event) {
            event.preventDefault();
            event.stopPropagation();
            var formdata = document.getElementById('upload');
            var form = new FormData(formdata);
            
            var html = $('.summernote').summernote('code');
            form.append('arttext', html);
            //  for(var key in this.formInputs.attachments) {
            //     form.append('attachments[' + key + ']', this.formInputs.attachments[key]);
            //  }
            // var action = $('#form-submit-ticket').action;
            //  var formData = new FormData();
            //  formData.append('image', this.fileInput.files[0]);
            //console.log(form);
            let token = localStorage.getItem('user_token');
            this.$http.post(this.$store.state.apiurl + 'api/addarticle?token=' + token, form).then((response) => {
                console.log('Success:', response)
                this.response = response.data;
              //  this.$route.router.go({ name: 'welcome' });             
            }, (response) => {
             // logout(store);
            //  this.$route.router.go({ name: 'login' });
            });  

        },

        created() {
            // Get the data from our $company variable, parse it and push it to our data property
           // this.company = JSON.parse(this.organization);
        },
        update(){
  
            //  onFileChange(event)
        },

  },
  computed:{

  },
  mounted: function()  {
      var config = {};
      config.minHeight = 150;
      config.maxHeight = 150; 
      $('.summernote').summernote(config);  
   }
} 
</script>

<style lang="css">
     .btn-file {
        position: relative;
        overflow: hidden;
    }
    .btn-file input[type=file] {
        position: absolute;
        top: 0;
        right: 0;
        min-width: 100%;
        min-height: 100%;
        font-size: 100px;
        text-align: right;
        filter: alpha(opacity=0);
        opacity: 0;
        outline: none;
        background: white;
        cursor: inherit;
        display: block;
    }
</style>
