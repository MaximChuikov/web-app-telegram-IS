<template>
  <div class="hello">
    <div>
      <div class="card" v-for="card in cards" v-bind:key="card">
        <div class="card__info">
          <p class="card__name">{{card.full_name}}</p>
          <p class="card__phone">{{card.phone_number}}</p>
        </div>
        <div class="card__actions">
          <div class="card__status" :class="card.status ? 'background-green' : 'background-red'">
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
  </div> 
</template>

<script>
export default {
  components:{
  },
  props: {
    cards: Array,
  },
  data(){
    return{
      test: true,
    }
  },
  methods: {
    changeStatus(card){
        this.$emit('changeStatus', card);
    }
  }
}
</script>

<style scoped>
.card{
  display: flex;
  justify-content: space-between;
  position: relative;
  background-color: var(--tg-theme-bg-color);
  border-radius: 3px;
  padding: 10px;
  margin: 8px;
  color: var(--tg-theme-text-color);
}

.card__info p{
  font-size: 18px;

}
.card__status{
  width: 30px;
  height: 30px;
  background-color: #42b983;
  border-radius: 15px;
}
.card__status-center{
  position:relative;
  width: 14px;
  height: 14px;
  background-color: var(--tg-theme-bg-color);
  border-radius: 7px;
  top: 8px;
  left: 8px;
}

.background-green{
  background-color: green;
}

.background-red{
  background-color: red;
}

.card__actions{
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
