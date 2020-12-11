<template>
    <div >         
       <router-view></router-view>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'app',
  computed: {
    ...mapState({
      alert: (state) => state.alert,
    }),
  },
  methods: {
    ...mapActions({
      clearAlert: 'alert/clear',
    }),
  },
  watch: {
    $route(to, from) {
      this.clearAlert();
    },
  },
};
</script>
<style lang="scss">
@import './node_modules/bulma/bulma.sass';


</style>