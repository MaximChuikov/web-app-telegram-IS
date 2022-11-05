import Registration from "@/pages/Registration";
import EmployeeList from "@/pages/EmployeeList";

const currentRoute = window.location.pathname
const NotFound = <p>Page not found</p>

const routes = {
    '/': <EmployeeList/>,
    '/reg': <Registration/>
}

const App = () => {
  return routes[currentRoute] ?? NotFound
}

export default App