var newTask = document.getElementById('new-task');
var addButton = document.getElementById('add');
var incomplete_list = document.getElementById('incomplete-tasks');
var completed_list = document.getElementById('completed-tasks');


function createListItem(text) {
  var li = document.createElement('li'); 
  //input (checkbox)
  var checkbox = document.createElement('input'); 
  checkbox.type = 'checkbox';
  //text label
  var label = document.createElement('label');
  label.innerText = text;
  //input (edit text)
  var editInput = document.createElement('input');
  editInput.type = 'text';
  //button.edit
  var editButton = document.createElement('button'); 
  editButton.innerText = 'Edit'; 
  editButton.className = '.edit'
  //button.delete
  var deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.className = '.delete';
  var liElements = [checkbox,label,editInput,editButton,deleteButton];
  //modify
  //append

  liElements.forEach(function(element) {
    li.appendChild(element);
  });
  return li;
}
function addItem() {
  console.log('item added to to-do list');
  if(newTask.value == ''){
    alert('Please enter some text');
  }
  else {
    var listItem = createListItem(newTask.value);
    incomplete_list.appendChild(listItem);
    bindTaskEvents(listItem, completed);
    newTask.value = '';
  }
}

function editItem() {
  console.log('item edited');
  var listItem = this.parentNode; 
  var label = listItem.querySelector('label');
  var editInput = listItem.querySelector('input[type = text]');
  if(listItem.classList.contains('editMode')) {
    var editButton = this.parentNode.children[3];
    editButton.innerText = 'Edit';
    label.innerText = editInput.value;
  }
  else {
    var editButton = this.parentNode.children[3];
    editButton.innerText = 'Save';
    editInput.value = label.innerText;
  }

  listItem.classList.toggle('editMode');
}

function deleteItem() {
  var answer = prompt('Are you sure you want to delete this item? Answer with Yes or No');
  if(answer.toLowerCase() == 'yes'){
    var listItem = this.parentNode; 
    var ul = listItem.parentNode; 
    ul.removeChild(listItem);
  }
}

function completed() {
  console.log('item added to completed list');
  var listItem = this.parentNode;
  completed_list.appendChild(listItem);
  bindTaskEvents(listItem, incomplete);
}

function incomplete() {
  console.log('item added to incomplete list');
  var listItem = this.parentNode; 
  incomplete_list.appendChild(listItem);
  bindTaskEvents(listItem, completed);
}

function bindTaskEvents(listItem, checkboxEventHandler) {
    var editButton = listItem.children[3];
    var deleteButton = listItem.children[4];
    var checkbox = listItem.children[0];
    editButton.onclick = editItem; 
    deleteButton.onclick = deleteItem; 
    checkbox.onchange = checkboxEventHandler; 
}

for(var i=0; i<incomplete_list.children.length; i++) {
  bindTaskEvents(incomplete_list.children[i], completed);
}

for(var i=0; i<completed_list.children.length; i++) {
  bindTaskEvents(completed_list.children[i], incomplete);
}

addButton.onclick = addItem;