// save bookings
export const saveBookings = async (info) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/bookings`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
        body: JSON.stringify(info)
    })

    const data = await response.json();
    return data;
}



// get all bookings based on  user email
export const getUsersAllBookings = async (email) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/bookings?email=${email}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
    })
    const AllBookingsdata = await response.json();
    return AllBookingsdata;
}



// get all bookings for **ADMIN**
export const getAllBookingsAdmin = async () => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/bookings`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
    })
    const AllBookingsdata = await response.json();
    return AllBookingsdata;
}



// delete user booking

export const deleteBooking = async (id) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/bookings/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
    })

    const data = await response.json();
    return data;
}



// payment inbent

export const getPaymentIntent = async (price, homeID) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/create-payment-intent`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
        body: JSON.stringify({ price, homeID })
    })

    const data = await response.json();
    return data;
}



// get all bookings for admin

