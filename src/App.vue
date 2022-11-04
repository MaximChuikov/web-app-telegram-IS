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
        {id: 0, full_name: "Козлов Илья Адамович", phone_number: "8 993 343 23 53", status: true},
        {id: 1, full_name: "Белова Ника Александровна", phone_number: "8 993 343 23 53", status: true},
        {id: 2, full_name: "Румянцев Владислав Петрович", phone_number: "8 993 343 23 53", status: false},
        {id: 3, full_name: "Рыжова Анна Георгиевна", phone_number: "8 993 343 23 53", status: true},
        {id: 4, full_name: "Зайцева Сабина Робертовна", phone_number: "8 543 343 23 53", status: false},
        {id: 5, full_name: "Иванов Демид Дмитриевич", phone_number: "8 993 343 23 53", status: false},
        {id: 6, full_name: "Серебряков Константин Андреевич", phone_number: "8 993 343 23 53", status: true},
        {id: 7, full_name: "Козлов Илья Адамович", phone_number: "8 993 343 23 53", status: true},
        {id: 8, full_name: "Белова Ника Александровна", phone_number: "8 993 343 23 53", status: true},
        {id: 9, full_name: "Румянцев Владислав Петрович", phone_number: "8 993 343 23 53", status: false},
        {id: 10, full_name: "Рыжова Анна Георгиевна", phone_number: "8 993 343 23 53", status: true},
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
      .get("http://localhost:8000/verification/?name_responsible=" + "ФИО ответственного")
      .then(response => {console.log(response.data)});
  }
}
</script>

<style>
body, *{
  margin: 0;
  box-sizing: border-box;
}

body{
  background-color: var(--tg-theme-secondary-bg-color);
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
