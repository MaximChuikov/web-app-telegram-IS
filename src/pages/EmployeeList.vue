<template>
  <BlockLink text="Добавить"
             class="add-btn"
             avatar="https://kopeysk.is74.ru/oldsite/abonents/img/icon_job2.png"
             @click="redirectReg()"/>
  <CardList
      v-if="filteredData.length==0"
      @changeStatus="changeStatus"
      @changeEmp="changeEmp"
      v-bind:cards="cards"/>
  <CardList
      v-else
      @changeStatus="changeStatus"
      @changeEmp="changeEmp"
      v-bind:cards="filteredData"/>
  <div class="container">
    <SearchInputVue class="input" @changeInputText="filter" text="Фильтр по ФИО"></SearchInputVue>
  </div>
</template>

<script>
import CardList from '../components/CardList.vue'
import axios from 'axios';
import BlockLink from "@/components/BlockLink";
import Requests from "@/server-requests/requests";

export default {
  name: 'App',
  emits: ['changeEmp', 'setRegPage'],
  components: {
    BlockLink,
    CardList,
  },
  data() {
    return {
      editShow: true,
      cards: [],
      filteredData: [],
      depID: Number,
    }
  },
  methods: {
    redirectReg(){
      this.$emit('setRegPage')
    },
    changeEmp(id) {
      this.$emit('changeEmp', id)
    },
    changeStatus(card) {
      console.log(card);
      axios
        .get("https://5582-2a09-5302-ffff-00-1ce6.eu.ngrok.io/change_status_aboniment/?id_employ=" + card.id,
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
    console.log(window.location.href.split('?')[1].split('=')[1])
    this.depID = window.location.href.split('?')[1].split('=')[1]
    Requests.getEmployeesByDepId(this.depID).then(
        e => {
          this.cards = e
          console.log(e)
        }
    )
  }
}
</script>

<style>
.add-btn {
  margin-right: auto;
  margin-left: auto;
  margin-bottom: 10px;
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
