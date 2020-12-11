<template>
  <div >
    <div class="df">
      <Header
      :correct-answers="correctAnswers"
      :total-questions="totalQuestions"
    />
    </div>
    

    <div class="qb">
      <QuestionBox
        v-if="questions.length > 0"
        class="column is-half is-offset-3"
        :question-data="questions[questionIndex]"
        :next="handleNext"
        :handle-correct-answer="handleCorrectAnswer"
      />
    </div>
  </div>
</template>

<script>
import regeneratorRuntime from 'regenerator-runtime';
import Header from '../components/Header.vue';
import QuestionBox from '../components/QuestionBox.vue';

export default {
  name: 'Quiz',

  components: {
    Header,
    QuestionBox,
  },

  data() {
    return {
      questions: [],
      questionIndex: 0,

      correctAnswers: 0,
      totalQuestions: 0,
    };
  },

  async mounted() {
    const questionsResponse = await fetch('https://opentdb.com/api.php?amount=10&category=21&difficulty=hard&type=multiple', {
      method: 'GET',
    })
      .then((apiResponse) => apiResponse.json())
      .catch((err) => console.warn(err));

    const { results } = questionsResponse;

    this.questions = results;
    this.totalQuestions = results.length;
  },

  methods: {
    handleNext() {
      const finalQuestionIndex = this.questions.length - 1;

      if (this.questionIndex >= 0 && this.questionIndex < finalQuestionIndex) {
        this.questionIndex++;
      }
    },

    handleCorrectAnswer(isCorrect) {
      if (isCorrect) {
        this.correctAnswers++;
      }
    },
  },

};
</script>

<style lang="scss">
@import './node_modules/bulma/bulma.sass';

.qb{
    position: relative;
    left: 20%;
    width: 100%;
}

.header{
    position: relative;
}
</style>
