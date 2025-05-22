<template> 
<div class="col-md-9">
<div class="panel panel-default">
    <div class="panel-heading">{{ title }}</div>
    <div class="panel-body">    
  <div v-if="!image">
    <h2>Select an image</h2>
    <input type="file" @change="onFileChange">
  </div>
  <div v-else>
    <img :src="image" />
    <button @click="removeImage">Remove image</button>
  </div>
</div>
</div></div>
</template>

<script>

export default {
  template: '',
  props: {
    
  },
  data: function () {
    return {
     image: ''
    }
  },
  methods: {
    onFileChange: function (e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length)
        return;
      this.createImage(files[0]);
    },
    createImage: function (file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = (e) => {
        vm.image = e.target.result;
      };
      reader.readAsDataURL(file);
    },
    removeImage: function (e) {
      this.image = '';
    }
  }

}

// mount
//app.$mount('.todoapp')
</script>

<style>
img {
  width: 30%;
  margin: auto;
  display: block;
  margin-bottom: 10px;
}
button {
  
}
</style>

