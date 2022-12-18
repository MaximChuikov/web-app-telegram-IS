<template>
  <PeopleCard click-handler="update"
              button-text="Сохранить изменения"
              :first_name=first_name
              :last_name=last_name
              :mid_name=mid_name
              :phone=phone
              :job=job
              :is_employee=is_employee
              :birth=birth
              :emp_id=this.emp_id
              @setMainPage="setMainPage"
  />
</template>

<script>
import PeopleCard from "@/components/PeopleCard";
import axios from "axios";

export default {
  name: "EditEmployee",
  emits: ['setMainPage'],
  components: {PeopleCard},
  data() {
    return {
      first_name: "",
      last_name: "",
      mid_name: "",
      phone: "",
      job: 0,
      is_employee: "",
      birth: "",
    }
  },
  props: {
    emp_id: Number,
  },
  beforeCreate() {
    axios.get('https://5582-2a09-5302-ffff-00-1ce6.eu.ngrok.io/get_employee?id=' + this.emp_id, {
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    })
        .then(e => {
          const employee = e.data.result
          const name = employee.full_name.split(' ')
          this.first_name = name[1]
          this.last_name = name[0]
          this.mid_name = name[2]
          this.phone = employee.phone_number
          this.job = employee.department_id
          this.birth = employee.date_born.split(' ')[0]
          this.is_employee = employee.is_employee
        })
        .catch(e => {
          console.log(e)
          alert("Ошибка " + e.message)
          this.getMainPage()
        })
  },
  methods: {
    setMainPage(){
      this.$emit('setMainPage')
    },
  }
}
</script>

<style scoped>

.b-popup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
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
</style>