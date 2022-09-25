const playersDataModule = new PlayersDataModule(); 
// const render = new Render();

$("#submitPlayers").on("click", function (){
    const dataFromUser= get_data_from_input();
    playersDataModule.generateNewTeamPlayers(dataFromUser);

})


function get_data_from_input() : object{
    const team_name = (<HTMLInputElement>document.getElementById("teamName")).value;
    const year = (<HTMLInputElement>document.getElementById("year")).value;

    return {
        'team_name': team_name,
        'year': year
        }
}