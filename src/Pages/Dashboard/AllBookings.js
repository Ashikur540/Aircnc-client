import React, { useContext, useEffect, useState } from 'react'
import { getAllBookingsAdmin } from '../../Api/bookings'
import TableRow from '../../Components/TableRow'
import { AuthContext } from '../../contexts/AuthProvider'

const AllBookings = () => {
    const { user } = useContext(AuthContext)
    const [bookings, setBookings] = useState(null)
    const [loading, setLoading] = useState(true)
    const fetchBookings = () => {
        setLoading(true)
        getAllBookingsAdmin(user?.email)
            .then(data => {
                console.log(data);

                setBookings(data)
            })
            .catch(err => {
                console.log(err.message)
                setLoading(false)
            })
        setLoading(false)
    }
    useEffect(() => {
        fetchBookings();
    }, [user])

    return (
        <div class='container mx-auto px-4 sm:px-8'>
            <div class='py-8'>
                <div class='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
                    <div class='inline-block min-w-full shadow rounded-lg overflow-hidden'>
                        <table class='min-w-full leading-normal'>
                            <thead>
                                <tr>
                                    <th
                                        scope='col'
                                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Title
                                    </th>
                                    <th
                                        scope='col'
                                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Location
                                    </th>
                                    <th
                                        scope='col'
                                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Price
                                    </th>
                                    <th
                                        scope='col'
                                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        From
                                    </th>
                                    <th
                                        scope='col'
                                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        To
                                    </th>
                                    <th
                                        scope='col'
                                        class='px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-normal'
                                    >
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    bookings &&
                                    bookings.map(booking =>

                                        <TableRow
                                            key={booking._id}
                                            booking={booking}
                                            fetchBookings={fetchBookings}
                                        />


                                    )
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AllBookings