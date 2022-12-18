<template>
  <PeopleCard click-handler="post"
              button-text="Добавить"
              @setMainPage="getMainPage"/>
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
    getMainPage() {
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
