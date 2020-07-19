<template>
  <div>
    <h2>Login in</h2>
    <form v-on:submit="login">
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>
        <input type="text" class="form-control" v-model="username" placeholder="Enter Your Username">
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" v-model="password" placeholder="Enter Your Password">
      </div>
      <!-- <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Remember me</label>
      </div> -->
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>
<script>
export default {
    data(){
        return{
            username:'',
            password: ''
        }
    },
    methods:{
        login:function(e){
            console.log('username-'+this.username+' , password - '+this.password);
            this.$store.dispatch( 'fetchUser', {
                username: this.username,
                password: this.password
            });
            e.preventDefault();
        }
    }
};
</script>