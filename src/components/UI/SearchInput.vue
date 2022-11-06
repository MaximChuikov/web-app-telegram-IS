<template>
    <input type="text" class="search-input" v-bind:value="str" @input="changeInputText" :placeholder="this.text"/>
</template>

<script>
export default {
  name: "SearchInputVue",
  props: {
    text: String,
  },
  data(){
    return {
      str: ""
    }
  },
  methods: {
    changeInputText(event){
      this.str = event.target.value;
      this.$emit('changeInputText', this.str);
    }
  }
}
</script>

<style scoped>
.search-input {
  background-color: white;
  height: 30px;
  margin: 10px 0;
  padding-left: 10px;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid var(--gray-color);
}

.search-input:focus{
  outline: none;
}

.search-input:focus::placeholder{
    visibility: hidden;
}
</style>