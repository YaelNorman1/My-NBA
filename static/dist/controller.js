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
            console.log(data);
            render.renderPlayersToScreen(data);
        });
    });
});
$("body").on("click", ".addToDreamTeam", function () {
    let wantedPlayer = $(this).closest(".player-info");
    let playerFirstName = wantedPlayer.find(".fName").text();
    let playerLasttName = wantedPlayer.find(".lName").text();
    let playerJersyNum = wantedPlayer.find(".jerseyNum").text();
    let playerPosition = wantedPlayer.find(".position").text();
    let playerUrlPic = wantedPlayer.find(".player-pic").text();
    const newPlayerDreamTeam = new Player(playerFirstName, playerLasttName, playerJersyNum, playerPosition, true); //url_pic: playerUrlPic
    let addNewPlayer = addPlayerToDreamTeam(newPlayerDreamTeam);
    addNewPlayer.then((data) => {
        $(this).hide();
    });
    // apiHandler.addPlayerToDreamTeam(newPlayerDreamTeam);
});
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
