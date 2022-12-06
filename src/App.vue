<template>
    <div>
        <Registration
            v-if="currentPage === 'Registration'"
            @setMainPage="setMainPage"></Registration>
        <EmployeeList 
            v-else-if="currentPage === 'EmployeeList'"
            @changeEmp="setChangeEmpID"
            @setRegPage="setRegPage"></EmployeeList>
        <EditEmployee
                    v-else
                    v-bind:emp_id="this.empEditID"
                    @setMainPage="setMainPage"></EditEmployee>
    </div>
</template>

<script>
import Registration from "@/pages/Registration";
import EmployeeList from "@/pages/EmployeeList";
import EditEmployee from "@/pages/EditEmployee";
  export default{
    components: {
        Registration,
        EmployeeList,
        EditEmployee,
    },
    data() {
    return {
      currentPage: 'EmployeeList',
      depID: Number,
      empEditID: Number,
    }
  },
  methods: {
    setRegPage(){
        this.currentPage = 'Registration'
    },
    setMainPage(){
        this.currentPage = 'EmployeeList'
    },
    setChangeEmpID(id){
        this.empEditID = id;
        this.currentPage = EditEmployee
    },
    beforeMount(){
 },
  }
  }
</script>

<style scoped>
</style>