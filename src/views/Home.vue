<template>
  <div class="container mainbody">
      <div class="row">
        <div class="col-12 col-sm-3">
          <Sidebar/>
        </div>
        <div class="col-12 col-sm-9">
          <!-- <AppBody/> -->
          <router-view></router-view>
        </div>
      </div>
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
// import AppBody from "../components/AppBody.vue";

export default {
  name: 'Home',
  components: {
    // AppBody,
    Sidebar
  }
}
</script>
<style>
.mainbody{
  padding-bottom: 100px;
}
</style>


<style>
</style>
