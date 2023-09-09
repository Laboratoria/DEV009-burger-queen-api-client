
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/navbar'

const AdminLayout = () => {
  return (
    <div>
      <NavbarComponent/>
      <Outlet/>
    </div>
  )
}

export default AdminLayout
