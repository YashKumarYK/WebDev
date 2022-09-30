function getAndUpdate() {
  console.log("Updating the list...");
  title = document.getElementById("task-to-do").value;
  desc = document.getElementById("description").value;
  dline = document.getElementById("deadline").value;
  if (title == "" || desc == "" || dline== "") {
    alert("Please write the task/description");
    return;
  }
  
  d = new Date();
  let date = d.toLocaleDateString();
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    itemJsonArray.push([title, desc, date, dline]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
    itemJsonArray.push([title, desc, date, dline]);
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  }
  update();
}

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  //populate the table
  let tableBody = document.getElementById("tablebody");
  let str = "";
  itemJsonArray.forEach((element, index) => {
    str += `
            <tr>
            <th scope="row">${index + 1}</th>
            <td>${element[0]}</td>
            <td>${element[1]}</td>
            <td>${element[2]}</td>
            <td>${element[3]}</td>
            <td><button class="btn btn-sm btn-primary" onclick="deleted(${index})">Delete</button></td>
            </tr>`;
  });
  tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
reset = document.getElementById("reset");
reset.addEventListener("click", clearStorage);
update();

function deleted(itemIndex) {
  console.log("Delete", itemIndex);
  itemJsonArrayStr = localStorage.getItem("itemsJson");
  itemJsonArray = JSON.parse(itemJsonArrayStr);

  //Delete itemIndex element from the array
  itemJsonArray.splice(itemIndex, 1);
  localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  update();
}

function clearStorage() {
  if (confirm("Do you really want to clear?")) {
    console.log("Clearing the storage");
    localStorage.clear();
    update();
  }
}
