const playersDataModule = new PlayersDataModule(); 
const render = new Render();
const apiHandler = new APIHandler();

$("#submitPlayers").on("click", async function (){
    const dataFromUser= get_data_from_input();
    await playersDataModule.generateNewTeamPlayers(dataFromUser);
    let players= checkBoxBirthDate();
    render.renderPlayersToScreen(players)
})


$("#showDreamTeam").on("click",async function(){
    getAndRenderDreamTeam();
})


$("body").on("click",".addToDreamTeam", function(){
    let wantedPlayer= $(this).closest(".player-info")
    let playerFirstName= wantedPlayer.find(".fName").text()
    let playerLasttName= wantedPlayer.find(".lName").text()
    let playerJersyNum=  wantedPlayer.find(".jerseyNum").text()
    let playerPosition=  wantedPlayer.find(".position").text()
    const newPlayerDreamTeam = new Player(playerFirstName.trim(), playerLasttName.trim(), playerJersyNum, playerPosition, true);

    let addNewPlayer= addPlayerToDreamTeam(newPlayerDreamTeam);
    addNewPlayer.then((data)=> {})
})


$("body").on("click",".deleteFromDreamTeam", function(){
    let wantedPlayer= $(this).closest(".player-info")
    let playerFirstName= wantedPlayer.find(".fName").text()
    let playerLasttName= wantedPlayer.find(".lName").text()

    let removePlayer= apiHandler.removePlayerFromDreamTeam({fname: playerFirstName.trim(), lname: playerLasttName.trim()})
    removePlayer.then(() => {
        getAndRenderDreamTeam();
    })
})


async function addPlayerToDreamTeam(player: Player) : Promise<Player[]>{
    const newplayer= await apiHandler.addPlayerToDreamTeam(player);
    return newplayer;
}


async function getDreamTeamFromServer() : Promise<Player[]>{
    const newTeam= await apiHandler.getDreamTeam();
    return newTeam;
}


function getAndRenderDreamTeam(){
    let dreamTeam= getDreamTeamFromServer();
    dreamTeam.then((data) => {
        render.renderDreamTeamToScreen(data)
    })
}


function get_data_from_input() : object{
    const team_name = (<HTMLInputElement>document.getElementById("teamName")).value;
    const year = (<HTMLInputElement>document.getElementById("year")).value;
    
    return {
        'team_name': team_name,
        'year': year
    }
}


function checkBoxBirthDate() : object[]{
    if ($("#flexSwitchCheck").is(':checked')){
        return playersDataModule.getAllPlayers().filter(player => player["hasBirthDate"]);
    } else {
        return playersDataModule.getAllPlayers();
    }
}