const noteBox = document.querySelector('#notebox');
const locationBox = document.querySelector('header > p');
const locationCity = document.querySelectorAll('header > p >span')[0];
const notesContainer = document.querySelector('#notesContainer');
const clearBtn = document.querySelectorAll('.textAreaBtn > button')[0];
//clear

const addNoteBtn = document.querySelectorAll('.textAreaBtn >button')[1];
//add note

const clearAllBtn = document.querySelectorAll('.notesHeader > button')[0];
//clearallbtn
const deleteBtns = document.getElementsByClassName('deleteBtn');
console.log(deleteBtns);

//functions
function noNotesAdded() {
    notesContainer.innerHTML = `<h2>No Notes added...</h2>`;
}

function writeNotes(arrayValue) {
    notesContainer.innerHTML = ``;
    arrayValue.forEach((element, index) => {
        let divElement = document.createElement('div');
        divElement.innerHTML = `<h3>Note ${index + 1}</h3>
                                <p>${element}</p>
                                <button class="deleteBtn" id=${index}>Delete Note</button>`
        divElement.className = "notes";
        notesContainer.appendChild(divElement);
    });
}

function getNotes() {
    return localStorage.getItem('notesKeeperString');
}

function setNotes(notesArray) {
    allNotes = JSON.stringify(notesArray);
    localStorage.setItem('notesKeeperString', allNotes);
}

//clear noteBox
clearBtn.addEventListener('click', function () {
    if (noteBox.value) {
        noteBox.value = "";
    }
});

//clear All Notes
clearAllBtn.addEventListener('click', function () {
    if (notesContainer) {
        noNotesAdded();
        localStorage.setItem('notesKeeperString', '');
    }
});

addNoteBtn.addEventListener('click', () => {
    if (noteBox.value) {
        if (getNotes()) {
            var allNotes = getNotes();
            notesArray = [];
            notesArray = JSON.parse(allNotes);
            notesArray.push(`${noteBox.value}`);
            if (notesArray.length) {
                writeNotes(notesArray);
            }
            setNotes(notesArray);
        }

        else {
            notesArray = [];
            notesArray.push(`${noteBox.value}`);
            if (notesArray.length) {
                notesContainer.innerHTML = "";
                writeNotes(notesArray);
            }
            setNotes(notesArray);
        }
        noteBox.value = "";
    }
    else {
        window.alert("Nothing to add");
    }
});

// //delete button for indivisual note
window.addEventListener('click', function (event) {
    if (typeof (event.target.id) === "number" || event.target.className === "deleteBtn") {
        if (getNotes() !== "") {

            allNotes = getNotes();
            notesArray = [];
            notesArray = JSON.parse(allNotes);
            notesArray.splice(event.target.id, 1);
            if (notesArray.length) {
                writeNotes(notesArray);
            }
            else {
                noNotesAdded();
            }
            setNotes(notesArray);
            if (getNotes() === "") {
                noNotesAdded();
            }

        }

    }

});

//fetching notes from local storage
window.addEventListener('load', function () {
    if (getNotes()) {
        var allNotes = getNotes();
        if (typeof (allNotes) === 'string') {
            notesArray = [];
            notesArray = JSON.parse(allNotes);
            if (notesArray.length) {
                writeNotes(notesArray);
            }
            else {
                noNotesAdded();
            }

        }
    }
    else {
        noNotesAdded();
    }

});

//location adding code
window.addEventListener('load', () => {

    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((res) => {
            showPosition(res.coords.longitude, res.coords.latitude);
        }, positionError);
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
            locationCity.innerText = `${data.results[0].components.city}, ${data.results[0].components['ISO_3166-1_alpha-2']}`;
        })
        .catch(err => console.log(err + "No dtata retrieved"));
};

function positionError() {
    console.log("none");
};