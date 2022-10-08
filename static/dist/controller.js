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
        render.renderPlayersToScreen(playersDataModule.getAllPlayers());
    });
});
function get_data_from_input() {
    const team_name = document.getElementById("teamName").value;
    const year = document.getElementById("year").value;
    return {
        'team_name': team_name,
        'year': year
    };
}
$("#flexSwitchCheck").on("click", function () {
    //TODO: how to notify render that checkbox of birthday is on
    const playersWithBirthDate = playersDataModule.getAllPlayers().filter(player => player);
});
//# sourceMappingURL=controller.js.map