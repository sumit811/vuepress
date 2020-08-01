<template>
  <div>
    <h1>Profile</h1>
    <article class="text-left">
      <table class="table table-dark">
        <thead>
          <tr>
            <th scope="col">Field</th>
            <th scope="col">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>First Name</td>
            <td>
              {{userDetail.data.first_name}}
            </td>
          </tr>
          <tr>
            <td>Last Name</td>
            <td>
              {{userDetail.data.last_name}}
            </td>
          </tr>
          <tr>
            <td>Nick Name</td>
            <td>
              {{userDetail.data.nickname}}
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              {{userDetail.data.email}}
            </td>
          </tr>
          <tr>
            <td>Website</td>
            <td>
              {{userDetail.data.url}}
            </td>
          </tr>
        </tbody>
      </table>
      <!-- {{ userDetail }} -->
    </article>
  </div>
</template>
<script>
export default {
  computed: {
    userDetail() {
      return this.$store.state.user;
    }
  }
};
</script>