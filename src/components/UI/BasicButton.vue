<template>
    <button class="btn">
            <slot></slot>
    </button>
</template>

<script>
  export default{
    name: "BasicButtonVue",
  }
</script>

<style scoped>
@import "../../styles/constants.css";
.btn{
  background: var(--blue-gradient);
  color: rgb(245, 245, 245);
  box-shadow: 0 0 1px black;
  padding: 10px;
  border: none;
  border-radius: 10px;
  transition: all 0.5s ease;
}

.btn:hover{
  background: var(--blue-gradient-focused);
  border-radius: 12px;
}

.btn:active{
  box-shadow: none;
}
</style>