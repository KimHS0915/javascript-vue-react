<template>
  <div>
    <h1>Bulls And Cows</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" maxlength="4" v-model="value" />
      <button type="submit">input</button>
    </form>
    <div>{{ tryOrTries }} : {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries" :key="t.try">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
const getNumbers = () => {
  const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidates.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

export default {
  data() {
    return {
      answer: getNumbers(),
      tries: [],
      value: '',
      tryOrTries: 'Try',
    }
  },
  methods: {
    onSubmitForm() {
      if (this.value === this.answer.join('')) {
        alert(`Answer is ${this.answer.join('')}, You Win!`)
        this.value = '';
        this.answer = getNumbers();
        this.tries = [];
        this.tryOrTries = 'Try';
        this.$refs.answer.focus();
      } else if (this.tries.length >= 9) {
        alert(`You Lose!, Answer is ${this.answer.join('')}`);
        this.value = '';
        this.answer = getNumbers();
        this.tries = [];
        this.tryOrTries = 'Try';
        this.$refs.answer.focus();
      } else {
        let bulls = 0;
        let cows = 0;
        const answerArray = this.value.split('').map(v => parseInt(v));
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.answer[i]) {
            bulls++;
          } else if (this.answer.includes(answerArray[i])) {
            cows++;
          }
        }
        this.tries.push({
          try: this.value,
          result: `bulls : ${bulls}, cows : ${cows}`
        });
        if (this.tries.length > 1) {
          this.tryOrTries = 'Tries';
        }
        this.value = '';
        this.$refs.answer.focus();
      }
      this.value = '';
      this.$refs.answer.focus();
    }
  }
};
</script>

<style>

</style>