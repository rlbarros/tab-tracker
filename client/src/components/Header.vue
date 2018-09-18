
<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <router-link
        class="home"
        tag="span"
        :to="{
          name: 'songs'
        }">
        TabTracker
      </router-link>
    </v-toolbar-title>

    <v-toolbar-items>
        <v-btn to="/songs" flat dark>
          Browse
        </v-btn>
    </v-toolbar-items>

<!--     <v-toolbar-items>
      <v-btn flat dark>
        Browse
      </v-btn>
    </v-toolbar-items>-->
    <v-spacer></v-spacer>

     <v-toolbar-items v-if="!$store.state.isUserLoggedIn">
       <v-btn flat dark
        to="/login">
          Login
        </v-btn>
        <v-btn flat dark
        to="/register">
          Sign Up
        </v-btn>
    </v-toolbar-items>

    <v-toolbar-items v-if="$store.state.isUserLoggedIn">
        <v-btn flat dark
        @click="logout">
          Log out
        </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch('setToken', null)
      this.$store.dispatch('setUser', null)
      this.$router.push({ name: 'songs' })
    }
  }
}
</script>

<style scoped>
.home {
  cursor: pointer;
}

.home:hover {
  color: #e9e;
}
</style>
