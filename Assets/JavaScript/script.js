




firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.

        document.getElementById("user_div").style.display = "block";
        document.getElementById("login_div").style.display = "none";
        document.getElementById("entry_div").style.display = "block";
        document.getElementById("search-entry").style.display = "none";
        //document.getElementById("row_div").style.display = "none";




        var user = firebase.auth().currentUser;

        if (user != null) {

            var email_id = user.email;

            document.getElementById("user_para").innerHTML = email_id;

        }

    } else {
        document.getElementById("user_div").style.display = "none";
        document.getElementById("login_div").style.display = "block";
        document.getElementById("entry_div").style.display = "none";
        document.getElementById("location-entry").style.display = "blocked";
        document.getElementById("search-entry").style.display = "none";
        document.getElementById("table").style.visibility = "hidden";
        //document.getElementById("row_div").style.display = "none";


    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}


function logout() {

    document.location.href = "index.html"
    firebase.auth().signOut();
}



function signup() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPass).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

        // ...
    });

}


//database section

var database = firebase.database();


// Capture Button Click
$("#add").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // YOUR TASK!!!
    // Code in the logic for storing and retrieving the most recent user.
    // Don't forget to provide initial data to your Firebase database.
    var tName = $("#name-input").val();
    var tTime = $("#time-input").val();
    var tLocation = $("#location-input").val();
    var tMessage = $("#text-input").val();


    // Initial Values

    var newT = {
        name: tName,
        time: tTime,
        location: tLocation,
        message: tMessage
    };



    database.ref().push(newT);

    // Logs everything to console
    console.log(newT.name);
    console.log(newT.time);
    console.log(newT.location);
    console.log(newT.text);

    alert("Train successfully added");

    // Clears all of the text-boxes
    $("#name-input").val("");
    $("#time-input").val("");
    $("#location-input").val("");
    $("#text-input").val("");
});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var tName = childSnapshot.val().name;
    var tTime = childSnapshot.val().time;
    var tLocation = childSnapshot.val().location;
    var tMessage = childSnapshot.val().message;

    console.log(tName);
    console.log(tTime);
    console.log(tLocation);
    console.log(tMessage);



    var newRow = $("<tr>").append(
        $("<td>").text(tName),
        $("<td>").text(tTime),
        $("<td>").text(tLocation),
        $("<td>").text(tMessage),

    );

    $("#train-table").append(newRow);
});


