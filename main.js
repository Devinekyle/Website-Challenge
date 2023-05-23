
//Prevent DEFAULT!!!

//Call when DOM has loaded
const main = () => {
  //Declare Variables
  var taskList = document.body.querySelector('#TaskList');
  var submit = document.body.querySelector('#buttonSubmit');
  var deleteElement = document.body.querySelector('#buttonDelete');
  var clear = document.body.querySelector('#clearLocal')
  let storageArray = [];
  let hashArray = [];

  //Declare functions

  //I stole this function from the internet
  const hash = (str) => {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }
  const onLoad = (key) => {

    let newElement = document.createElement('li');
    let childElement = document.createElement('input');

    childElement.type='checkBox';
    childElement.setAttribute('class', 'deleteMe');
    childElement.setAttribute('name', key);

    newElement.innerHTML = JSON.parse(localStorage.getItem(key));
    newElement.appendChild(childElement);

    taskList.appendChild(newElement);
  }
  const ounceofPrevention = (event) => {
    event.preventDefault();
  }

  //Add to the tasklist
  const addTask = (event) => {
    let newElement = document.createElement('li');
    let childElement = document.createElement('input');
    let textBox = document.body.querySelector('#text');
    //Verify input
    if(textBox.value === ''){
      alert("You need a task!");
      return;
    }
    //push into our storage array!
    storageArray.push(textBox.value);

    let hashValue = hash(JSON.stringify(textBox.value));
    if(localStorage.getItem(hashValue) !== null) {
      alert("You already added this task!");
      return;
    }

    //Set Child Elements
    childElement.type='checkBox';
    childElement.setAttribute('class', 'deleteMe');
    childElement.setAttribute('name', hashValue);



    newElement.innerHTML = textBox.value;
    newElement.appendChild(childElement);


    taskList.appendChild(newElement);
    localStorage.setItem(hashValue, JSON.stringify(storageArray[storageArray.length - 1]));
    textBox.value = "";
  }

  const deleteTask = () => {
    let newParent = document.body.querySelector('#completedTasks');
    let elementList = document.body.querySelectorAll('.deleteMe');
    let deleteArray = [];
    for(const index in elementList) {
      if(elementList[index].checked)
      {
        deleteArray.push(elementList[index]);
      }
    }

    for(const index of deleteArray) {

      let newElement = document.createElement("li");
      newElement.innerHTML = JSON.parse(localStorage.getItem(index.name));

      localStorage.removeItem(index.name);
      newParent.appendChild(newElement);
      index.parentNode.remove();
    }
  }

  const clearLocal = () => {
    localStorage.clear();
    window.location.reload();
  }

  console.log("JS loaded");
  //Check if im dumb
  if(typeof taskList === 'null' || typeof submit === 'null') {
    alert("Failed to grab query");
  }

  if(localStorage.key(0) === 'null') {
    storageArray = [];
  }
  else{
    for(let i = 0; localStorage.key(i) !== null; i++) {
      hashArray.push(localStorage.getItem(localStorage.key(i)));
      onLoad(localStorage.key(i));
    }
  }

  console.log(storageArray);
  window.addEventListener('submit', ounceofPrevention);
  submit.addEventListener('click', addTask);
  deleteElement.addEventListener('click', deleteTask);
  clear.addEventListener('click', clearLocal);
}



window.addEventListener('DOMContentLoaded', main);
var navBarStatus = false;



const navBarToggle = () => {
  if(navBarStatus == false) {
    navBarStatus = true;
    document.getElementById("NavigationBar").style.width = "15%";
    document.getElementById("navBox").style.visibility = "visible";
  }
  else {
    navBarStatus = false;
    document.getElementById("NavigationBar").style.width = "20px";
    document.getElementById("navBox").style.visibility = "hidden";
  }
}



