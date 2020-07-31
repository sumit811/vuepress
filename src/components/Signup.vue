<template>
  <div>
    <h2>Create Account</h2>
    <form v-on:submit="signup" novalidate>
      <h3 v-if="newUserDetail.statusText">{{ newUserDetail.statusText }}</h3>
      <div class="form-group">
        <label>First Name</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="fname"
          placeholder="Enter your first name"
          @blur="$v.fname.$touch()"
          v-bind:class="{ 'is-invalid':$v.fname.$error, 'is-valid':!$v.fname.$error && $v.fname.$anyDirty }"
        >
        <p v-if="!$v.fname.required" class="invalid-feedback">Please enter first name.</p>
      </div>
      <div class="form-group">
        <label>Last Name</label>
        <input
          type="text"
          class="form-control"
          v-model.trim="lname"
          placeholder="Enter your last name"
          @blur="$v.lname.$touch()"
          v-bind:class="{ 'is-invalid':$v.lname.$error, 'is-valid':!$v.lname.$error && $v.lname.$anyDirty }"
        >
        <p v-if="!$v.lname.required" class="invalid-feedback">Please enter last name.</p>
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          v-model.trim="email"
          placeholder="Enter your email"
          @blur="$v.email.$touch()"
          v-bind:class="{ 'is-invalid':$v.email.$error, 'is-valid':$v.email.email && $v.email.$anyDirty }"
        >
        <p v-if="!$v.email.required" class="invalid-feedback">Please enter your email.</p>
        <p v-if="!$v.email.email" class="invalid-feedback">Please enter valid email address.</p>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input
          type="password"
          class="form-control"
          v-model="password"
          placeholder="Enter password"
          @blur="$v.password.$touch()"
          v-bind:class="{ 'is-invalid':$v.password.$error, 'is-valid':!$v.password.$error && $v.password.$anyDirty }"
        >
        <p v-if="!$v.password.required" class="invalid-feedback">Please enter password.</p>
        <p
          v-if="!$v.password.minLength"
          class="invalid-feedback"
        >Password must have at least {{$v.password.$params.minLength.min}} characters</p>
      </div>
      <div class="form-group">
        <label>Repeat Password</label>
        <input
          type="password"
          class="form-control"
          v-model="repeatPassword"
          placeholder="Enter password again"
          @blur="$v.repeatPassword.$touch()"
          v-bind:class="{ 'is-invalid':$v.repeatPassword.$error , 'is-valid':!$v.repeatPassword.$error && $v.repeatPassword.$anyDirty}"
        >
        <!-- <p v-if="!$v.repeatPassword.required" class="invalid-feedback">Please enter password.</p> -->
        <!-- <p v-if="$v.repeatPassword.required && !$v.repeatPassword.sameAsPassword" class="invalid-feedback">Password mismatch</p> -->
        <p v-if="!$v.repeatPassword.sameAsPassword" class="invalid-feedback">Password mismatch</p>
      </div>
      <button type="submit" class="btn btn-primary float-left">Submit</button>
      <button type="reset" class="btn float-right" @click="reset">Clear</button>
    </form>
  </div>
</template>
<script>
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      fname: "",
      lname: "",
      email: "",
      password: "",
      repeatPassword: ""
    };
  },
  computed: {
    newUserDetail() {
      return this.$store.state.newUser;
    }
  },
  methods: {
    signup: function(e) {
      this.$v.$touch();
      if (!this.$v.invalid) {
        this.$store
          .dispatch("newUserAction", {
            email: this.email,
            password: this.password,
            first_name: this.fname,
            last_name: this.lname,
            username: this.email
          })
          .then(success => {
            setTimeout(function(){ 
              window.$("#signup").modal("hide");
            }, 3000);
            console.log("sssssss");
            console.info(success);
          })
          .catch(error => {
            console.log("wwww");
            console.warn(error);
          });
      }
      e.preventDefault();
    },
    reset: function() {
      this.reset_vuelidate();
      this.resetData();
    },
    reset_vuelidate: function() {
      this.$v.$reset();
    },
    resetData: function() {
      this.fname = "";
      this.lname = "";
      this.email = "";
      this.password = "";
      this.repeatPassword = "";
    },
    modalHide: function() {
      const that = this;
      window.$("#signup").on("hidden.bs.modal", function() {
        that.reset_vuelidate();
        that.resetData();
      });
    }
  },
  mounted() {
    this.modalHide();
  },
  validations: {
    fname: {
      required
    },
    lname: {
      required
    },
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
    }
  }
};
</script>