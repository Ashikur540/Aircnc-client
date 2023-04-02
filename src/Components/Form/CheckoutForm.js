import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
// import { saveBooking } from '../../api/auth'
import { getPaymentIntent, saveBookings } from '../../Api/bookings'
// import { getPaymentIntent } from '../../api/bookings'

const CheckoutForm = ({ bookingData }) => {
    const navigate = useNavigate()
    const stripe = useStripe()
    const elements = useElements()
    const [cardError, setCardError] = useState('')
    const [processing, setProcessing] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const [clientSecret, setClientSecret] = useState('')
    console.log(bookingData);
    const { home, guestName, guestEmail } = bookingData
    // console.log(clientSecret)
    useEffect(() => {
        getPaymentIntent(home?.totalPrice, home?.homeID).then(data => {
            console.log(data);
            if (data?.clientSecret) {
                setClientSecret(data.clientSecret)
            }
        })
    }, [home?.totalPrice])

    const handleSubmit = async event => {
        event.preventDefault()

        if (!stripe || !elements) {
            return
        }

        const card = elements.getElement(CardElement)

        if (card === null) {
            return
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        setCardError(error?.message || '')
        setProcessing(true)
        // confirm card payment
        const { paymentIntent, error: intentError } =
            await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: guestName,
                        email: guestEmail,
                    },
                },
            })

        if (intentError) {
            setCardError(intentError?.message)
            setProcessing(false)
        } else {
            setCardError('')
            setTransactionId(paymentIntent.id)
            console.log(paymentIntent)

            //store payment on database
            const data = {
                transactionId: paymentIntent.id,
                ...bookingData,
            }
            console.log(data)
            saveBookings(data)
                .then(data => {
                    setProcessing(false)
                    console.log(data)
                    toast.success('Booking Successful!')
                    navigate('/dashboard/my-bookings')
                })
                .catch(err => console.log(err))
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit} className='my-10 max-w-lg'>
                <CardElement
                    className='border p-4 rounded-md shadow-md'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }}
                />
                <button
                    className=' mt-4 bg-gradient-to-r from-emerald-500 to-lime-500 rounded-md text-white px-4 py-1'
                    type='submit'
                    disabled={!stripe || !clientSecret || processing}
                >
                    Pay
                </button>
            </form>
            {cardError && <p className='text-red-500'>{cardError}</p>}
        </>
    )
}

export default CheckoutForm