async function generate() {
    let url = 'https://randomuser.me/api/?results=10'
    const response = await fetch(url);
    var data = await response.json();

    let userInfo = []

    for (let userNumber = 0; userNumber < data['results'].length; userNumber++) {
        let currentUser = data['results'][userNumber]
        let name = currentUser['name']['title'] + ' ' + currentUser['name']['first'] + ' ' + currentUser['name']['last']
        let email = currentUser['email']
        let homeNo = currentUser['phone']
        let mobileNo = currentUser['cell'] // Some numbers contain letters, but I'm not here to judge
        let mediumPhoto = currentUser['picture']['medium']
        let largePhoto = currentUser['picture']['large']
        let dateRegistered = new Date(currentUser['registered']['date'])
        dateRegistered = dateRegistered.toDateString()
        let yearsRegistered = currentUser['registered']['age']

        userInfo.push({"name": name, "email": email, "numbers": {"home": homeNo, "mobile": mobileNo}, "photo": {"medium": mediumPhoto, "large": largePhoto}, "registrationInfo": {"dateRegistered": dateRegistered, "yearsRegistered": yearsRegistered}})
    }
    // console.log(userInfo)
    writeTable(userInfo)
}

function hideDisplayTable() {
    if (((document.getElementById("registrationInformationContainer")).style.display != "none") && (document.getElementById("registrationInformation").rows.length > 0)) {
        ((document.getElementById("registrationInformation"))).deleteRow(0);
        ((document.getElementById("registrationInformationContainer"))).style.display = "none";
    }
}

function showDisplayTable() {
    ((document.getElementById("registrationInformationContainer"))).style.display = "block";
}

function toggleRegsitrationInfo(info, button) {
    if (document.getElementById(button).innerHTML == "Show") {        
        // Hide existing registration information
        hideDisplayTable();
        // Make sure the button corresponding to the information reads "Show" rather than "Hide"
        let buttons = document.getElementsByTagName("button");
        for (let idx = 0; idx < buttons.length; idx++) {
            if (buttons[idx].innerHTML == "Hide") {
                buttons[idx].innerHTML = "Show";
            }
        }
        
        document.getElementById(button).innerHTML = "Hide";

        let displayedName = (document.getElementById("displayedName"));
        displayedName.innerHTML = info["name"];

        let registrationInfoTable = document.getElementById("registrationInformation");
        let registrationInfoRow = registrationInfoTable.insertRow();
        (registrationInfoRow.insertCell()).innerHTML = '<img src="' + info["photo"]["large"] + '"></img>';
        (registrationInfoRow.insertCell()).innerHTML = "Joined " + info["registrationInfo"]["dateRegistered"] + " (" + info["registrationInfo"]["yearsRegistered"] + " years ago)";
        showDisplayTable();
        window.scrollTo(0, 0);
    }
    else if (document.getElementById(button).innerHTML = "Hide") {
        hideDisplayTable();
        document.getElementById(button).innerHTML = "Show";
    }
}

function writeTable(userInfo) {
    let table = document.getElementById("generatedUsers");
    let headers = table.insertRow();
    // Uses the JSON structure of the first object to write the table titles
    for (key in userInfo[0]) {
        let headerCell = (document.createElement("th"))
        if ((key != "registrationInfo")) {
            headerCell.innerHTML = (key.charAt(0).toUpperCase() + key.substr(1));
        }
        else {
            headerCell.innerHTML = ('Registration Information');
        }
        headers.appendChild(headerCell);
    }
    for (let i = 0; i < userInfo.length; i++) {
        let displayedUserInfo = table.insertRow();
        for (key in userInfo[i]) {
            if (key == "numbers") {
                (displayedUserInfo.insertCell()).innerHTML = ('Landline: ' + userInfo[i][key]['home'] + '<br>' + 'Mobile: ' + userInfo[i][key]['mobile']);
            }
            else if (key == "photo") {
                (displayedUserInfo.insertCell()).innerHTML = ('<img src="' + userInfo[i][key]['medium'] + '"></img>');
            }
            else if ((key != "registrationInfo")) {
                (displayedUserInfo.insertCell()).innerHTML = (userInfo[i][key]);
            }
            else {
                (displayedUserInfo.insertCell()).innerHTML = ('<button type="button" id="' + i + '">Show</button>');
                let jsonObjectToPass = userInfo[i];
                (document.getElementById(i)).addEventListener("click", function(){toggleRegsitrationInfo(jsonObjectToPass, i);});
            }
        }
    }
}