function AddTeam(){
    let team = document.getElementById('teamAdder').value;
    let teamInMemory = window.localStorage.getItem(team);

    if(teamInMemory == null || teamInMemory == undefined){
        let fullTeam = [];
        window.localStorage.setItem(team,JSON.stringify(fullTeam));
    }
    else{
        alertify.success(teamInMemory + " Already exists");
    }
    document.getElementById('teamAdder').value = '';
    location.reload();
}

function AddMember(){
    let Choose = document.getElementById("teamChooser"); 
    let selectedOption = Choose.value;
    if(selectedOption != "Choose a Team"){
        let teamMember = document.getElementById('teamMemberAdder').value;
        if(teamMember != null && teamMember != ''){
            let teamDetailsInMemory = window.localStorage.getItem(selectedOption);
            let parsedData = JSON.parse(teamDetailsInMemory);
            if(parsedData.length >= 5){
                alertify.error('5 members already exist');
            }
            else{
                window.localStorage.removeItem(selectedOption);
                parsedData.push(teamMember);
                window.localStorage.setItem(selectedOption,JSON.stringify(parsedData));
                alertify.success("Added Successfully");      
            }
        }
        else{
            alertify.error("Please enter a name");
        }
    }
    else{
        alertify.error("Please choose an option");
    }
    document.getElementById('teamMemberAdder').value = '';  
}

function AddSub(){
    let Choose = document.getElementById("teamChooserForSub"); 
    let selectedOption = Choose.value;
    if(selectedOption != "Choose a Team"){
        let teamMember = document.getElementById('subAdder').value;
        if(teamMember != null && teamMember != ''){
            let subsDetailsInMemory = window.localStorage.getItem(selectedOption + '_subs');
            console.log(subsDetailsInMemory)
            console.log(selectedOption + '_subs')
            if(subsDetailsInMemory == null || subsDetailsInMemory == undefined){
                let fullTeam = [];
                fullTeam.push(teamMember);
                window.localStorage.setItem(selectedOption + '_subs', JSON.stringify(fullTeam));
                alertify.success("Sub Added Successfully");
            }
            else{
                window.localStorage.removeItem(selectedOption + '_subs');

                let parsedData = JSON.parse(subsDetailsInMemory);

                parsedData.push(teamMember);
                window.localStorage.setItem(selectedOption + '_subs', JSON.stringify(parsedData));
                alertify.success("Sub Added Successfully");
            }
        }
        else{
            alertify.error("Please enter a name");
        }
    }
    else{
        alertify.error("Please choose an option");
    }
    document.getElementById('subAdder').value = '';
    
}

function deleteMember(){
    let Choose = document.getElementById("teamChooserforDeleter"); 
    let selectedOption = Choose.value;
    if(selectedOption != "Choose a Team"){
        let teamMember = document.getElementById('teamMemberDeleter').value;
        if(teamMember != null && teamMember != ''){
            let teamDetailsInMemory = window.localStorage.getItem(selectedOption);
            window.localStorage.removeItem(selectedOption);

            let parsedData = JSON.parse(teamDetailsInMemory);

            let index = parsedData.indexOf(teamMember);

            if(index < 0 ){
                alertify.error("No member found");
            }
            else{
                parsedData.splice(index,1);
                window.localStorage.setItem(selectedOption,JSON.stringify(parsedData));
                alertify.success("Deleted Sucessfully");
            }
        }
        else{
            alertify.error("Please enter a name");
        }
    }
    else{
        alertify.error("Please choose an option");
    }
    document.getElementById('teamMemberDeleter').value = '';
    
}

function fillDropdown(){
    var teamChooser = document.getElementById("teamChooser");
    let Choose = document.getElementById("teamChooserforDeleter"); 
    var teamChooserList1 = document.getElementById("teamChooserList1");
    var teamChooserList2 = document.getElementById("teamChooserList2");
    var teamChooserForSub = document.getElementById("teamChooserForSub");
    var options = [];
    let optionsForDeleteDropdown = [];

    for (var key in localStorage){       
        if(key != "length" && key != "clear" && key != "getItem" && key != "key" 
            && key != "removeItem" && key != "setItem" && !key.includes('_subs')){
            options.push(key);
            console.log(!key.includes('_subs'))
            console.log(key)
        }
        if(key != "length" && key != "clear" && key != "getItem" && key != "key" 
            && key != "removeItem" && key != "setItem" ){
                optionsForDeleteDropdown.push(key);
        }
    }


    for(var i = 0; i < options.length; i++) {
        var opt = options[i];
        var el = document.createElement("option");
        var el1 = document.createElement("option");
        var el2 = document.createElement("option");
        var el4 = document.createElement("option");
        el.textContent = opt;
        el.value = opt;
        el1.textContent = opt;
        el1.value = opt;
        el2.textContent = opt;
        el2.value = opt;
        el4.textContent = opt;
        el4.value = opt;
        teamChooser.appendChild(el);
        teamChooserList1.appendChild(el1);
        teamChooserList2.appendChild(el2);
        teamChooserForSub.appendChild(el4);
    }

    for(var i = 0; i < optionsForDeleteDropdown.length; i++) {
        var optForDeleteDropdown = optionsForDeleteDropdown[i];
        var el = document.createElement("option");
        el.textContent = optForDeleteDropdown;
        el.value = optForDeleteDropdown;
        
        Choose.appendChild(el);
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

        let team1SubDetailsInMemory = window.localStorage.getItem(team1 + '_subs');

        removeAllChildNodes(list1);
        for(let i = 0; i < parsedDataOfTeam1.length; i++) {
            let element = document.createElement("p");
            element.textContent = parsedDataOfTeam1[i];
            list1.appendChild(element);
        }

        if(team1SubDetailsInMemory != null && team1SubDetailsInMemory != undefined){
            let parsedDataOfTeam1Sub = JSON.parse(team1SubDetailsInMemory);
            console.log(parsedDataOfTeam1Sub)
            let element = document.createElement("p");
            element.innerHTML = '</br>SUBS</br>------</br>';
            list1.appendChild(element);

            for(let i = 0; i < parsedDataOfTeam1Sub.length; i++) {
                let element = document.createElement("p");
                element.textContent = parsedDataOfTeam1Sub[i];
                list1.appendChild(element);
            }
        }

        let team2DetailsInMemory = window.localStorage.getItem(team2);
        let parsedDataOfTeam2 = JSON.parse(team2DetailsInMemory);
        let team2SubDetailsInMemory = window.localStorage.getItem(team2 + '_subs');


        removeAllChildNodes(list2);
        for(let i = 0; i < parsedDataOfTeam2.length; i++) {
            var element = document.createElement("p");
            element.textContent = parsedDataOfTeam2[i];
            list2.appendChild(element);
        }

        if(team2SubDetailsInMemory != null && team2SubDetailsInMemory != undefined){
            let parsedDataOfTeam2Sub = JSON.parse(team2SubDetailsInMemory);

            let element = document.createElement("p");
            element.innerHTML = '</br>SUBS</br>------</br>';
            list2.appendChild(element);

            for(let i = 0; i < parsedDataOfTeam2Sub.length; i++) {
                let element = document.createElement("p");
                element.textContent = parsedDataOfTeam2Sub[i];
                list2.appendChild(element);
            }
        }
           
    }
    else{
        alertify.error("Please choose valid option");
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

    let format = `💠 _ECL_ESPORTS_LEAGUE_ 💠</br>
    </br>
    ⚜️ {{Team1}} 🆚 {{Team2}} ⚜️</br>
    </br>
    </br>
    🔰 {{Player1(A)}} ⚔️ {{Player1(B)}}</br>
    🔰 {{Player2(A)}} ⚔️ {{Player2(B)}}</br>
    🔰 {{Player3(A)}} ⚔️ {{Player3(B)}}</br>
    🔰 {{Player4(A)}} ⚔️ {{Player4(B)}}</br>
    🔰 {{Player5(A)}} ⚔️ {{Player5(B)}}</br>
    </br>
    </br>
    ♻️ *Sub* ♻️</br>
    </br>
    ✴️ {{Team1}} ✴️</br>
    </br>
    {{team1sub}}
    ✳️ {{Team2}} ✳️</br>
    </br>
    {{team2sub}}
    ✴️Wins({{Team1}})✴️:-</br>
    </br>
    ✳️Wins({{Team2}})✳️:-</br>
    </br>
    Winning Team🌟:-</br>`;

    if(team1 != "Choose a Team" && team2 != "Choose a Team"){


        let team1DetailsInMemory = window.localStorage.getItem(team1);
        let parsedDataOfTeam1 = JSON.parse(team1DetailsInMemory);

        let team2DetailsInMemory = window.localStorage.getItem(team2);
        let parsedDataOfTeam2 = JSON.parse(team2DetailsInMemory);
        let shuffledArray = shuffle(parsedDataOfTeam2);
        if(parsedDataOfTeam1.length == parsedDataOfTeam2.length){
            removeAllChildNodes(fixtureDisplay);
            
            let element = document.createElement("div");
            let replacedText = format;

            for(let i = 0; i < parsedDataOfTeam1.length; i++) {
                let variable1 = '{{Player' + parseInt(i+1) + '(A)}}';
                let variable2 = '{{Player' + parseInt(i+1) + '(B)}}';

                replacedText = replacedText.replace(variable1, parsedDataOfTeam1[i]);
                replacedText = replacedText.replace(variable2, shuffledArray[i]);

            }
            replacedText = replaceAll(replacedText, '{{Team1}}', team1);
            replacedText = replaceAll(replacedText, '{{Team2}}', team2);

            let team1SubDetailsInMemory = window.localStorage.getItem(team1 + '_subs');

            if(team1SubDetailsInMemory != null && team1SubDetailsInMemory != undefined){
                let parsedDataOfTeam1Sub = JSON.parse(team1SubDetailsInMemory);
                let subFormat = '';
                for(let i = 0; i < parsedDataOfTeam1Sub.length; i++) {
                    subFormat = subFormat +  '🔰 '+ parsedDataOfTeam1Sub[i] +'</br>';
                }
                replacedText = replacedText.replace('{{team1sub}}', subFormat);
            }
            else{
                replacedText = replacedText.replace('{{team1sub}}', '');
            }
    
            let team2SubDetailsInMemory = window.localStorage.getItem(team2 + '_subs');

            if(team2SubDetailsInMemory != null && team2SubDetailsInMemory != undefined){
                let parsedDataOfTeam2Sub = JSON.parse(team2SubDetailsInMemory);
                let subFormat = '';
                for(let i = 0; i < parsedDataOfTeam2Sub.length; i++) {
                    subFormat = subFormat +  '🔰 '+ parsedDataOfTeam2Sub[i] +'</br>';
                }
                replacedText = replacedText.replace('{{team2sub}}', subFormat);
            }
            else{
                replacedText = replacedText.replace('{{team2sub}}', '');
            }
            
            element.innerHTML = replacedText;

            fixtureDisplay.appendChild(element);
        }
        else{
            alertify.error("Team member count not matching");
        }
    }
    else{
        alertify.error("Please choose valid option");
    }
}

function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
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


  