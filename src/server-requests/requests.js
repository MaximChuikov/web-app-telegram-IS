import axios from "axios";

const server_url = 'https://0b21-185-233-200-96.eu.ngrok.io/'

class ServerRequests {
    async addPeople(last_name, first_name, mid_name, phone, job, birth, is_employee) {
        let url = server_url
        url += `create_employee?`
        url += `full_name=${
            last_name + ' ' +
            first_name + ' ' +
            mid_name
        }&`
        url += `phone_number=${phone}&`
        url += `department_name=${job}&`
        url += `date_born=${birth}&`
        url += `is_employee=${is_employee}`
        await axios.post(url)
            .then(() => {
                alert('Человек добавлен')
                this.$emit('onClose')
            })
            .catch(() => alert('Ошибка'))
    }

    async editPeople(emp_id, last_name, first_name, mid_name, phone, job, birth, is_employee) {
        let url = server_url
        url += `change_employee?`
        url += `id=${emp_id}&`
        url += `full_name=${
            last_name + ' ' +
            first_name + ' ' +
            mid_name
        }&`
        url += `phone_number=${phone}&`
        url += `department_name=${job}&`
        url += `date_born=${birth}&`
        url += `is_employee=${is_employee}`
        await axios.patch(url)
            .then(() => {
                alert('Изменения сохранены')
                this.$emit('onClose')
            })
            .catch(() => alert('Ошибка'))
    }

    async getDepartments() {
        const deps = await axios.get('https://0d79-185-233-200-96.eu.ngrok.io/get_all_departament')
            .then(e => e.data.result.map(e => {
                return {
                    id: e.id,
                    name: e.name
                }
            }))
            .catch(() => [{name: 'Ошибка загрузки', id: 0}])
        return deps
    }
}

export default new ServerRequests()