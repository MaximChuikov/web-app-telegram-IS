<template>
  <BlockLink text="Добавить"
             class="add-btn"
             avatar="https://kopeysk.is74.ru/oldsite/abonents/img/icon_job2.png"
             link="reg"/>
  <CardList
      v-if="filteredData.length==0"
      @changeStatus="changeStatus"
      v-bind:cards="cards"/>
  <CardList
      v-else
      @changeStatus="changeStatus"
      v-bind:cards="filteredData"/>
  <!-- <div class="personal-data">
    <h5>WebAppInitData</h5>
    <div>user: {{window.Telegram.WebApp.WebAppInitData.user}}</div>

    <h5>WebAppUser</h5>
    <div>id: {{window.Telegram.WebApp.WebAppUser.id}}</div>
    <div>first_name: {{window.Telegram.WebApp.WebAppUser.first_name}}</div>
    <div>photo_url: {{window.Telegram.WebApp.WebAppUser.photo_url}}</div>
  </div> -->
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
  data() {
    return {
      editShow: true,
      cards: [],
      filteredData: []
    }
  },
  methods: {
    changeStatus(card) {
      console.log(card);
      axios
        .get("https://0b21-185-233-200-96.eu.ngrok.io/change_status_aboniment/?id_employ=" + card.id,
          {
            headers: {
              "ngrok-skip-browser-warning": "69420"
            }
        })
        .then(response => {
          let cardStatus = response.data.result;
          if(cardStatus === true || cardStatus === false)
          {
            let index = this.cards.indexOf(card);
            this.cards[index].abonnement_status = cardStatus;
          }
          console.log(response.data.result);
        });
    },
    filter(str) {
      let currentFilter = str.toUpperCase();
      this.filteredData = [...this.cards.filter(function (card) {
        let currentName = card.full_name.toUpperCase();
        return currentName.indexOf(currentFilter) >= 0;
      })];
    },
  },
  mounted() { //TODO query
    axios
        .get("https://0b21-185-233-200-96.eu.ngrok.io/get_all_employees_on_id_deportament/?id_deportament=8",
          {
            headers: {
              "ngrok-skip-browser-warning": "69420"
            }
        })
        .then(response => {
          this.cards = [...response.data.result];
          console.log(this.cards);
        });
  }
}
</script>

<style>
.add-btn {
  margin-right: auto;
}

.container {
  display: flex;
  align-items: stretch;
  position: sticky;
  bottom: 0;
  width: 100%
}

.input {
  width: 100%;
}
</style>
