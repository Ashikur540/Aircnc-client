import { Bars3Icon } from '@heroicons/react/24/solid'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthProvider'
import AdminMenu from './AdminMenu'
import HostMenu from './HostMenu'
import UserMenu from './UserMenu'

const Sidebar = ({ role }) => {
    const { user } = useContext(AuthContext);
    const [isActive, setActive] = useState('false')
    // role = 'Admin'
    // Sidebar Responsive Handler
    const handleToggle = () => {
        setActive(!isActive)
    }
    return (
        <div className=''>
            {/* Small Screen Navbar */}
            <div className='bg-gray-100 text-gray-800 flex justify-between md:hidden'>
                <div>
                    <div className='block cursor-pointer p-4 font-bold'>
                        <Link to='/'>AirCnC</Link>
                    </div>
                </div>

                <button
                    onClick={handleToggle}
                    className='mobile-menu-button p-4 focus:outline-none focus:bg-gray-700'
                >
                    <Bars3Icon className='h-5 w-5' />
                </button>
            </div>
            {/* Sidebar */}
            <div
                className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${isActive && '-translate-x-full'
                    }  md:translate-x-0  transition duration-200 ease-in-out`}
            >
                < h2 className="text-3xl font-semibold text-center text-gray-800 dark:text-white">AirCnC</h2>

                <div className="flex flex-col items-center mt-6 -mx-2">
                    <img className="object-cover w-24 h-24 mx-2 rounded-full" src={user?.photoURL} alt="avatar" />
                    <h4 className="mx-2 mt-2 font-medium text-gray-800 ">{user?.displayName}</h4>
                    <p className="mx-2 mt-1 text-sm font-medium text-gray-600 ">{user.email}</p>
                </div>

                <div className="flex flex-col justify-between flex-1 mt-6">
                    <nav>
                        {
                            !role && <UserMenu />
                        }
                        {
                            role === 'Admin' && <AdminMenu />
                        }
                        {
                            role === 'Host' && <HostMenu />
                        }
                        {
                            role === 'requested' && <UserMenu />
                        }
                    </nav>
                </div>
            </div >
        </div >
    )
}

export default Sidebar

