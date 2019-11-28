// console.log("here we go");

//we dont want ki page reload ho to sare notes gayab ho jaye to showNotes() call krlo
showNotes();


// if anybody adds something it should be stored in local storage Thanks

let addBtn = document.getElementById("addBtn");

//button click par ye sab hone wala hai
addBtn.addEventListener("click", function (e) {


    let addTxt = document.getElementById("addTxt");

    //local storage me check kro
    let notes = localStorage.getItem("notes");

    //a gar kuchh nahi hai to ek blank array
    if (notes == null) {

        notesObj = [];
    }
    else {
        // mahi to jo bhi mila hai, local storage mein, use parse kr do
        notesObj = JSON.parse(notes);
    }

    // uske baad jais ekoi kuchh bhi daal kar click krega to use (yani addtext ki value ko usme daal do kisme notes mein)

    notesObj.push(addTxt.value);


    //local storage update kr do

    localStorage.setItem("notes", JSON.stringify(notesObj));

    addTxt.value = "";

    console.log(notesObj);
    // console.log("shoNotes call hone wala hai");
    showNotes();
    // console.log("shoNotes call ho gya");


});



function showNotes() {

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    let html = "";
    notesObj.forEach(function (element, index) {

        html += `   
             <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
              
            <div class="card-body">
                <h5 class="card-title">Note ${index + 1} </h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNotes(this.id)" class="btn btn-primary">D E L E T E</button>
            </div>
        </div>     `;

    });



    let notesElm = document.getElementById('notes');
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `No Notes are saved by You, Please write something in textbox and  ADD YOUR NOTE`;

    }

}



//lets make a function to delete
function deleteNotes(index) {
    // console.log("let's delete it "+ index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    // ye delete kr deta hai us iindex ko jis index ko aap paas kr rhe ho 
    notesObj.splice(index, 1);

    //hum local storage ko fir se update kr rhe hain
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();


}


//let's implement search functionality
let search = document.getElementById('searchtxt');

//ab isi search pe hum ek event listener lagayenge dekho kaise

search.addEventListener("input", function () {


    // console.log("hi bro u are typing in input text area");
    let inputval = search.value.toLowerCase();
    // console.log("hi bro u are typing in input text area"+ inputval);

    //ab hum kya kr saktein hain ki , jo cards hain jisme cheejen display ho rhi hai usko hame filte krn ahai

    //humne class se sara data le liya
    let noteCards = document.getElementsByClassName('noteCard');
    // console.log(noteCards);


    // fir har ek card se ek ek element ko uthaya aur
    Array.from(noteCards).forEach(function (element) {

        // usnke paragraph se unka content uthha liya
        let cardTxt = element.getElementsByTagName("p")[0].innerText; //inner text string pe change krta hai
        // console.log(cardTxt);

        if (cardTxt.includes(inputval)) {

            element.style.display = "block";

        }
        else{
            element.style.display = "none";
        }

    })


})

