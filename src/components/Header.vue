<template>
  <header class="header">
    <nav
      class="navbar is-info"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item brand labelmove">
            Quiz
          </a>

          <a class="navbar-item is-tab is-active labelmove">
            Counter: {{ correctAnswers }}/{{ totalQuestions }}
          </a>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',

  props: [
    // eslint-disable-next-line
    'correctAnswers',
    // eslint-disable-next-line
    'totalQuestions',
  ],
};
</script>

<style scoped lang="scss">
.labelmove{
  left: 50rem;
}
</style>
