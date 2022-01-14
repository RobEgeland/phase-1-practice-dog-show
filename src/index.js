let tableBody = document.querySelector('#table-body');

let form = document.querySelector('#dog-form');
let dogName = form.children[0];
let dogBreed = form.children[1];
let dogSex = form.children[2];

let table = document.querySelector('table.margin')

document.addEventListener('DOMContentLoaded', getDogs)


function getDogs() {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => data.forEach(data => renderDogs(data)))
}

function renderDogs(data) {
    let table = document.createElement('tr')
    table.id = data.id
    table.innerHTML = `
        <td>${data.name}</td>
        <td>${data.breed}</td>
        <td>${data.sex}</td>
        <td><button>Edit</button></td>
    `
    tableBody.appendChild(table)
}


table.addEventListener('click', editDog)

function editDog(e) {
    dogName.value = e.path[2].children[0].innerHTML
    dogName.id = e.path[2].id
    dogBreed.value = e.path[2].children[1].innerHTML
    dogSex.value = e.path[2].children[2].innerHTML

}

document.querySelector('#dog-form').addEventListener('submit', updateDog)

function updateDog(e) {
    let dogObj = {
        name: dogName.value,
        breed: dogBreed.value,
        sex: dogSex.value
    }

    fetch(`http://localhost:3000/dogs/${dogName.id}`, {
        method: 'PATCH',
        headers:{
           'Content-Type': 'application/json',  
        },
        body: JSON.stringify(dogObj)
    })
}