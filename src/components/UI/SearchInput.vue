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

<style scope>
.search-input {
  background-color: var(--tg-theme-bg-color);
  color: var(--tg-theme-text-color);
  height: 30px;
  margin: 10px;
  padding-left: 10px;
  border-radius: 3px;
  font-size: 16px;
  border: 1px solid black;
  transition: all 2s ease;
}

.search-input:focus{
  border-radius: 20px;
  outline: none;
}

.search-input:focus::placeholder{
    visibility: hidden;
}
</style>