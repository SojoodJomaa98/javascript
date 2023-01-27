var coursename=document.getElementById("coursename");
var coursecat=document.getElementById("coursecat");
var courseprice=document.getElementById("courseprice");
var coursedesc=document.getElementById("coursedesc");
var addbutton=document.getElementById("click");
var clearbutton=document.getElementById("clear");
var deleteall=document.getElementById("delete");
var data=document.getElementById("data");
var alertname=document.getElementById("alertname");
var courses=[];
var currentindex;

if(localStorage.getItem("courseslist")==null)
{
    var courses=[];

}else{
    courses=JSON.parse(localStorage.getItem("courseslist"));
    DisplayData();
}
    addbutton.onclick=function(){
        if(addbutton.innerHTML=='Add course'){
            AddData();
        }else{
            Updatedata();
            addbutton.innerHTML="Add course";
        }
    DisplayData();
}
clearbutton.onclick=function(){
    ClearData();
}
function AddData(){
    var course={
        name:coursename.value,
        cat:coursecat.value,
        price:courseprice.value,
        desc:coursedesc.value
    };
    courses.push(course);
}
function DisplayData(){
    var result=" ";
    for(var i=0;i<courses.length;i++){
        result +=`<tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].cat}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td> <button class="btn btn-outline-info" onclick="Updatedata(${i})">updat</button>
            <button class="btn btn-outline-danger" onclick="Deletedata(${i})">delete</button>
            </td>
        </tr>`;
        data.innerHTML=result; 

        localStorage.setItem("courseslist",JSON.stringify(courses));
}
}
function ClearData(){
    coursename.value="";
    coursecat.value="";
    courseprice.value="";
    coursedesc.value="";

}
function Deletedata(index){
    courses.splice(index,1);
    localStorage.setItem("courseslist",JSON.stringify(courses));
    DisplayData();
}
deleteall.onclick=function(){
    localStorage.removeItem('courseslist');
    courses=[];
    data.innerHTML="";
}

function search(e){
    var result=" ";
    for(var i=0;i<courses.length;i++){
        if(courses[i].name.includes(e)){
            console.log(courses);
        result +=`<tr>
            <td>${i}</td>
            <td>${courses[i].name}</td>
            <td>${courses[i].cat}</td>
            <td>${courses[i].price}</td>
            <td>${courses[i].desc}</td>
            <td> <button class="btn btn-outline-info" onclick="getcoursedata(${i})">updat</button>
            <button class="btn btn-outline-danger" onclick="Deletedata(${i})">delete</button>
            </td>
        </tr>`;
        }
        data.innerHTML=result; 

        localStorage.setItem("courseslist",JSON.stringify(courses));

    }

}

function getcoursedata(index){

  var course=courses[index];
coursename.value=course.name;
coursecat.value=course.cat;
courseprice.value=course.price;
coursedesc.value=course.desc;
addbutton.innerHTML="update course";
currentindex=index;

}
function Updatedata(){

    var course={
        name:coursename.value,
        cat:coursecat.value,
        price:courseprice.value,
        desc:coursedesc.value
    };
    courses[currentindex].name=course.name;
    courses[currentindex].cat=course.cat;
    courses[currentindex].price=course.price;
    courses[currentindex].desc=course.desc;
    localStorage.setItem("courseslist",JSON.stringify(courses));
}




coursename.onkeyup=function(){
    var namepattern = /^[A-Z][a-z]{2,8}$/;
    if(namepattern.test(coursename.value)){
        addbutton.removeAttribute("disabled");
        coursename.classList.add('is-valid');
        coursename.classList.remove('is-invalid');
        alertname.classList.add('d-none');
        
    }else{
        addbutton.setAttribute("disabled","disabled");
        coursename.classList.replace('is-valid','is-invalid');
        alertname.classList.add('d-block');
        alertname.classList.remove('d-none');
    }
}