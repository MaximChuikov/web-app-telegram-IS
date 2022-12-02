<template>
  <div class="b-popup" @click="closePopup">
    <img class="close-button" @click="closePopup" :src="require('../assets/images/cross.png')" alt="Х"/>
    <div class="b-popup-content" v-on:click.stop>
      <button class="delete-button" @click="deletePeople">
        Удалить
      </button>
      <PeopleCard click-handler="edit"
                  button-text="Сохранить изменения"
                  first_name=""
                  last_name=""
                  mid_name=""
                  phone=""
                  job=""
                  is_employee=""
                  birth=""/>
    </div>
  </div>
</template>

<script>
import PeopleCard from "@/components/PeopleCard";
import axios from "axios";

export default {
  name: "EditEmployee",
  components: {PeopleCard},
  data() {
    return {
      first_name: "",
      last_name: "",
      mid_name: "",
      phone: "",
      job: "",
      is_employee: "",
      birth: ""
    }
  },
  props: {
    emp_id: Number,
  },
  beforeMount() {
    this.getPeople()
  },
  methods: {
    async deletePeople() {
      await axios.delete(`https://1472-185-233-200-96.eu.ngrok.io?id=${this.emp_id}`)
    },
    closePopup() {
      this.$emit('onClose')
    },
    async getPeople() {
      const employee = await axios.get(`https://1472-185-233-200-96.eu.ngrok.io/get_employee?id=${this.emp_id}`,{
        headers: {
          "ngrok-skip-browser-warning": "69420"
        }
      })
          .then(e => {
            console.log(e)
            e.data.result
          })
          .catch(e => {
            console.log(e)
            alert("Ошибка " + e.message)
            this.$emit('onClose')
          })
      const name = employee.full_name.split(' ')
      this.first_name = name[1]
      this.last_name = name[0]
      this.mid_name = name[2]
      this.phone = employee.phone
      this.job = employee.department_name
      this.birth = employee.date_born
      this.is_employee = employee.is_employee
    }
  }
}
</script>

<style scoped>
.close-button {
  position: absolute;
  cursor: pointer;
  right: 8px;
  top: 8px;
  padding: 16px;
  width: 16px;
  height: 16px;
  z-index: 3;
}

.b-popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  overflow: hidden;
  position: fixed;
  top: 0;
  overflow-y: scroll;
  z-index: 2
}

.b-popup .b-popup-content {
  z-index: 2;
  overflow-y: visible;
}

.delete-button {
  background-color: #c41111;
  position: fixed;
  left: 15px;
  top: 21px;
  border-radius: 4px;
  font-size: 18px;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: #a66744 0 0 10px;
  transition: 0.3s;
}

.delete-button:hover {
  background-color: #7c0b0b;
}
</style>