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
            :disabled="status.loggingIn"
          >
            Login
          </button>
        </div>
        <img
          v-show="status.loggingIn"
          src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA=="
        />

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
import { mapState, mapActions } from "vuex";
import firebase from "firebase/app";
import "@firebase/auth";

export default {
  data() {
    return {
      emailaddress: "",
      password: "",
      submitted: false,
    };
  },
  computed: {
    ...mapState("account", ["status"]),
  },
  created() {
    // reset login status
    this.logout();
  },
  methods: {
    ...mapActions("account", ["login", "logout"]),
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
          //this.$router.replace({ name: "secret" });
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>