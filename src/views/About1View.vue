<template>
  <div class="about">
    <h1>This is an {{pageName}} page</h1>
    <p>{{fullName}}</p>
    <button  @click="hadleClick()" >click me</button>  
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'About1View',
  data:()=>({
    pageName : 'about1',
    firstName: 'praf',
    lastName:'kara',
  }),
  computed:{
    fullName(){
        return this.firstName +  this.lastName
    }
  },
//   props:{},
  methods:{
    hadleClick(){
            console.log("as")
    }

  },
  components: {
    // HelloWorld
  }
}
</script>
