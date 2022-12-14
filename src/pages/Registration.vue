<template>
  <img class="reg-back-button"
       src="https://kopeysk.is74.ru/oldsite/business/assets/img/arrow.png"
       @click="goBack" alt="<">
  <PeopleCard click-handler="post" button-text="Добавить" @onClose="goBack"/>
</template>

<script>

import PeopleCard from "@/components/PeopleCard";

export default {
  name: "RegistrationPage",
  emits: ['setMainPage'],
  components: {
    PeopleCard
  },
  methods: {
    goBack() {
      this.$emit('setMainPage')
    }
  }
}
</script>

<style scoped>
@import "../styles/constants.css";
.reg-back-button {
  height: 40px;
  width: 40px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 100%;
  padding: 6px;
  background-color: rgba(255, 255, 255, 10%);
  rotate: 180deg;
  cursor: pointer;
  box-shadow: -1px -1px 4px #BBB;
  transition: 0.3s;
}
</style>
