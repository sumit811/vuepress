<template>
  <fragment>
    <h2>Login in</h2>
    <form v-on:submit="login" novalidate><!--was-validated-->
    <h4 v-if="loggedinUser.data">{{loggedinUser.data.message}}</h4>
      <div class="form-group">
        <label>Email address</label>
        <!-- <input type="text" class="form-control" v-bind:class="{ 'is-invalid':$v.email.$invalid,'is-valid':!$v.email.$invalid }" v-model.trim="email" placeholder="Enter your email" @blur="$v.email.$touch()"> -->
        <input type="text" class="form-control" v-model.trim="email" placeholder="Enter your email" @blur="$v.email.$touch()" v-bind:class="{ 'is-invalid':$v.email.$error, 'is-valid':$v.email.email && $v.email.$anyDirty }">
        <p v-if="!$v.email.required" class="invalid-feedback">Please enter your email.</p>
        <p v-if="!$v.email.email" class="invalid-feedback">Please enter valid email address.</p>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" v-model.trim="password" placeholder="Enter your Password" @blur="$v.password.$touch()" v-bind:class="{ 'is-invalid':$v.password.$error, 'is-valid':!$v.password.$error && $v.password.$anyDirty }">
        <p v-if="!$v.password.required" class="invalid-feedback">Please enter password.</p>
      </div>
      <!-- <div class="form-group form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1">
        <label class="form-check-label" for="exampleCheck1">Remember me</label>
      </div> -->
      <button type="submit" class="btn btn-primary float-left">Submit</button>
      <button type="reset" class="btn float-right" @click="reset">Clear</button>
    </form>
    <!-- {{ loggedinUser }} -->
  </fragment>
</template>
<script>
import { required,email} from 'vuelidate/lib/validators'
export default {
    data(){
        return{
            email:'',
            password: '',
            msg: ''
        }
    },
    computed:{
        loggedinUser(){
          console.dir(this.$store.state.user);
          return this.$store.state.user;
        }
    },
    methods:{
        reset: function(){
          this.reset_vuelidate();
          this.resetData();
        },
        login:function(e){
            // console.log('email-'+this.email+' , password - '+this.password);
            this.$v.$touch();
            if(!this.$v.invalid){
              this.$store.dispatch( 'fetchUser', {
                  email: this.email,
                  password: this.password
              }).then(success =>{
                window.$('#signup').modal('hide');
                console.log('sssssss');
                console.info(success);
              })
              .catch(error => {
                console.log('wwww');
                console.warn(error);
              })
            }
            e.preventDefault();
        },
        reset_vuelidate:function(){
          this.$v.$reset();
        },
        modalHide:function(){
          const that = this;
          window.$('#signup').on('hidden.bs.modal', function () {
            that.reset_vuelidate();
            that.resetData();
          })
        },
        resetData: function(){
          this.email='';
          this.password='';
        }
    },
    mounted(){
      this.modalHide()
    },
    validations:{
      email: {
        required,
        email
      },
      password: {
        required
      },
    }
};
</script>