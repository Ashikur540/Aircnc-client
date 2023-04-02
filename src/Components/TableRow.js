import { format } from 'date-fns'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { deleteBooking } from '../Api/bookings'
import DeleteModal from './Modal/DeleteModal'

const TableRow = ({ booking, fetchBookings }) => {
    let [isOpen, setIsOpen] = useState(false)

    function openModal() {
        setIsOpen(true)
    }
    function closeModal() {
        setIsOpen(false)
    }
    const modalHandler = (id) => {

        deleteBooking(id).then(data => {
            console.log(data);
            toast.success('successfully canceled')
            fetchBookings()
            closeModal()
        })
    }
    console.log('tablerow', booking)
    return (
        <tr>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <div className='flex items-center'>
                    <div className='flex-shrink-0'>
                        <div className='block relative'>
                            <img
                                alt='profile'
                                src={booking?.home?.image}
                                className='mx-auto object-cover rounded h-10 w-15 '
                            />
                        </div>
                    </div>
                    <div className='ml-3'>
                        <p className='text-gray-900 whitespace-no-wrap'>
                            {booking?.home?.homeTitle}
                        </p>
                    </div>
                </div>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {booking?.home?.location}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>${booking?.home?.totalPrice}</p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {format(new Date(booking?.from), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <p className='text-gray-900 whitespace-no-wrap'>
                    {' '}
                    {format(new Date(booking?.to), 'P')}
                </p>
            </td>
            <td className='px-5 py-5 border-b border-gray-200 bg-white text-sm'>
                <span
                    onClick={openModal}
                    className='relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight'
                >
                    <span
                        aria-hidden='true'
                        className='absolute inset-0 bg-red-200 opacity-50 rounded-full'
                    ></span>
                    <span className='relative'>Cancel</span>
                </span>
                <DeleteModal
                    modalHandler={modalHandler}

                    isOpen={isOpen}
                    closeModal={closeModal}
                    id={booking._id}
                />
            </td>
        </tr>
    )
}

export default TableRow