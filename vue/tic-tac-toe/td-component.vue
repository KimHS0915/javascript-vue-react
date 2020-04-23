<template>
  <td-component>{{ cellData }}</td-component>  
</template>

<script>
export default {
  propts: {
    cellData: String,
    rowIndex: Number,
    cellIndex: Number,
  },
};
</script>
