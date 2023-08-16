// alert("123");
(function(){
    const baseURL="http://localhost:3000/students";
    axios.get(baseURL)
    .then(response=>{
        const data=response.data;
        getName(data[0]);
        getInfo(data[0]);
        getOther(data);
        console.log('data',data);
    })

})();

function getName(data){
    const name=document.querySelector('[data-target="getname"]')
    name.innerHTML=`${data.name}`
    console.log('name',name);
}
function getInfo(data){
    const id=document.querySelector('[data-target="getId"]')
    const location=document.querySelector('[data-target="getLocation"]')
    const phone=document.querySelector('[data-target="getPhone"]')
    const course=document.querySelector('[data-target="getCourse"]')
    id.innerHTML=`<p> ID => ${data.id} </p>`
    location.innerHTML=`<p> Location => ${data.location} </p>`
    phone.innerHTML=`<p> PHone => ${data.phone} </p>`
    course.innerHTML=`<p> Courses => ${data.courses[0]} <br> ${data.courses[1]}</p>`

}

function getOther(data){
    const others=document.querySelector('[data-target="getOther"]')
    for(var i =0; i<data.length;i++){
        if(data[i].id!==1){
            others.innerHTML +=`${data[i].name} `

        }
    }
}

//fetch Data API Using Post
var form=document.getElementById('form')
form.addEventListener('submit',function(e){
    e.preventDefault()

    var name=document.getElementById('name').value
    var location=document.getElementById('location').value
    var phone=document.getElementById('phone').value
    var course1=document.getElementById('course1').value
    var course2=document.getElementById('course2').value

    fetch("http://localhost:3000/students",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            name:name,
            location:location,
            phone:phone,
            courses:[course1,course2]
        })
    }).then(response=>response.json())
    .then (data=>{
        console.log('Data Sended',data);

    }).catch(error =>{
        console.log("Error Occur",error);
    })
})
