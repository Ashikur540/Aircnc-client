
import React, { useContext, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { getUserRole } from '../Api/userManagement'
import Spinner from '../Components/Spinner/Spinner'
import { AuthContext } from '../contexts/AuthProvider'

const HostRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext)
    const [role, setRole] = useState(null)
    const [roleLoading, setRoleLoading] = useState(true)
    useEffect(() => {
        setRoleLoading(true)
        getUserRole(user?.email).then(data => {
            setRole(data)
            setRoleLoading(false)
        })
    }, [user])

    if (loading || roleLoading) {
        return (
            <div className='h-screen'>
                <Spinner />
            </div>
        )
    }

    if (user && user.uid && role === 'Host') {
        return children
    }
    return <Navigate to='/dashboard' />
}

export default HostRoute