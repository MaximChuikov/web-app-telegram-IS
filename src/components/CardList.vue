<template>
  <div class="hello">

    <!--    Поп ап-->
    <EditEmployee v-if="pop_up_show" @onClose="closePopup" :emp_id="focused_employee_id"/>

    <div class="card" v-for="card in cards" v-bind:key="card.id">
      <div class="card__info">
        <p class="card__name">{{ card.full_name }}</p>
        <p class="card__phone">{{ card.phone_number }}</p>

        <img class="edit-button" @click="openPopup(card.id)" :src="require('../assets/images/edit.png')"/>
      </div>
      <div class="card__actions">
        <div class="card__status" :rel="card.abonnement_status ? 'yes' : 'no'">
          <div class="card__status-center"></div>
        </div>
        <BasicButtonVue
            class="card__btn"
            v-on:click="changeStatus(card)" v-if="card.abonnement_status">
          Отменить<br/> абонемент
        </BasicButtonVue>
        <BasicButtonVue
            class="card__btn"
            v-on:click="changeStatus(card)" v-else>
          Добавить<br/> абонемент
        </BasicButtonVue>
      </div>
    </div>
  </div>
</template>

<script>

import EditEmployee from "@/components/EditEmployee";

export default {
  components: {EditEmployee},
  props: {
    cards: Array,
  },
  data() {
    return {
      test: true,
      pop_up_show: false,
      focused_employee_id: 0
    }
  },
  methods: {
    changeStatus(card) {
      this.$emit('changeStatus', card);
    },
    openPopup(id) {
      this.focused_employee_id = id
      this.pop_up_show = true
    },
    closePopup() {
      this.pop_up_show = false
    }
  }
}
</script>

<style scoped>
.edit-button {
  background-color: #2cc411;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: #aae85e 0 0 3px;
}

.card {
  display: flex;
  justify-content: space-between;
  position: relative;
  border-radius: 3px;
  padding: 10px;
  margin: 8px 0;
  box-shadow: 2px 4px 10px rgba(0, 0, 0, 0.3);
}

.card:nth-child(even) {
  background-color: white;
}

.card:nth-child(odd) {
  background-color: #f4f4f4;
}

.card__info p {
  font-size: 18px;
}

.card__status {
  width: 30px;
  height: 30px;
  background-color: #42b983;
  border-radius: 15px;
}

.card__status[rel=yes] {
  background-color: #2ea630;
}

.card__status[rel=no] {
  background-color: #c01c1c;
}

.card__status-center {
  position: relative;
  width: 14px;
  height: 14px;
  background-color: #f3f3f3;
  border-radius: 7px;
  top: 8px;
  left: 8px;
}

.card__actions {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
