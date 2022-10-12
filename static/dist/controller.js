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
const apiHandler = new APIHandler();
$("#submitPlayers").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        const dataFromUser = get_data_from_input();
        yield playersDataModule.generateNewTeamPlayers(dataFromUser);
        let players = checkBoxBirthDate();
        render.renderPlayersToScreen(players);
    });
});
$("#showDreamTeam").on("click", function () {
    return __awaiter(this, void 0, void 0, function* () {
        let dreamTeam = getDreamTeamFromServer();
        dreamTeam.then((data) => {
            render.renderDreamTeamToScreen(data);
        });
    });
});
$("body").on("click", ".addToDreamTeam", function () {
    let wantedPlayer = $(this).closest(".player-info");
    let playerFirstName = wantedPlayer.find(".fName").text();
    let playerLasttName = wantedPlayer.find(".lName").text();
    let playerJersyNum = wantedPlayer.find(".jerseyNum").text();
    let playerPosition = wantedPlayer.find(".position").text();
    const newPlayerDreamTeam = new Player(playerFirstName.trim(), playerLasttName.trim(), playerJersyNum, playerPosition, true);
    let addNewPlayer = addPlayerToDreamTeam(newPlayerDreamTeam);
    addNewPlayer.then((data) => {
    });
});
$("body").on("click", ".deleteFromDreamTeam", function () {
    let wantedPlayer = $(this).closest(".player-info");
    let playerFirstName = wantedPlayer.find(".fName").text();
    let playerLasttName = wantedPlayer.find(".lName").text();
    let removePlayer = removePlayerFromDreamTeam({ fname: playerFirstName, lname: playerLasttName });
});
function removePlayerFromDreamTeam(playerName) {
    return __awaiter(this, void 0, void 0, function* () {
        const removePlayer = yield apiHandler.removePlayerFromDreamTeam(playerName);
        return removePlayer;
    });
}
function addPlayerToDreamTeam(player) {
    return __awaiter(this, void 0, void 0, function* () {
        const newplayer = yield apiHandler.addPlayerToDreamTeam(player);
        return newplayer;
    });
}
function getDreamTeamFromServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const newTeam = yield apiHandler.getDreamTeam();
        return newTeam;
    });
}
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
