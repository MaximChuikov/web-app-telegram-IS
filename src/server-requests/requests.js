import axios from "axios";

const server_url = 'https://5582-2a09-5302-ffff-00-1ce6.eu.ngrok.io/'

class ServerRequests {
    async addPeople(last_name, first_name, mid_name, phone, job, birth, is_employee) {
        let url = server_url
        url += 'create_employee?'
        url += 'full_name=' + last_name + ' ' +first_name + ' ' + mid_name
        url += '&phone_number=' + phone
        url += '&department_name=Учебный центр'//+ job
        url += '&date_born=' + birth
        url += '&is_employee=' + is_employee
        console.log(url)
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
        url += '&department_name=Учебный центр'// + job
        url += '&date_born=' + birth
        url += '&is_employee=' + is_employee
        await axios.patch(url)
            .then(() => {
                alert('Изменения сохранены')
            })
            .catch(() => alert('Ошибка'))
    }

    async getEmployeesByDepId(id_departament) {
        let url = server_url
        url += 'get_all_employees_on_id_departament/'
        url += '?id_departament='
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
                    abonnement_status: e.abonnement_status
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
            .then(function(response) {
                return response.json();
              })
              .then(function(data) {
                var userid = JSON.parse(data);
                console.log(userid);
                return userid;
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