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
  background-size: 200%;
  background-position: left;
  color: white;
  box-shadow: 0 0 1px black;
  padding: 10px;
  border: none;
  border-radius: 10px;
  transition: 0.25s linear;
}

.btn:hover{
  background-position: right;
}

.btn:active{
  box-shadow: none;
}
</style>