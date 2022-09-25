"use strict";
const playersDataModule = new PlayersDataModule();
// const render = new Render();
$("#submitPlayers").on("click", function () {
    const dataFromUser = get_data_from_input();
    playersDataModule.generateNewTeamPlayers(dataFromUser);
});
function get_data_from_input() {
    const team_name = document.getElementById("teamName").value;
    const year = document.getElementById("year").value;
    return {
        'team_name': team_name,
        'year': year
    };
}
//# sourceMappingURL=controller.js.map