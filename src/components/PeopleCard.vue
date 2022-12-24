<template>
  <div class="flex-center-container">
    <div class="main-card">
      <button v-if="clickHandler === 'update'" class="delete-button" @click="deletePeople">
        Удалить
      </button>
      <img class="close-button" @click="setMainPage" :src="require('../assets/images/cross.png')" alt="Х"/>

      <img src="../assets/images/logo.png"
           class="logo" alt="Интерсвязь, твой шаг в будущее"/>
      <form>

        <div class="input-container">
          <div class="input_wrap">
            <select id="job" class="selector"  v-model="selected">
              <option v-for="item in departments" :value="item.id" :key="item.id">{{ item.name }}</option>
            </select>
            <label>Отдел</label>
          </div>
          <div class="input_wrap">
            <input type="tel"
                   required
                   v-bind:value=input_phone
                   @input="input_phone = $event.target.value"
                   pattern="89[\d]{9}" class="reg-input"
                   placeholder=" "
                   title="Телефон начинается с 8 и без различных знаков. Например, 89000111222">
            <label>Номер телефона</label>
          </div>
          <div class="input_wrap">
            <input type="text"
                  v-bind:value=input_last_name
                  @input="input_last_name = $event.target.value"
                  class="reg-input" required>
            <label>Фамилия</label>
          </div>
          <div class="input_wrap">
            <input type="text"
                  class="reg-input"
                  v-bind:value=input_first_name
                  @input="input_first_name = $event.target.value"
                  required>
            <label>Имя</label>
          </div>
          <div class="input_wrap">
            <input type="text"
                  class="reg-input"
                  v-bind:value=input_mid_name
                  @input="input_mid_name = $event.target.value"
                  required>
            <label>Отчество</label>
          </div>
          <div class="input_wrap">
            <input class="not-visible reg-input"
                  v-bind:value=input_birth
                  @input="input_birth = $event.target.value"
                  type="text"
                  required>
            <label class="upped-label">Дата рождения: дд.мм.гггг</label>
          </div>
          <div class="input_wrap" v-if="clickHandler === 'post'">
            <input class="not-visible reg-input"
                  v-bind:value=input_reg_date
                  @input="input_reg_date = $event.target.value"
                  type="text"
                  required>
            <label class="upped-label">Абонемент действует с: дд.мм.гггг</label>
          </div>
          <div class="input_wrap display-row last_wrap">
            <input v-model="input_is_employee"
                  type="checkbox"
                  class="emp_checkbox"/>
            <p v-bind:class="{active: input_is_employee}">Сотрудник</p>
          </div>
        </div>
        <button type="button" class="reg-button" @click="handler">{{ buttonText }}</button>
      </form>
    </div>
  </div>

</template>

<script>
import Requests from "@/server-requests/requests";
//import {dep_id} from "@/main";

export default {
  name: "PeopleCard",
  props: {
    /*
      "post" or "update"
     */
    clickHandler: String,
    buttonText: String,
    job: {
      type: Number,
      default: 0
    },
    first_name: {
      type: String,
      default: ""
    },
    last_name: {
      type: String,
      default: ""
    },
    mid_name: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      default: ""
    },
    birth: {
      type: String,
      default: ""
    },
    is_employee: {
      type: Boolean,
      default: true
    },
    emp_id: {
      type: Number
    }
  },
  data() {
    return {
      input_job: this.job,
      input_first_name: this.first_name,
      input_last_name: this.last_name,
      input_mid_name: this.mid_name,
      input_phone: this.phone,
      input_birth: this.birth,
      input_is_employee: this.is_employee,
      input_emp_id: this.emp_id,

      input_reg_date: '',
      dep_id: Number,
      selected: Number,
      departments: [
        {name: 'Загрузка', id: 1}
      ]
    }
  },
  beforeCreate() {
    console.log('hello')
    Requests.getDepartments().then(
        e => {
          this.departments = e
          document.getElementById("job").value = this.job;
          const url = new URL(window.location.href);
          const id = url.searchParams.get("id");
          this.dep_id = id
          this.selected = this.dep_id
          
          const today = new Date();
          const mm = String(today.getMonth() + 1).padStart(2, '0');
          const yyyy = today.getFullYear()
          this.input_reg_date = '01.' + mm + '.' + yyyy;
        }
    );
    console.log(this.input_reg_date)
  },
  methods: {
    setMainPage(){
      this.$emit('setMainPage')
    },
    editPeople() {
      Requests.editPeople(
          this.emp_id,
          this.input_last_name,
          this.input_first_name,
          this.input_mid_name,
          this.input_phone,
          this.selected,
          this.input_birth,
          this.input_is_employee
      ).then(() => this.setMainPage())
    },
    addPeople() {
      Requests.addPeople(
          this.input_last_name,
          this.input_first_name,
          this.input_mid_name,
          this.input_phone,
          this.selected,
          this.input_birth,
          this.input_is_employee,
          this.input_reg_date
      ).then(() => this.setMainPage())
    },
    async handler() {
      if (this.clickHandler === "post") {
        await this.addPeople()
      } else if (this.clickHandler === "update") {
        await this.editPeople()
      }
    },
    async deletePeople() {
      Requests.deletePeople(this.emp_id).then(() => this.setMainPage())
    },
  }
}
</script>

<style scoped>
@import "../styles/constants.css";

.flex-center-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.display-row {
  display: flex;
  flex-direction: row;
}

.change-people-button {
  height: 20px;
  width: 20px;
  margin: 0 6px;
  border-radius: 100%;
  padding: 6px;
  background-color: rgba(255, 255, 255, 10%);
  cursor: pointer;
  box-shadow: 1px 1px 4px #BBB;
  transition: 0.3s;
}

.ribbon {
  background: rgba(200, 200, 200, .42);
  width: 50px;
  height: 70px;
  position: relative;
  top: 19px;
  border: 1px solid rgba(255, 255, 255, .3);
  border-top: 2px solid rgba(255, 255, 255, .5);
  border-bottom: 0;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 3px rgba(0, 0, 0, .7);
}

.ribbon:before {
  content: "";
  display: block;
  width: 15px;
  height: 15px;
  background: #4E535B;
  border: 4px solid #cfd0d1;
  margin: 18px auto;
  box-shadow: inset 0 0 5px #000, 0 0 2px #000, 0 1px 1px 1px #A7A8AB;
  border-radius: 100%;
}

.main-card {
  position: relative;
  background: #FFF;
  border-bottom: 2px solid #C5C5C8;
  border-radius: 5px;
  text-align: center;
  color: #FFF;
  text-shadow: 0 1px 2px #BBB;
  max-width: 300px;
  padding: 15px 40px 20px 40px;
  box-shadow: 0 0 3px #000;
}

.close-button {
  position: absolute;
  cursor: pointer;
  right: 5px;
  top: 5px;
  padding: 16px;
  width: 16px;
  height: 16px;
  z-index: 3;
}

.delete-button {
  background-color: #c41111;
  position: absolute;
  left: 5px;
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

.logo{
  width:50px;
  transform: translateY(-10px);
}

.emp_checkbox{
  width: 25px;
}

.reg-input, .input_wrap select {
  border: none;
  border-radius: 5px;
  height: 47px;
  width: 93%;
  padding: 0 0 0 7%;
  overflow-wrap: normal;
  font-size: 20px;
  box-shadow: none;
}

.reg-input:-webkit-autofill,
.reg-input:-webkit-autofill:hover,
.reg-input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px white inset;
  -webkit-text-fill-color: var(--gray-color);
}

.not-visible {
  color: transparent;
  transition: 1.3s;
  background-color: white;
}

.not-visible::-webkit-calendar-picker-indicator {
  filter: invert(1);
  transition: 0.2s;

}

.active{
  color: #000;
  font-weight: bold;
}

.not-visible:focus::-webkit-calendar-picker-indicator,
.not-visible:valid::-webkit-calendar-picker-indicator {
  filter: none;
  transition: 1.3s;
}

.not-visible:focus, .not-visible:valid {
  color: inherit;
}

.upped-label {
  font-size: 12px;
  color: #afbdcf;
  top: -5px;
  left: 10px;
  background: #ffffff;
  padding: 0 5px 0 5px;
}

.reg-input:focus + label, .reg-input:valid + label {
  font-size: 12px;
  color: #afbdcf;
  top: -5px;
  left: 10px;
  background: #ffffff;
  border-radius: 2px;
  padding: 0 5px 0 5px;
}

.reg-input[type=tel]:not(:placeholder-shown):invalid + label {
  font-size: 12px;
  color: #cb3563;
  top: -5px;
  left: 10px;
  background: #ffffff;
  border-radius: 10px;
  padding: 0 5px 0 5px;
}

.reg-input[type=tel]:placeholder-shown {
  color: #466ed2;
}

.reg-input[type=tel]:valid + label {
  animation-name: phone-valid;
  animation-duration: 2s;
}

@keyframes phone-valid {
  20% {
    color: #2ea630;
  }
  50% {
    color: #2ea630;
  }
}

.input_wrap {
  width: 100%;
  height: auto;
  position: relative;
  border-bottom: 2px solid #afbdcf;
}

.last_wrap {
  border-bottom: none;
}

.input_wrap label {
  font-size: 16px;
  color: #afbdcf;
  padding: 14px;
  position: absolute;
  top: 0;
  left: 0;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
  pointer-events: none;
}

.input_wrap select + label {
  font-size: 12px;
  color: #afbdcf;
  top: -5px;
  left: 10px;
  background: #ffffff;
  border-radius: 10px;
  padding: 0 5px 0 5px;
}

.selector {
  border: none;
  outline: none;
  scroll-behavior: smooth;
  text-overflow: ellipsis;
  background-color: white;
}

.reg-input:focus {
  outline: none;
}

.input-container {
  transform: translateY(-10px);
  border: 2px solid #afbdcf;
  border-radius: 5px;
}

.reg-button {
  margin-top: 5px;
  display: block;
  width: 100%;
  line-height: 2em;
  background: var(--blue-gradient);
  background-size: 200%;
  background-position: left;
  border-radius: 5px;
  border: 0;
  cursor: pointer;
  border-top: 1px solid #B2ECE6;
  box-shadow: 0 0 0 1px var(--blue-color), 0 2px 2px #808389;
  color: #FFFFFF;
  font-size: 1.5em;
  transition: all 0.6s;
}

button:hover {
  background-position: right;
}


</style>