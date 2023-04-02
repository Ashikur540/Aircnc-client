import React, { useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { getImageUrl } from '../../Api/UploadImage'
import { getUserRole, hostRequest } from '../../Api/userManagement'
import BecomeHostForm from '../../Components/Form/BecomeAhostForm'
import { AuthContext } from '../../contexts/AuthProvider'
const BecomeAHost = () => {
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




    console.log(role);
    const handleSubmit = event => {
        event.preventDefault()
        const location = event.target.location.value
        const image = event.target.image.files[0]
        getImageUrl(image)
            .then(imageUrl => {
                // console.log(imageUrl);
                const hostData = {
                    location,
                    documentImg: imageUrl,
                    role: 'requested',
                    email: user.email,
                }
                console.log(hostData);

                // handle become host function 
                hostRequest(hostData).then(data => {
                    console.log(data);
                    toast.success('request to become a host has send to be approved')
                })


            })
            .catch(err => {
                console.log(err.message)
            })


    }

    return (
        <>
            {
                role ?
                    (
                        <div className='h-screen text-gray-600 flex flex-col justify-center items-center pb-16 text-xl lg:text-3xl'>
                            Request Sent, wait for admin approval
                        </div>
                    ) :

                    (

                        <>
                            {!loading && <BecomeHostForm handleSubmit={handleSubmit} />}
                        </>
                    )
            }

        </>
    )
}

export default BecomeAHost