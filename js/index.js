const noteBox = document.querySelector('#notebox');
const locationBox = document.querySelector('header > p');
const locationCity = document.querySelectorAll('header > p >span')[0];
// const locationState = document.querySelectorAll('header > p >span')[1];
const notesContainer = document.querySelector('#notesContainer');
const clearBtn = document.querySelectorAll('.textAreaBtn > button')[0];
//clear

const addNoteBtn = document.querySelectorAll('.textAreaBtn >button')[1];
//add note

const clearAllBtn = document.querySelectorAll('.notesHeader > button')[0];
//clearallbtn
const deleteBtns = document.getElementsByClassName('deleteBtn');
console.log(deleteBtns);
// var notesArray = localStorage.getItem('notesKeeperString');

//clear noteBox
clearBtn.addEventListener('click', function () {
    if (noteBox.value) {
        noteBox.value = "";
    }
});

//clear All Notes
clearAllBtn.addEventListener('click', function () {
    if (notesContainer) {
        notesContainer.innerHTML = `<h2>No Notes added...</h2>`;
        localStorage.setItem('notesKeeperString', '');
    }
});

addNoteBtn.addEventListener('click', () => {
    if (noteBox.value) {
        if (localStorage.getItem('notesKeeperString')) {
            // Window.alert("Something is here");
            var allNotes = localStorage.getItem('notesKeeperString');
            notesArray = [];
            notesArray = JSON.parse(allNotes);
            notesArray.push(`${noteBox.value}`);
            if (notesArray.length) {
                notesContainer.innerHTML = "";
                notesArray.forEach((element, index) => {
                    let divElement = document.createElement('div');
                    divElement.innerHTML = `<h3>Note ${index + 1}</h3>
                                                <p>${element}</p>
                                                <button class="deleteBtn" id=${index}>Delete Note</button>`
                    divElement.className = "notes";
                    notesContainer.appendChild(divElement);
                    // window.alert("Inner Loop ran");

                });
            }
            allNotes = JSON.stringify(notesArray);
            localStorage.setItem('notesKeeperString', allNotes);

        }

        else {
            // window.alert("Nothing is here");
            notesArray = [];
            notesArray.push(`${noteBox.value}`);
            if (notesArray.length) {
                notesContainer.innerHTML = "";
                notesArray.forEach((element, index) => {
                    let divElement = document.createElement('div');
                    divElement.innerHTML = `<h3>Note ${index + 1}</h3>
                                                <p>${element}</p>
                                                <button class="deleteBtn" id=${index}>Delete Note</button>`
                    divElement.className = "notes";
                    notesContainer.appendChild(divElement);
                    // window.alert("Inner Loop ran");

                });
            }
            allNotes = JSON.stringify(notesArray);
            localStorage.setItem('notesKeeperString', allNotes);
        }
        // console.log(notesArray);
        noteBox.value = "";


        // let divElement = document.createElement('div');
        // divElement.innerHTML = `<h3>Note</h3>
        // <p>${noteBox.value}</p>
        // <button>Delete Note</button>`
        // divElement.className = "notes";
        // notesContainer.appendChild(divElement);

        // if(localStorage.getItem('notesKeeperString')){
        //     allNotes = localStorage.getItem('notesKeeperString');
        //     console.log(allNotes);

        // }
        // var notesArray = new Array;
        // notesArray = JSON.parse(allNotes);
        // notesArray.push(`${noteBox.value}`);
        // allNotes = JSON.stringify(notesArray);
        // localStorage.setItem('notesKeeperString',allNotes);
    }
    else {
        window.alert("Nothing to add");
    }
});

// //delete button for indivisual note
window.addEventListener('click', function (event) {
    if (typeof (event.target.id) === "number" || event.target.className === "deleteBtn") {
        // window.alert("Delete Btn clicked");
        if (localStorage.getItem('notesKeeperString') !== "") {

            allNotes = localStorage.getItem('notesKeeperString');
            notesArray = [];
            notesArray = JSON.parse(allNotes);
            notesArray.splice(event.target.id, 1);
            window.alert("deleting note " + event.target.id+1);
            notesContainer.innerHTML = ``;
            if (notesArray.length) {
                notesArray.forEach((element, index) => {
                    let divElement = document.createElement('div');
                    divElement.innerHTML = `<h3>Note ${index + 1}</h3>
                                            <p>${element}</p>
                                            <button class="deleteBtn" id=${index}>Delete Note</button>`
                    divElement.className = "notes";
                    notesContainer.appendChild(divElement);
                    // window.alert("Inner Loop ran");

                });
            }
            allNotes = JSON.stringify(notesArray);
            localStorage.setItem('notesKeeperString', allNotes);
            if (localStorage.getItem('notesKeeperString') === "") {
                notesContainer.innerHTML = `<h2>No Notes added...</h2>`;

            }

        }

    }

    //     console.log(event.target.id);
});

//fetching notes from local storage
window.addEventListener('load', function () {
    if (localStorage.getItem('notesKeeperString')) {
        var allNotes = localStorage.getItem('notesKeeperString');
        if (typeof (allNotes) === 'string') {
            notesArray = JSON.parse(allNotes);
            if (notesArray.length) {
                notesArray.forEach((element, index) => {
                    let divElement = document.createElement('div');
                    divElement.innerHTML = `<h3>Note ${index + 1}</h3>
                                            <p>${element}</p>
                                            <button class="deleteBtn" id=${index}>Delete Note</button>`
                    divElement.className = "notes";
                    notesContainer.appendChild(divElement);
                    // window.alert("Inner Loop ran");

                });
            }
        }
    }
    else {
        notesContainer.innerHTML = `<h2>No Notes added...</h2>`;
    }
});

//location adding code
window.addEventListener('load', () => {

    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((res) => {
            showPosition(res.coords.longitude, res.coords.latitude);
        }, positionError);
        // Geolocation available
    }
    else {
        window.alert("Geolocation for browser doesn't suppport");
    }
});

locationBox.addEventListener('click', () => {
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((res) => {
            showPosition(res.coords.longitude, res.coords.latitude);
        }, positionError);
    }
    else {
        window.alert("Geolocation for browser doesn't suppport");
    }
});

function showPosition(long, lat) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=36e300b1a8814eaa85e8fd24d413fb30`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.results);
            locationCity.innerText = `${data.results[0].components.city}, ${data.results[0].components['ISO_3166-1_alpha-2']}`;
        })
        .catch(err => console.log(err + "No dtata retrieved"));
};

function positionError() {
    console.log("none");
};