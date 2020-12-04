<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="loginBut">
      <div class="form-group">
        <label for="emailaddress">E-mail address</label>
        <input
          type="text"
          v-model="emailaddress"
          name="emailaddress"
          class="form-control"
          :class="{ 'is-invalid': submitted && !emailaddress }"
        />
        <div v-show="submitted && !emailaddress" class="invalid-feedback">
          E-mail address is required
        </div>
      </div>
      <div class="form-group">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          v-model="password"
          name="password"
          class="form-control"
          :class="{ 'is-invalid': submitted && !password }"
        />
        <div v-show="submitted && !password" class="invalid-feedback">
          Password is required
        </div>
      </div>
      <p class="forgot-password text-center text">
        <router-link to="/forgotpassword">Forgot password?</router-link>
      </p>
      <div class="border border-light p-3 mb-4">
        <div class="text-center">
          <button
            class="btn btn-primary btn-lg btn-block"
          >
            Login
          </button>
        </div>
        <label>
          Don't have an account yet?
          <router-link to="/register" class="btn btn-link"
            >Register</router-link
          >
        </label>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import firebase from 'firebase/app';
import '@firebase/auth';

export default {
  data() {
    return {
      emailaddress: '',
      password: '',
      submitted: false,
    };
  },
  computed: {
    ...mapState('account', ['status']),
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions('account', ['login', 'logout']),
    handleSubmit(e) {
      this.submitted = true;
      const { emailaddress, password } = this;
      if (emailaddress && password) {
        this.login({ emailaddress, password });
      }
    },
    loginBut() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.emailaddress, this.password)
        .then((data) => {
          console.log(data);
          // this.$router.replace({ name: "secret" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
