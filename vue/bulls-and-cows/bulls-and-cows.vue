<template>
  <div>
    <h1>{{ result }}</h1>
    <form @submit.prevent="onSubmitForm">
      <input ref="answer" maxlength="4" v-model="value" />
      <button type="submit">input</button>
    </form>
    <div>tries : {{ tries.length }}</div>
    <ul>
      <li v-for="t in tries" :key="t.try">
        <div>{{ t.try }}</div>
        <div>{{ t.result }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tries: [],
      value: '',
      result: '',
    }
  },
  methods: {
    onSubmitForm() {
      this.tries.push({
        try: this.value,
        result: '',
      });
      this.value = '';
      this.$refs.answer.focus();
    }
  }
};
</script>

<style>

</style>