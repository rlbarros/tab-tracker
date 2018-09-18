<template>
  <v-layout align-center justify-center column>
    <v-flex xs6>
      <panel title="Login">
        <div class="pl-4 pr-4 pt-2 pb-2">
          <v-text-field type="email" name="email" v-model="email" label="email" outline/>
          <br>
          <v-text-field type="password" name="password" v-model="password" label="password" outline/>
          <br>
          <div class="danger-alert" v-html="error" />
          <v-btn class="cyan" @click="login" dark>
            Login
          </v-btn>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  data() {
    return {
      email: this.email,
      password: this.password,
      error: null
    }
  },
  methods: {
    async login() {
      try {
        const response = await AuthenticationService.login({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
        this.$router.push({
          name: 'songs'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style scoped>
</style>
