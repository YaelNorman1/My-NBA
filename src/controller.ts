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
    let dreamTeam= getDreamTeamFromServer();
    dreamTeam.then((data) => {
        console.log(data)
        render.renderPlayersToScreen(data)
    })
})


$("body").on("click",".addToDreamTeam", function(){
    let wantedPlayer= $(this).closest(".player-info")
    let playerName= wantedPlayer.find(".fullName").text()
    let playerJersyNum=  wantedPlayer.find(".jerseyNum").text()
    let playerPosition=  wantedPlayer.find(".position").text()
    let playerUrlPic=  wantedPlayer.find(".player-pic").text()

    const newPlayerDreamTeam = {fullname: playerName,
                                jersey_number: playerJersyNum,
                                position: playerPosition,
                                url_pic: playerUrlPic };

    // apiHandler.addPlayerToDreamTeam(newPlayerDreamTeam);

})

async function getDreamTeamFromServer() : Promise<Player[]>{
    const newTeam= await apiHandler.getDreamTeam();
    return newTeam;
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