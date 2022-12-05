import Registration from "@/pages/Registration";
import EmployeeList from "@/pages/EmployeeList";
import EditEmployee from "@/pages/EditEmployee";
import {createRouter, createWebHistory} from "vue-router";

const routes = [
    {
        path: '/',
        name: 'home',
        component: EmployeeList
    },
    {
        path: '/reg',
        name: 'reg',
        component: Registration
    },
    {
        path: '/edit/:emp_id',
        name: 'edit',
        component: EditEmployee,
        params: true
    }

]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;