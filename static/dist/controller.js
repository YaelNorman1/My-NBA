"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const playersDataModule = new PlayersDataModule();
const render = new Render();
$("#submitPlayers").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFromUser = get_data_from_input();
        yield playersDataModule.generateNewTeamPlayers(dataFromUser);
        let players = checkBoxBirthDate();
        render.renderPlayersToScreen(players);
    });
});
$("body").on("click", ".addToDreamTeam", function () {
    let playerName = $(this).closest(".player-info").find(".fullName");
    let playerJersyNum = $(this).closest(".player-info").find(".jerseyNum");
    // console.log(player)
});
function get_data_from_input() {
    const team_name = document.getElementById("teamName").value;
    const year = document.getElementById("year").value;
    return {
        'team_name': team_name,
        'year': year
    };
}
function checkBoxBirthDate() {
    if ($("#flexSwitchCheck").is(':checked')) {
        return playersDataModule.getAllPlayers().filter(player => player["hasBirthDate"]);
    }
    else {
        return playersDataModule.getAllPlayers();
    }
}
//# sourceMappingURL=controller.js.map