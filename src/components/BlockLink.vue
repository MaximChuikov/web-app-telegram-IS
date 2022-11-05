<template>
  <a href="{{ link }}" class="block-link-a">
    <img v-bind:src="avatar"
         class="avatar"
         alt="Фото">
    <p class="block-link-p">{{ text }}</p>
    <img src="https://kopeysk.is74.ru/oldsite/business/assets/img/arrow.png"
         class="arrow"
         alt=">">
  </a>
</template>

<script>
export default {
  name: "BlockLink",
  props: {
    link: String,
    text: String,
    avatar: String
  }
}
</script>

<style scoped>
.block-link-a {
  height: 60px;
  max-width: 300px;
  box-shadow: 0 3px 4px rgba(0,0,0, 0.1);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 14px;
  font-size: 25px;
  text-decoration: none;
  border-radius: 0 5px 5px 0;
  background: hsl(0, 0%, 99%);
  transition: .2s linear;
  border-left: 4px solid rgba(38, 71, 150, 0.41);
}
.avatar {
  height: 50px;
}
.block-link-p {
  margin: 0;
  position: relative;
}
.block-link-p:before {
  content: "";
  width: 0;
  bottom: 0;
  height: 2px;
  background: rgba(38, 71, 150, 0.4);
  transition: .2s ease-in-out;
  position: absolute;
}

.block-link-a:hover {
  box-shadow: 0 3px 15px rgba(0,0,0, 0.3);
}
.block-link-a:hover p:before {
  width: 100%;
}

.arrow {
  height: 30px;
}


</style>