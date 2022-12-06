import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI'
import router from '@/router/router';

let dep
console.log(window.location.href)
if (!localStorage.getItem('dep_id')) {
    console.log(localStorage.getItem('dep_id'))
    dep = window.location.href
    localStorage.setItem('dep_id', dep)
}
else {
    dep = localStorage.getItem('dep_id')
}
console.log(dep)

export const dep_id = dep


const app = createApp(App);

components.forEach(component => {
    app.component(component.name, component);
})

app.use(router)
    .mount('#app');
