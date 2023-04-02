import { Tab } from '@headlessui/react'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import React, { Fragment, useContext, useState } from 'react'
import toast from 'react-hot-toast'
import { useLocation } from "react-router-dom"
import { saveBookings } from '../Api/bookings'
import CheckoutCart from '../Components/CheckoutCart'
import CheckoutForm from '../Components/Form/CheckoutForm'
import ReviewHouse from '../Components/ReviewHouse'
import WhosComing from '../Components/WhosComing'
import { AuthContext } from '../contexts/AuthProvider'
const Checkout = () => {
    const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_KEY}`);
    const { user } = useContext(AuthContext)
    const { state: reservationdata } = useLocation()

    console.log(reservationdata);
    const [bookingData, setBookingData] = useState({
        home: {
            homeID: reservationdata.homeData?._id,
            hostEmail: reservationdata?.homeData?.host?.host_email,
            homeTitle: reservationdata.homeData?.title,
            image: reservationdata.homeData?.image,
            totalPrice: reservationdata.totalPrice,
            location: reservationdata.homeData?.location,
        },
        guestEmail: user?.email,
        guestName: user?.displayName,
        from: reservationdata.homeData?.from,
        to: reservationdata.homeData?.to,
        message: "",


    })
    // navigation of tabs we need tabindex ..by default 0 so this is render 0 no tab
    const [selectedIndex, setSelectedIndex] = useState(0)
    console.log('booking:', bookingData)
    const handleBooking = () => {
        console.log(bookingData);
        // saveBookings(bookingData)
        saveBookings(bookingData)
            .then(data => {
                console.log(data);
                toast.success('booking successfull')
            })
            .catch(err => toast.error(err?.message))
        // const data = saveBookings(bookingData);
        // if (data) {
        //     data.then(() => {
        //         console.log(data);
        //     })
        //     toast.success('booking successfull')
        // }

    }

    return (
        <div className='md:flex gap-5 items-start justify-between sm:mx-10 md:mx-20 px-4 lg:mx-40 py-4'>
            {/* Details */}
            <div className='flex-1'>
                <Tab.Group
                    selectedIndex={selectedIndex}
                    onChange={setSelectedIndex}
                    defaultIndex={1}
                >
                    <Tab.List>
                        <div className='container flex flex-wrap items-center py-4 mx-auto overflow-y-auto whitespace-nowrap'>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        1. Reviews house rules
                                    </button>
                                )}
                            </Tab>

                            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-5 h-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </span>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        2. Who's coming?
                                    </button>
                                )}
                            </Tab>

                            <span className='mx-5 text-gray-500 dark:text-gray-300 rtl:-scale-x-100'>
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    className='w-5 h-5'
                                    viewBox='0 0 20 20'
                                    fill='currentColor'
                                >
                                    <path
                                        fillRule='evenodd'
                                        d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                                        clipRule='evenodd'
                                    />
                                </svg>
                            </span>
                            <Tab as={Fragment}>
                                {({ selected }) => (
                                    <button
                                        className={selected ? 'text-blue-600' : 'text-gray-600'}
                                    >
                                        3. Confirm and pay
                                    </button>
                                )}
                            </Tab>
                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        <Tab.Panel>
                            <ReviewHouse setSelectedIndex={setSelectedIndex}
                                reservationdata={{
                                    ...reservationdata
                                }} />
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* WhosComing Comp */}
                            <WhosComing
                                setSelectedIndex={setSelectedIndex}
                                bookingData={bookingData}
                                setBookingData={setBookingData}
                            />
                        </Tab.Panel>
                        <Tab.Panel>
                            {/* Payment Comp */}
                            {/* <Payment handleBooking={handleBooking} /> */}

                            <Elements stripe={stripePromise}>
                                <CheckoutForm bookingData={bookingData} />
                            </Elements>

                        </Tab.Panel>
                    </Tab.Panels>
                </Tab.Group>
            </div>

            {/* Cart */}
            <CheckoutCart reservationdata={{
                ...reservationdata
            }} />
        </div>
    )
}

export default Checkout