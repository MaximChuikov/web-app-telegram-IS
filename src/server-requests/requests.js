import axios from "axios";

const server_url = 'https://5582-2a09-5302-ffff-00-1ce6.eu.ngrok.io/'

class ServerRequests {
    async addPeople(last_name, first_name, mid_name, phone, job, birth, is_employee,
                    reg_date) {
        let url = server_url
        url += 'create_employee?'
        url += 'full_name=' + last_name + ' ' +first_name + ' ' + mid_name
        url += '&phone_number=' + phone
        url += '&department_id=' + job
        url += '&date_born=' + birth
        url += '&date_start_aboniment=' + reg_date
        url += '&is_employee=' + is_employee
        console.log(url)
        console.log(reg_date)
        await axios.post(url)
            .then(() => {
                alert('Человек добавлен')
            })
            .catch(() => alert('Ошибка'))
    }

    async editPeople(emp_id, last_name, first_name, mid_name, phone, job, birth, is_employee) {
        let url = server_url
        url += 'change_employee?'
        url += 'id=' + emp_id
        url += '&full_name=' + last_name + ' ' + first_name + ' ' + mid_name
        url += '&phone_number=' + phone
        url += '&department_id=' + job
        url += '&date_born=' + birth
        url += '&is_employee=' + is_employee
        await axios.patch(url)
            .then(() => {
                alert('Изменения сохранены')
            })
            .catch(() => alert('Ошибка'))
    }

    async deletePeople(emp_id) {
        let url = server_url
        url += 'delete_employee?'
        url += 'id=' + emp_id
        await axios.delete(url)
            .then(() => {
                //
            })
            .catch(() => alert('Ошибка'))
    }

    async changeStatus(emp_id) {
        let url = server_url
        url += 'change_status_aboniment?'
        url += 'id_employ=' + emp_id
        await axios.get(url)
            .then(() => {
                //
            })
            .catch(() => alert('Ошибка'))
    }

    async getEmployeesByDepId(id_departament) {
        let url = server_url
        url += 'get_all_employees_on_id_departaments/'
        url += '?id_departaments='
        url += id_departament

        const empList = await axios
            .get(url,
              {
                headers: {
                  "ngrok-skip-browser-warning": "69420"
                }
            })
            .then(e => e.data.result.map(e => {
                return {
                    full_name: e.full_name,
                    id: e.id,
                    department_id: e.department_id,
                    phone_number: e.phone_number,
                    abonnement_status: e.abonnement_status,
                    is_employee: e.is_employee
                }
            }))
            .catch(() => [{
                full_name: 'Список пуст',
                id: -1,
                department_id: -1,
                phone_number: '',
                abonnement_status: false
            }])
        return empList
    }

    async getEmployee(id) {
        let url = server_url
        url += 'get_employee'
        url += '?id='
        url += id

        const empList = axios
            .get(url,
              {
                headers: {
                  "ngrok-skip-browser-warning": "69420"
                }
            })
              .then(e => {
                console.log(e.data.result)
                return {
                    full_name: e.data.result.full_name,
                    id: e.data.result.id,
                    date_born: e.data.result.date_born,
                    department_id: e.data.result.department_id,
                    phone_number: e.data.result.phone_number,
                    abonnement_status: e.data.result.abonnement_status,
                    is_employee: e.data.result.is_employee
                }
            })
        return empList
    }

    async getDepartments() {
        const deps = await axios.get(server_url + 'get_all_departament',
            {
                headers: {
                    "ngrok-skip-browser-warning": "69420"
                  }
            })
            .then(e => e.data.result.map(e => {
                return {
                    id: e.id,
                    name: e.departament_name
                }
            }))
            .catch(() => [{name: 'Ошибка загрузки', id: 0}])
        return deps
    }
}

export default new ServerRequests()