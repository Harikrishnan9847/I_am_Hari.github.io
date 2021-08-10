function AddTeam(){
    let team = document.getElementById('teamAdder').value;
    let teamInMemory = window.localStorage.getItem(team);

    if(teamInMemory == null || teamInMemory == undefined){
        let fullTeam = [];
        window.localStorage.setItem(team,JSON.stringify(fullTeam));
        console.log("Added")
    }
    else{
        alert(teamInMemory + " Already exists");
    }
    location.reload();
}

function AddMember(){
    let Choose = document.getElementById("teamChooser"); 
    let selectedOption = Choose.value;
    if(selectedOption != "Choose a Team"){
        let teamMember = document.getElementById('teamMemberAdder').value;
        
        let teamDetailsInMemory = window.localStorage.getItem(selectedOption);
        window.localStorage.removeItem(selectedOption);

        let parsedData = JSON.parse(teamDetailsInMemory);
        if(parsedData.length >= 5){
            alert("5 members already exist");
        }
        else{
            parsedData.push(teamMember);
            window.localStorage.setItem(selectedOption,JSON.stringify(parsedData));
            alert("Added Successfully")
        }
    }
    else{
        alert("Please choose an option");
    }
    
}

function deleteMember(){
    let Choose = document.getElementById("teamChooserforDeleter"); 
    let selectedOption = Choose.value;
    if(selectedOption != "Choose a Team"){
        let teamMember = document.getElementById('teamMemberDeleter').value;
        
        let teamDetailsInMemory = window.localStorage.getItem(selectedOption);
        window.localStorage.removeItem(selectedOption);

        let parsedData = JSON.parse(teamDetailsInMemory);

        let index = parsedData.indexOf(teamMember);

        if(index < 0 ){
            alert("No member found");
        }
        else{
            parsedData.splice(index,1);
            window.localStorage.setItem(selectedOption,JSON.stringify(parsedData));
            alert("Deleted Sucessfully")
        }
    }
    else{
        alert("Please choose an option");
    }
      
}

function fillDropdown(){
    var teamChooser = document.getElementById("teamChooser");
    let Choose = document.getElementById("teamChooserforDeleter"); 
    var teamChooserList1 = document.getElementById("teamChooserList1");
    var teamChooserList2 = document.getElementById("teamChooserList2");
    var options = []; 

    for (var key in localStorage){       
        if(key != "length" && key != "clear" && key != "getItem" && key != "key" && key != "removeItem" && key != "setItem"){
            options.push(key);
        }
    }


    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        var el1 = document.createElement("option");
        var el2 = document.createElement("option");
        var el3 = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el1.textContent = opt;
        el1.value = opt;
        el2.textContent = opt;
        el2.value = opt;
        el3.textContent = opt;
        el3.value = opt;
        teamChooser.appendChild(el);
        teamChooserList1.appendChild(el1);
        teamChooserList2.appendChild(el2);
        Choose.appendChild(el3);
    }
}

function displayTeamList(){   
    var teamChooserList1 = document.getElementById("teamChooserList1");
    var teamChooserList2 = document.getElementById("teamChooserList2");
    var list1 = document.getElementById("list1");
    var list2 = document.getElementById("list2");
    let team1 = teamChooserList1.value;
    let team2 = teamChooserList2.value;
    if(team1 != "Choose a Team" && team2 != "Choose a Team"){

        let team1DetailsInMemory = window.localStorage.getItem(team1);
        let parsedDataOfTeam1 = JSON.parse(team1DetailsInMemory);

        removeAllChildNodes(list1);
        for(let i = 0; i < parsedDataOfTeam1.length; i++) {
            var element = document.createElement("p");
            element.textContent = parsedDataOfTeam1[i];
            list1.appendChild(element);
        }

        let team2DetailsInMemory = window.localStorage.getItem(team2);
        let parsedDataOfTeam2 = JSON.parse(team2DetailsInMemory);

        removeAllChildNodes(list2);
        for(let i = 0; i < parsedDataOfTeam2.length; i++) {
            var element = document.createElement("p");
            element.textContent = parsedDataOfTeam2[i];
            list2.appendChild(element);
        }
    }
    else{
        alert("Please choose valid options");
    }
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function generateFixtures(){  
    var teamChooserList1 = document.getElementById("teamChooserList1");
    var teamChooserList2 = document.getElementById("teamChooserList2");
    var fixtureDisplay = document.getElementById("fixtureDisplay");
    let team1 = teamChooserList1.value;
    let team2 = teamChooserList2.value;

    if(team1 != "Choose a Team" && team2 != "Choose a Team"){


        let team1DetailsInMemory = window.localStorage.getItem(team1);
        let parsedDataOfTeam1 = JSON.parse(team1DetailsInMemory);

        let team2DetailsInMemory = window.localStorage.getItem(team2);
        let parsedDataOfTeam2 = JSON.parse(team2DetailsInMemory);
        let shuffledArray = shuffle(parsedDataOfTeam2);
        if(parsedDataOfTeam1.length == parsedDataOfTeam2.length){
            removeAllChildNodes(fixtureDisplay);
            
            for(let i = 0; i < parsedDataOfTeam1.length; i++) {
                let element = document.createElement("p");
                element.textContent = parsedDataOfTeam1[i] +  "  X  " + shuffledArray[i];
                fixtureDisplay.appendChild(element);
            }
        }
        else{
            alert("Team member count not matching");
        }
    }
    else{
        alert("Please choose valid options");
    }
}

function shuffle(array) {
    var currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }