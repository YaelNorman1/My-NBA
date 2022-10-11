const playersDataModule = new PlayersDataModule(); 
const render = new Render();

$("#submitPlayers").on("click", async function (){
    const dataFromUser= get_data_from_input();
    await playersDataModule.generateNewTeamPlayers(dataFromUser);
    
    let players= checkBoxBirthDate();
    render.renderPlayersToScreen(players)
})


$("body").on("click",".addToDreamTeam", function(){
    let playerName= $(this).closest(".player-info").find(".fullName")
    let playerJersyNum=  $(this).closest(".player-info").find(".jerseyNum")
    // console.log(player)

})


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