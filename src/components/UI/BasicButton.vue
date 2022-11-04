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
.btn{
  background-color: var(--tg-theme-button-color);
  color: #fff;
  box-shadow: 0 0 1px black;
  padding: 10px;
  border: none;
  border-radius: 10px;
  transition: border-radius 0.4s ease;
}

.btn:hover{
  border-radius: 25px;
}

.btn:active{
  box-shadow: none;
}
</style>