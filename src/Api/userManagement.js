
// become a host
export const hostRequest = async hostData => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/user/${hostData.email}`;

    const res = await fetch(url, {
        method: "PUT",
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
        body: JSON.stringify(hostData),
    })
    const data = await res.json();

    return data
}



// get user Roles

export const getUserRole = async email => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/user/${email}`;

    const res = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
    })
    const data = await res.json();
    // console.log('user role', data?.role);
    return data?.role
}

// get all users
export const getAllUsers = async () => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/users`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
    })
    const usersData = await response.json();
    return usersData;
}




// make host 
export const makeHost = async user => {
    delete user._id
    const modifiedUser = {
        ...user,
        role: 'Host'
    }
    const response = await fetch(
        `${process.env.REACT_APP_HOST_API_URL}/user/${user?.email}`,
        {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
            },
            body: JSON.stringify(modifiedUser),
        }
    )
    const data = await response.json()

    return data
}