//fonction to add items to the list:

/*function add()
{
    var item;
    var h3=document.createElement('h3');
    var textAnswer=document.createTextNode(item);
    h3.setAttribute('id','addItem');
    h3.appendChild(textAnswer);
    document.getElementById("toDo").appendChild(h3);
}*/

//La méthode querySelector() de l'interface Document retourne le premier Element dans le document correspondant au sélecteur

const inputBox=document.querySelector(".add-item input");    
const addBtn=document.querySelector(".add-item button");
const list=document.querySelector(".list");
const deleteAll=document.querySelector(".reset button");
const completed=document.querySelector(".content li span#complete");


//if uder put the cursur on the input field
//La méthode trim() permet de retirer les blancs en début et fin de chaîne
inputBox.onkeyup=()=>{
    let userData=inputBox.value;    //getting user value
    if(userData.trim()!=0){            //if user values are not only spaces
        addBtn.classList.add("active");     //active the add button
    }
    else{
        addBtn.classList.remove("active");    //unactive the add button
    }

}

showTasks();


//if user click on the add button
addBtn.onclick=()=>{
    let userData=inputBox.value;    //getting user value
    //La propriété localStorage vous permet d'accéder à un objet local Storage
    //les données stockées dans localStorage sont spécifiques au protocole de la page.
    let getLocalStorage=localStorage.getItem("ToDo");
    if(getLocalStorage==null){
        listArr=[];    //creating blank array
    }
    else{
        listArr=JSON.parse(getLocalStorage);  //tranforming JSON string into a js object
    }
    listArr.push(userData);   //adding user data to the listArr
    //JSON.stringify() convertit une valeur JavaScript en chaîne JSON
    
    localStorage.setItem("ToDo",JSON.stringify(listArr));   
    showTasks();
    
}

//add tasks list inside ul tag
function showTasks(){
    let getLocalStorage=localStorage.getItem("ToDo");  //getting local storage
    if(getLocalStorage==null){
        listArr=[];    //creating blank array
    }
    else{
        listArr=JSON.parse(getLocalStorage);  //tranforming JSON string into a js object
    }

    if(listArr.length>0){       //if the listArray is empty
        deleteAll.classList.add("active");
    }
    else{
        deleteAll.classList.remove("active");   //if the listArray is not empty
        addBtn.classList.remove("active");
    }
    let newTag='';
    listArr.forEach((element,index) => {
        newTag+=`<li><span id="complete" onclick="doneTask(${index})"><i class="fa fa-circle-thin co" job="complete" id="0"></i></span><strong>${element}</strong><span id="delet" onclick="deleteTask(${index})";><i class="fa fa-trash-o de"></i></span></li>`;
    });
    list.innerHTML=newTag;   //adding new li inside  ul tag
    inputBox.value="";     //when we add the item , the inputBox value should be empy again
    addBtn.classList.remove("active");

}

//delete task function
function deleteTask(index){
    let getLocalStorage=localStorage.getItem("ToDo"); 
    listArr=JSON.parse(getLocalStorage);
    listArr.splice(index, 1);   //delete or remove the particular index li
    //if remove the li we should update the local storage
    localStorage.setItem("ToDo",JSON.stringify(listArr));   
    showTasks();
}

function doneTask(index){
    let getLocalStorage=localStorage.getItem("ToDo"); 
    listArr=JSON.parse(getLocalStorage);
    ListArr.completed(index);
    //document.getElementById("complete").style.textDecoration = "line-through";
    localStorage.setItem("ToDo",JSON.stringify(listArr));   
    showTasks();
}

deleteAll.onclick=()=>{
    listArr=[];
    //if remove all the li items we should update the local storage
    localStorage.setItem("ToDo",JSON.stringify(listArr));   
    showTasks();
}

