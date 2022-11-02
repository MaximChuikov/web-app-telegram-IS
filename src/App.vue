<template>
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
import CardList from './components/CardList.vue'
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CardList,
  },
  data(){
    return {
      cards: [
        {id: 0, name: "Козлов Илья Адамович", phone: "8 993 343 23 53", status: true},
        {id: 1, name: "Белова Ника Александровна", phone: "8 993 343 23 53", status: true},
        {id: 2, name: "Румянцев Владислав Петрович", phone: "8 993 343 23 53", status: false},
        {id: 3, name: "Рыжова Анна Георгиевна", phone: "8 993 343 23 53", status: true},
        {id: 4, name: "Зайцева Сабина Робертовна", phone: "8 543 343 23 53", status: false},
        {id: 5, name: "Иванов Демид Дмитриевич", phone: "8 993 343 23 53", status: false},
        {id: 6, name: "Серебряков Константин Андреевич", phone: "8 993 343 23 53", status: true},
        {id: 7, name: "Козлов Илья Адамович", phone: "8 993 343 23 53", status: true},
        {id: 8, name: "Белова Ника Александровна", phone: "8 993 343 23 53", status: true},
        {id: 9, name: "Румянцев Владислав Петрович", phone: "8 993 343 23 53", status: false},
        {id: 10, name: "Рыжова Анна Георгиевна", phone: "8 993 343 23 53", status: true},
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
      .get("")
      .then(response => {console.log(response)});
  }
}
</script>

<style>
body, *{
  margin: 0;
  box-sizing: border-box;
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
