function addTaskFunc() {
  var title = document.getElementById("initialTitle").value;
  var status = document.getElementById("initialStatus").value;
  var date = document.getElementById("initialDate").value;
  let dateFormat = new Date(date).toISOString();

  fetch("http://34.71.224.0:8080/api/tasks", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      name: title,
      expiryDate: dateFormat,
      status: status,
    }),
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res, "This is response after submission");
      getTasks();
    });
}

function getTasks() {
  fetch("http://34.71.224.0:8080/api/tasks", {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
      let tableBody = document.getElementById("tableBody");
      tableBody.innerHTML = "";
      for (let i = 0; i < res.length; i++) {
        tableBody.innerHTML += `<tr id="task${i}"><td>${res[i].id}</td>
    <td>${res[i].name}</td> 
    <td>${res[i].expiryDate}</td>
    <td>${res[i].status}</td>
    <td><button data-target="#editbutton"
    data-toggle="modal"
    class="btn btn-secondary" onclick="editFunc(${res[i].id})">EDIT</button>
    <button data-target="#deletebutton"
    data-toggle="modal"
    class="btn btn-danger" onclick="captureDelId('${res[i].id}')">DELETE</button>
    <td>
    
    </tr>`;
      }
    });
}

getTasks();

var taskId = "";

function editFunc(id) {
  taskId = id;

  console.log(id);
}

function captureDelId(id) {
  taskDelId = id;
  console.log(id);
  fetch(`http://34.71.224.0:8080/api/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
  }).then((res) => {
    getTasks();
  });
}

function editTasksFunc() {
  var updateTitle = document.getElementById("updateTitle").value;
  var updateDate = document.getElementById("updateDate").value;
  var updateStatus = document.getElementById("updateStatus").value;
  let isoDate = new Date(updateDate).toISOString();
  console.log(updateTitle);
  console.log(updateDate);
  console.log(updateStatus);

  fetch("http://34.71.224.0:8080/api/tasks", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ1c2VyMSIsImF1dGgiOiJST0xFX1VTRVIiLCJleHAiOjE2MTc0MzMzOTl9._VY8Ao2E4a4C5_3aWpRh3HzPBJPlQ4SWdzAlMObp89r3rEx2jQXs-x_Lz7ozNDZuIdxI9zuExRUFYCQaYwfRUw",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify({
      id: taskId,
      name: updateTitle,
      expiryDate: isoDate,
      status: updateStatus,
    }),
  }).then((res) => {
    console.log(res);
    getTasks();
  });
}
