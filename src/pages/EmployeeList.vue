<template>
  <BlockLink text="Добавить"
             class="add-btn"
             avatar="https://kopeysk.is74.ru/oldsite/abonents/img/icon_job2.png"
             link="reg"/>
  <CardList
    v-if="filtredData.length==0"
    @changeStatus="changeStatus"
    v-bind:cards="cards"/>
    <CardList
    v-else
    @changeStatus="changeStatus"
    v-bind:cards="filtredData"/>
  <div class="container">
    <SearchInputVue class="input" @changeInputText="filter" text="Фильтр по ФИО"></SearchInputVue>
  </div>
</template>

<script>
import CardList from '../components/CardList.vue'
import axios from 'axios';
import BlockLink from "@/components/BlockLink";

export default {
  name: 'App',
  components: {
    BlockLink,
    CardList,
  },
  data(){
    return {
      cards: [
      ],
      filtredData: []
    }
  },
  methods:{
    changeStatus(card){
        console.log(card);
        let index = this.cards.indexOf(card);
        this.cards[index].status = !this.cards[index].status;
        //TODO query
    },
    filter(str){
        console.log(str);
        this.filtredData = this.cards.filter(function(card) {
          return card.name.includes(str);
        });
    },
  },
  mounted(){ //TODO query
    axios
      .get("http://185.233.200.96/get_all_employees_on_id_deportament/?id_deportament=9")
      .then(response => {
        this.cards = [...response.data.result];
        console.log(response.data.result);
      });
  }
}
</script>

<style>
.add-btn{
  margin-left: auto;
  margin-right: auto;
}

.container{
  display: flex;
  align-items: stretch;
  position: fixed;
  bottom: 0;
  width: 100%
}

.input{
  width: 100%;
}
</style>
