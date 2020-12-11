<template>
  <div class="box">
    <article class="media">
      <div class="media-content">
        <div class="content">
          <section class="section">
            <header class="header">
              <h6>
                {{ questionData.question }}
              </h6>
            </header>

            <main class="main">
              <p>Click on the answer you think it's the right one.</p>

              <ul class="list">
                <li
                  v-for="(answer, index) in shuffledAnswers"
                  :key="index"
                >
                  <button
                    class="button"
                    :class="answerClass(index)"
                    @click="handleSelectedIndex(index)"
                  >
                    {{ answer }}
                  </button>
                </li>
              </ul>
            </main>

            <div class="columns">
              <button
                class="button column is-3 is-info"
                :disabled="selectedIndex === null || answered"
                @click="handleAnswerSubmit"
              >
                submit
              </button>

              <button
                class="button column is-3 is-success"
                @click="next"
              >
                next
              </button>
            </div>
          </section>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'QuestionBox',

  props: {
    // eslint-disable-next-line
    questionData: Object,
    // eslint-disable-next-line
    next: Function,
    // eslint-disable-next-line
    handleCorrectAnswer: Function,
  },

  data() {
    return {
      selectedIndex: null,
      correctIndex: null,
      shuffledAnswers: [],
      answered: false,
    };
  },

  computed: {
    answers() {
      const answers = [...this.questionData.incorrect_answers];
      answers.push(this.questionData.correct_answer);

      return answers;
    },
  },

  watch: {
    questionData: {
      immediate: true,

      handler() {
        this.selectedIndex = null;
        this.shuffleAnswers();
        this.answered = false;
      },
    },
  },

  methods: {
    handleSelectedIndex(index) {
      this.selectedIndex = index;
    },

    getAnswersArray() {
      return [...this.questionData.incorrect_answers, this.questionData.correct_answer];
    },

    shuffleAnswers() {
      const answers = this.getAnswersArray();

      this.shuffledAnswers = _.shuffle(answers);
      this.correctIndex = this.shuffledAnswers.indexOf(this.questionData.correct_answer);
    },

    handleAnswerSubmit() {
      this.answered = true;

      let isCorrect = false;

      const selectedAnswer = this.shuffledAnswers[this.selectedIndex];

      if (selectedAnswer === this.questionData.correct_answer) {
        isCorrect = true;

        this.handleCorrectAnswer(isCorrect);
      }
    },

    answerClass(index) {
      let answerClass = '';

      if (this.selectedIndex === index && !this.answered) {
        answerClass = 'selected';
      } else if (this.answered && this.correctIndex === index) {
        answerClass = 'correct';
      } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
        answerClass = 'incorrect';
      }

      return answerClass;
    },
  },
};
</script>

<style scoped lang="scss">
    .header h6, .main p {
        text-align: center;
    }

    .columns {
        margin-top: 1.4rem;
        padding: 1rem 1.6rem;
        justify-content: center;
    }

    .box {
        margin: 4rem;
    }

    .button {
        display: flex;
        font-weight: bold;
    }

    .button + .button {
        margin-left: 4rem;
    }

    .list {
        list-style: none;
    }

    .list * {
        width: 100%;
        margin-top: 1.2rem;
    }

    .correct {
        background-color: #77BD8B;
    }

    .incorrect {
        background-color: #BC0022;
    }

    .selected {
        background-color: #5199FF;
    }
</style>
