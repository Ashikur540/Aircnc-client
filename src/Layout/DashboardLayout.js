import React, { useContext, useEffect, useState } from 'react'
import { Outlet } from 'react-router'
import { getUserRole } from '../Api/userManagement'
import Sideber from '../Components/Dashboard/Sidebar'
import { AuthContext } from '../contexts/AuthProvider'
const DashboardLayout = () => {
  const { user } = useContext(AuthContext)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getUserRole(user?.email).then(data => {

      console.log(data);
      setRole(data);
      // eta korlam jate role na pawa porjonto jno form ta na dekhai
      setLoading(false);
    })
  }, [user])

  return (
    <div className='md:flex relative min-h-screen'>
      <div>
        <Sideber role={role}></Sideber>
      </div>
      <div className='flex-1 md:ml-64'>
        <div className="p-5">

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout