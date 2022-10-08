const playersDataModule = new PlayersDataModule(); 
const render = new Render();

$("#submitPlayers").on("click", async function (){
    const dataFromUser= get_data_from_input();
    await playersDataModule.generateNewTeamPlayers(dataFromUser);
    render.renderPlayersToScreen(playersDataModule.getAllPlayers())
})


function get_data_from_input() : object{
    const team_name = (<HTMLInputElement>document.getElementById("teamName")).value;
    const year = (<HTMLInputElement>document.getElementById("year")).value;

    return {
        'team_name': team_name,
        'year': year
        }
}


$("#flexSwitchCheck").on("click", function() {

    //TODO: how to notify render that checkbox of birthday is on
    const playersWithBirthDate= playersDataModule.getAllPlayers().filter(player => player)
})