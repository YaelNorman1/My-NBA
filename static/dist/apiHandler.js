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
class APIHandler {
    getDreamTeam() {
        return __awaiter(this, void 0, void 0, function* () {
            const dreamTeam = yield $.get(`./dream_team`);
            const playersJson = JSON.parse(dreamTeam);
            const players = this.savePlayerDreamTeam(playersJson);
            return players;
        });
    }
    savePlayerDreamTeam(players) {
        return __awaiter(this, void 0, void 0, function* () {
            const newPlayersArr = [];
            players.forEach((player) => {
                newPlayersArr.push(new Player(player.fname, player.lname, player.jerseyNum, player.position, true));
            });
            return newPlayersArr;
        });
    }
    addPlayerToDreamTeam(player) {
        return __awaiter(this, void 0, void 0, function* () {
            let sendPlayerData;
            // try{
            sendPlayerData = yield $.post({
                url: "./dream_team",
                type: "post",
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(player)
            });
            const playerJson = JSON.parse(sendPlayerData);
            const newPlayer = this.savePlayerDreamTeam([playerJson]);
            return newPlayer;
            // } catch (err){
            //     return {err:err}
            // }
        });
    }
}
