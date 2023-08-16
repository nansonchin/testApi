// alert("123");
(function () {
    const baseURL = "http://localhost:3000/students";
    axios.get(baseURL)
        .then(response => {
            const data = response.data;
            getName(data[0]);
            getInfo(data[0]);
            getOther(data);
            console.log('data', data);
        })

})();

function getName(data) {
    const name = document.querySelector('[data-target="getname"]')
    name.innerHTML = `${data.name}`
    console.log('name', name);
}
function getInfo(data) {
    const id = document.querySelector('[data-target="getId"]')
    const location = document.querySelector('[data-target="getLocation"]')
    const phone = document.querySelector('[data-target="getPhone"]')
    const course = document.querySelector('[data-target="getCourse"]')
    id.innerHTML = `<p> ID => ${data.id} </p>`
    location.innerHTML = `<p> Location => ${data.location} </p>`
    phone.innerHTML = `<p> PHone => ${data.phone} </p>`
    course.innerHTML = `<p> Courses => ${data.courses[0]} <br> ${data.courses[1]}</p>`

}

function getOther(data) {
    const others = document.querySelector('[data-target="getOther"]')
    for (var i = 0; i < data.length; i++) {
        if (data[i].id !== 1) {
            others.innerHTML += `${data[i].name} `

        }
    }
}

//fetch Data API Using Post
var form = document.getElementById('postform')
form.addEventListener('submit', function (e) {
    e.preventDefault()

    var name = document.getElementById('name').value
    var location = document.getElementById('location').value
    var phone = document.getElementById('phone').value
    var course1 = document.getElementById('course1').value
    var course2 = document.getElementById('course2').value

    fetch("http://localhost:3000/students", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            location: location,
            phone: phone,
            courses: [course1, course2]
        })
    }).then(response => response.json())
        .then(data => {
            console.log('Data Sended', data);

        }).catch(error => {
            console.log("Error Occur", error);
        })
})


// //get Data Api 
// var getform = document.getElementById('getform')
// getform.addEventListener('submit', function (e) {
//     e.preventDefault(); //to prevent it goes to the page http error code 
//     var getId = document.getElementById('gid').value;
//     const getUrl = "http://localhost:3000/students" + "/" + getId

//     axios.get(getUrl)
//         .then(response => {
//             const resData = response.data
//             const gname = document.querySelector('[data-target="get-target"]')
//             // const glocation=
//             // const gphone=
//             // const gcourse1=
//             // const gcouurse2=
//             gname.innerHTML = `
//         <form id="update" method="POST">
//         <label >Name</label>
//         <input type="text" name="gname" id="gname" value="${resData.name}"/><br>

//         <label >Location</label>
//         <input type="text" name="gname" id="glocation" value="${resData.location}"/><br>

//         <label>Phone</label>
//         <input type="text" name="gname" id="gphone" value="${resData.phone}"/><br>

//         <label>Course</label>
//         <input type="text" name="gname" id="gcourse1" value="${resData.courses[0]}"/><br>
//         <input type="text" name="gname" id="gcourse2" value="${resData.courses[1]}"/><br>
//         <button type="submit" id="update">Update</button><br>
//         <form>
//         `
//         })

// })

// //update form
// document.addEventListener('submit', function (e) {
//     if (e.target && e.target.id === 'update') {
//         e.preventDefault();
//         var updateid = document.getElementById('gid')
//         var updateName = document.getElementById('gname')
//         var updateLocation = document.getElementById('glocation')
//         var updatePhone = document.getElementById('gphone')
//         var updateCourse1 = document.getElementById('gcourse1')
//         var updateCourse2 = document.getElementById('gcourse2')

//         fetch("http://localhost:3000/students" + "/" + updateid, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 name: updateName,
//                 location: updateLocation,
//                 phone: updatePhone,
//                 courses: [updateCourse1, updateCourse2]
//             }).then(response => response.json())
//                 .then(data => {
//                     console.log("Data Updated", data);
//                 }).catch(error => {
//                     console.log("Error Updated Occuring", error);
//                 })
//         });
//     }
// })

// var updateForm=document.getElementById('update')
// console.log(updateForm);


document.addEventListener('DOMContentLoaded', function () {
    var getform = document.getElementById('getform');
    var updateButton = document.getElementById('update-button'); // Add this line
    getform.addEventListener('submit', function (e) {
        e.preventDefault();
        var getId = document.getElementById('gid').value;
        const getUrl = "http://localhost:3000/students/" + getId;

        axios.get(getUrl)
            .then(response => {
                const resData = response.data;
                const gname = document.querySelector('[data-target="get-target"]')
                gname.innerHTML = `
                <label >Name</label>
                <input type="text" name="gname" id="gname" value="${resData.name}"/><br>
                
                <label >Location</label>
                <input type="text" name="gname" id="glocation" value="${resData.location}"/><br>
        
                <label>Phone</label>
                <input type="text" name="gname" id="gphone" value="${resData.phone}"/><br>
        
                <label>Course</label>
                <input type="text" name="gname" id="gcourse1" value="${resData.courses[0]}"/><br>
                <input type="text" name="gname" id="gcourse2" value="${resData.courses[1]}"/><br>
                <button type="button" id="update-button">Update</button><br>
                `
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    });

    updateButton.addEventListener('click', function (e) {
        e.preventDefault();
        var updateid = document.getElementById('gid')
        var updateName = document.getElementById('gname')
        var updateLocation = document.getElementById('glocation')
        var updatePhone = document.getElementById('gphone')
        var updateCourse1 = document.getElementById('gcourse1')
        var updateCourse2 = document.getElementById('gcourse2')

        fetch("http://localhost:3000/students/" + updateid, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: updateName,
                location: updateLocation,
                phone: updatePhone,
                courses: [updateCourse1, updateCourse2]
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log("Data Updated", data);
            })
            .catch(error => {
                console.log("Error Updated Occurring", error);
            });
    });
});

////////////////////////////////////////

document.addEventListener('DOMContentLoaded', function () {
    var getform = document.getElementById('getform');

    getform.addEventListener('submit', function (e) {
        e.preventDefault();
        var getId = document.getElementById('gid').value;
        const getUrl = "http://localhost:3000/students/" + getId;

        axios.get(getUrl)
            .then(response => {
                const resData = response.data;
                const gname = document.querySelector('[data-target="get-target"]')
                gname.innerHTML = `
                <label >Name</label>
                <input type="text" name="gname" id="gname" value="${resData.name}"/><br>
                
                <label >Location</label>
                <input type="text" name="gname" id="glocation" value="${resData.location}"/><br>
        
                <label>Phone</label>
                <input type="text" name="gname" id="gphone" value="${resData.phone}"/><br>
        
                <label>Course</label>
                <input type="text" name="gname" id="gcourse1" value="${resData.courses[0]}"/><br>
                <input type="text" name="gname" id="gcourse2" value="${resData.courses[1]}"/><br>
                <button type="button" id="update-button">Update</button><br>
                `;

                // Add event listener to the update button here
                var updateButton = document.getElementById('update-button');
                updateButton.addEventListener('click', function (e) {
                    e.preventDefault();
                    var updateId = getId; // Use the same ID as the one fetched
                    var updateName = document.getElementById('gname').value;
                    var updateLocation = document.getElementById('glocation').value;
                    var updatePhone = document.getElementById('gphone').value;
                    var updateCourse1 = document.getElementById('gcourse1').value;
                    var updateCourse2 = document.getElementById('gcourse2').value;

                    fetch("http://localhost:3000/students/" + updateId, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            name: updateName,
                            location: updateLocation,
                            phone: updatePhone,
                            courses: [updateCourse1, updateCourse2]
                        })
                    })
                        .then(response => response.json())
                        .then(data => {
                            console.log("Data Updated", data);
                        })
                        .catch(error => {
                            console.log("Error Updated Occurring", error);
                        });
                });
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    });
});