<template>
  <div class="flex-center-container">
    <div class="ribbon"></div>
    <div class="main-card">

      <img src="https://kopeysk.is74.ru/oldsite/abonents/img/logo_white.jpg"
           class="logo" alt="Интерсвязь, твой шаг в будущее"/>
      <div class="display-row">
        <h1 v-if="isEmployee" class="reg-h1">Cотрудник</h1>
        <h1 v-else class="reg-h1">Родственник</h1>
        <img class="change-people-button"
             src="https://kopeysk.is74.ru/oldsite/business/assets/img/arrow.png"
             @click="changePeople" alt=">">
      </div>

      <p class="reg-p">Необходимо ввести данные</p>
      <form>

        <div class="input-container">
          <div class="input_wrap">
            <select id="job" class="selector">
              <option v-for="item in departments" :key="item.id">{{ item.name }}</option>
            </select>
            <label>Отдел</label>
          </div>
          <div class="input_wrap">
            <input type="tel" id="phone" required
                   pattern="89[\d]{9}" class="reg-input"
                   placeholder=" "
                   v-bind:value=phone
                   title="Телефон начинается с 8 и без различных знаков. Например, 89000111222">
            <label>Номер телефона</label>
          </div>
          <div class="input_wrap">
            <input type="text" id="last_name" v-bind:value=last_name class="reg-input" required>
            <label>Фамилия</label>
          </div>
          <div class="input_wrap">
            <input type="text" class="reg-input" v-bind:value=first_name id="first_name" required>
            <label>Имя</label>
          </div>
          <div class="input_wrap">
            <input type="text" class="reg-input" v-bind:value=mid_name id="mid_name" required>
            <label>Отчество</label>
          </div>
          <div class="input_wrap last_wrap">
            <input class="not-visible reg-input" v-bind:value=birth type="date" id="birth" required>
            <label class="upped-label">Дата рождения</label>
          </div>

        </div>
        <button type="button" class="reg-button" @click="handler">{{ buttonText }}</button>
      </form>
    </div>
  </div>

</template>

<script>
import Requests from "@/server-requests/requests";

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
      isEmployee: this.is_employee,
      departments: [
        {name: 'Загрузка', id: 1}
      ]
    }
  },
  beforeCreate() {
    Requests.getDepartments().then(
        e => {
          console.log(e)
          this.departments = e
          document.getElementById("job").value = this.job;
        }
    )
  },
  methods: {
    changePeople() {
      this.isEmployee = !this.isEmployee
    },
    editPeople() {
      Requests.editPeople(
          this.emp_id,
          document.getElementById('last_name').value,
          document.getElementById('first_name').value,
          document.getElementById('mid_name').value,
          document.getElementById('phone').value,
          document.getElementById('job').value,
          document.getElementById('birth').value,
          this.isEmployee
      ).then(() => this.$router.push('/'))
    },
    addPeople() {
      Requests.addPeople(
          document.getElementById('last_name').value,
          document.getElementById('first_name').value,
          document.getElementById('mid_name').value,
          document.getElementById('phone').value,
          document.getElementById('job').value,
          document.getElementById('birth').value,
          this.isEmployee
      ).then(() => this.$router.push('/'))
    },
    async handler() {
      if (this.clickHandler === "post") {
        await this.addPeople()
      } else if (this.clickHandler === "update") {
        await this.editPeople()
      }
    }
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

.display-row > h1 {
  margin: 0 auto;
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

.main-card:before {
  content: "";
  display: block;
  width: 70px;
  height: 4px;
  background: #4E535B;
  border-radius: 5px;
  border-bottom: 1px solid #FFFFFF;
  border-top: 2px solid #CBCBCD;
  margin: 0 auto;
}

.reg-h1 {
  font-size: 1.6em;
  margin: 3px 0 10px 0;
}

.reg-p {
  font-family: 'Open Sans', Arial, sans-serif;
  font-weight: 300;
  color: #7B808A;
  margin-top: 0;
  margin-bottom: 30px;
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
  border: 2px solid #afbdcf;
  border-radius: 5px;
}

.reg-button {
  margin-top: 20px;
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
  transition: background 0.6s;
}

button:hover {
  background-position: right;
}


</style>