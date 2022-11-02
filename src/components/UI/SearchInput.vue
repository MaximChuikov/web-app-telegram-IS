<template>
    <input type="text" v-bind:value="str" @input="changeInputText" :placeholder="this.text"/>
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
input{
    height: 30px;
    margin: 10px;
    padding-left: 10px;
    border-radius: 3px;
    font-size: 16px;
    border: 1px solid black;
    transition: all 2s ease;
}

input:focus{
  border-radius: 20px;
  outline: none;
}

input:focus::placeholder{
    visibility: hidden;
}
</style>