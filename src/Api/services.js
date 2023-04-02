// add home
export const addHome = async (homeInfo) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/homes`;
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(homeInfo)
    })

    const homedata = await response.json();
    return homedata;
}




// get all home
export const getAllHome = async () => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/homes`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
    })
    const homedata = await response.json();
    return homedata;
}




// get all homes for host email
export const getHomesByHost = async (email) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/homes?email=${email}`;
    const response = await fetch(url)
    const homedata = await response.json();
    console.log('hosted houses', homedata)
    return homedata;
}




// delete a home by host
export const deleteHome = async (id) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/homes/${id}`;
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'content-type': "application/json",
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },

    })
    const data = await response.json();
    return data;
}



// update a home by host
export const updateHome = async (homeInfo) => {
    const url = `${process.env.REACT_APP_HOST_API_URL}/homes`;
    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${localStorage.getItem('aircnc-token')}`,
        },
        body: JSON.stringify(homeInfo)
    })

    const homedata = await response.json();
    return homedata;
}





// Search Result
export const getSearchResult = async (location, from, to, total_guest) => {
    console.log(location);
    const url = `${process.env.REACT_APP_HOST_API_URL}/search-result?location=${location}&from=${from}&to=${to}&total_guest=${total_guest}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}