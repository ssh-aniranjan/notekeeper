const noteBox = document.querySelector('#notebox');
const locationBox = document.querySelector('header > p');
const notesContainer = document.querySelector('#notesContainer')
const clearBtn = document.querySelectorAll('.textAreaBtn > button')[0];
//clear

const addNoteBtn = document.querySelectorAll('.textAreaBtn >button')[1];
//add note

const clearAllBtn = document.querySelectorAll('.notesHeader > button')[0];
//clearallbtn

addNoteBtn.addEventListener('click', () => {
    let div = document.createElement('div');
    div.setAttribute(className, 'notes');
    let h3 = document.createElement('h3');
    h3.innerText = "Note";
    div.appendChild(h3);
    let p = document.createElement('p');
    p.innerText = 'Helllpp ksgbakjdfbhd';
    div.appendChild(p);
    let button = document.createElement('button');
    button.innerText = 'Delete Note';
    div.appendChild(p);
    notesContainer.appendChild(div);
    var dataString = localStorage.getItem('noteKeeperString');
    if (dataString) {
        console.log(JSON.parse(dataString));
    }
    else {
        console.log(dataString);
    }
    window.alert("Added note");
})

clearAllBtn.addEventListener('click', () => {
    let deleteAllResponse = window.confirm("Do you want to delete All Notes");
    if (deleteAllResponse) {
        console.log("Deleted all the notes");
    }
})

window.addEventListener('load', () => {

    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((res) => {
            showPosition(res.coords.longitude,res.coords.latitude);
        }, positionError);
        // Geolocation available
    }
    else{
        window.alert("Geolocation for browser doesn't suppport");
    }
});
locationBox.addEventListener('click',()=>{
    if (window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition((res) => {
            showPosition(res.coords.longitude,res.coords.latitude);
        }, positionError);
    }
    else{
        window.alert("Geolocation for browser doesn't suppport");
    }
})

function showPosition(long,lat) {
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${long}&key=36e300b1a8814eaa85e8fd24d413fb30`)
        .then(response => response.json())
        .then(data => {
            locationBox.innerText = `${data.results[0].components.city},${data.results[0].components.state}`;
        })
        .catch(err => console.log(err+"No dtata retrieved"));
};

function positionError() {
    console.log("none");
}

// function noCords();

// console.log(clearBtn);
// console.log(clearAllBtn);
// console.log(addNoteBtn)