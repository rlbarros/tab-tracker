<template>
  <v-layout align-center justify-center column>
    <v-flex xs6>
      <panel>
        <div class="pl-4 pr-4 pt-2 pb-2">
          <form name="tab-tracker-form" autocomplete="off">
            <v-text-field type="email" name="email" v-model="email" label="email" outline/>
            <br>
            <v-text-field type="password" name="password" v-model="password"
            label="password" autocomplete="new-password" outline/>
            <br>
            <div class="error" v-html="error" />
            <v-btn class="cyan" @click="register" dark>
              Register
            </v-btn>
          </form>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  data() {
    return {
      email: this.email,
      password: this.password,
      error: null
    }
  },
  methods: {
    async register() {
      try {
        const response = await AuthenticationService.register({
          email: this.email,
          password: this.password
        })
        this.$store.dispatch('setToken', response.data.token)
        this.$store.dispatch('setUser', response.data.user)
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.error {
  color: red;
}
</style>
