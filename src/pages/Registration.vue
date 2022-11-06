<template>
  <div class="ribbon"></div>
  <div class="main-card">
    <img class="reg-back-button"
         src="https://kopeysk.is74.ru/oldsite/business/assets/img/arrow.png"
         @click="goBack" alt="<">

    <img src="https://kopeysk.is74.ru/oldsite/abonents/img/logo_white.jpg"
         class="logo" alt="Интерсвязь, твой шаг в будущее"/>
    <h1 class="reg-h1">Новый сотрудник</h1>
    <p class="reg-p">Необходимо ввести данные сотрудника</p>
    <form @submit="doPost">
      <div class="input-container">

        <div class="input_wrap">
          <input class="reg-input" type="text" id="job" required>
          <label>Отдел</label>
        </div>
        <div class="input_wrap">
          <input type="tel" id="phone" required
                 pattern="89[\d]{9}" class="reg-input"
                 placeholder=" "
          title="89000111222">
          <label>Номер телефона</label>
        </div>
        <div class="input_wrap">
          <input type="text" id="last_name" class="reg-input" required>
          <label>Фамилия</label>
        </div>
        <div class="input_wrap">
          <input type="text" class="reg-input" id="first_name" required>
          <label>Имя</label>
        </div>
        <div class="input_wrap">
          <input type="text" class="reg-input" id="mid_name" required>
          <label>Отчество</label>
        </div>
        <div class="input_wrap last_wrap">
          <input class="not-visible reg-input"  type="date" id="birth" required>
          <label class="upped-label">Дата рождения</label>
        </div>

      </div>
      <button type="submit" class="reg-button">Добавить</button>
    </form>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "RegistrationPage",
  methods: {
    async doPost() {
      await axios.post('', {
        job: document.getElementById('job').value,
        first_name: document.getElementById('first_name').value,
        last_name: document.getElementById('last_name').value,
        mid_name: document.getElementById('mid_name').value,
        phone: document.getElementById('phone').value,
        birth: document.getElementById('birth').value,
      })
      this.goBack()
    },
    goBack() {
      window.history.back()
    }
  }
}
</script>

<style scoped>
@import "../styles/constants.css";

.reg-back-button {
  height: 40px;
  width: 40px;
  position: absolute;
  left: 10px;
  top: 10px;
  border-radius: 100%;
  padding: 6px;
  background-color: rgba(255, 255, 255, 10%);
  rotate: 180deg;
  cursor: pointer;
  box-shadow: -1px -1px 4px #BBB;
  transition: 0.3s;
}
.reg-back-button:hover {
  background-color: rgb(150, 150, 150, 10%);
  box-shadow: -2px -2px 7px #BBB;
}

.ribbon {
  background: rgba(200, 200, 200, .42);
  width: 50px;
  height: 70px;
  margin: 0 auto;
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
  margin: 0 auto;
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
  margin-top: 3px;
  margin-bottom: 10px;
}

.reg-p {
  font-family: 'Open Sans', Arial, sans-serif;
  font-weight: 300;
  color: #7B808A;
  margin-top: 0;
  margin-bottom: 30px;
}

.reg-input {
  border: none;
  border-radius: 5px;
  height: 47px;
  width:93%;
  padding: 0 0 0 7%;
  overflow-wrap: normal;
  font-size: 20px;
  box-shadow: none;
}


.not-visible{
  color: transparent;
  transition: 1.3s;
}
.not-visible::-webkit-calendar-picker-indicator{
  filter: invert(1);
  transition: 0.2s;

}
.not-visible:focus::-webkit-calendar-picker-indicator,
.not-visible:valid::-webkit-calendar-picker-indicator{
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
  left:10px;
  background: #ffffff;
  padding: 0 5px 0 5px;
}

.reg-input:focus + label, .reg-input:valid + label{
  font-size: 12px;
  color: #afbdcf;
  top: -5px;
  left:10px;
  background: #ffffff;
  border-radius: 10px;
  padding: 0 5px 0 5px;
}

.reg-input[type=tel]:not(:placeholder-shown):invalid + label {
  font-size: 12px;
  color: #cb3563;
  top: -5px;
  left:10px;
  background: #ffffff;
  border-radius: 10px;
  padding: 0 5px 0 5px;
}
.reg-input[type=tel]:placeholder-shown{
  color: #466ed2;
}

.input_wrap {
  width:100%;
  height:auto;
  position:relative;
  border-bottom: 2px solid #afbdcf;
}
.last_wrap {
  border-bottom: none;
}

.input_wrap label {
  font-size:16px;
  color: #afbdcf;
  padding: 14px;
  position: absolute;
  top: 0;
  left: 0;
  transition:0.2s ease all;
  -moz-transition:0.2s ease all;
  -webkit-transition:0.2s ease all;
  pointer-events: none;
}

.reg-input:focus {
  outline:none;
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
