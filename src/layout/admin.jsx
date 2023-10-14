
import { Outlet } from 'react-router-dom'
import NavbarComponent from '../components/navbar'

const AdminLayout = () => {
  return (
    <div>
      <NavbarComponent/>
      <section className='section'>
        <Outlet/>
      </section>
    </div>
  )
}

export default AdminLayout
