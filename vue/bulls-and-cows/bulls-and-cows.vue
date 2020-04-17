<template>
  <div>
    <h1>{{ result }}</h1>
    <form v-on:submit="onSubmitForm">
      <input ref="answer" maxlength="4" v-model="value" />
      <button>input</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: '',
      result: '',
    }
  },
  method: {
    onSubmitForm(event) {
      event.preventDefault();
    }
  }
};
</script>

<style>

</style>