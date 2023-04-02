export const getImageUrl = async image => {

    const formData = new FormData();
    formData.append('image', image)
    const url = `https://api.imgbb.com/1/upload?&key=9aeca36bfde2e63fb2b08d6a9db4cd8d`;

    const res = await fetch(url, {
        method: "POST",
        body: formData
    })
    const data = await res.json();
    console.log(data)
    return data.data.display_url;

}


// export const getImageUrl = image => {

//     const formData = new FormData();
//     formData.append('image', image)
//     const url = `https://api.imgbb.com/1/upload?&key=9aeca36bfde2e63fb2b08d6a9db4cd8d`;

//     fetch(url, {
//         method: "POST",
//         body: formData
//     })
//         .then(res => res.json())
//         .then(data => {
//             console.log(data.data.display_url);
//             return data.data.display_url;
//         })

// }