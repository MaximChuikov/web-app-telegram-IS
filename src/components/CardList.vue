<template>
  <div class="hello">
    <div class="card" v-for="card in cards" v-bind:key="card.id">
      <div class="card__info">
        <p class="card__name">{{ card.full_name }}</p>
        <p class="card__phone">{{ card.phone_number }}</p>
      </div>
      <div class="card__actions">
        <div class="card__status" :rel="card.status ? 'yes' : 'no'">
          <div class="card__status-center"></div>
        </div>
        <BasicButtonVue
            class="card__btn"
            v-on:click="changeStatus(card)" v-if="card.status">
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
export default {
  components: {},
  props: {
    cards: Array,
  },
  data() {
    return {
      test: true,
    }
  },
  methods: {
    changeStatus(card) {
      this.$emit('changeStatus', card);
    }
  }
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  position: relative;
  border-radius: 3px;
  padding: 10px;
  margin: 8px 0;
  box-shadow: 2px 4px 10px rgba(0,0,0, 0.3);
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
