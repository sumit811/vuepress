<template>
    <div class="modal fade" id="signup" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{ modalName }}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <ForgotPassword v-if="modalName==='forget_password'"/>
            <Login v-if="modalName==='log_in'"/>
            <Signup v-if="modalName==='create_account'" />
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import ForgotPassword from './Forgot-password';
import Login from './Login';
import Signup from './Signup';
export default {
  components:{
    ForgotPassword,
    Login,
    Signup
  },
  computed:{
    modalName(){
      return this.$store.state.modalName;
    },
    modalTitle(){
      return this.$store.state.modalTitle;
    }
  }
}
</script>