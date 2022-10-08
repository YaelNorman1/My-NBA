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
class PlayersDataModule {
    constructor() {
        this.playersTeam = [];
    }
    getTeamPlayers(dataFromUser) {
        return __awaiter(this, void 0, void 0, function* () {
            const year = 'year';
            const teamName = 'team_name';
            const response = yield $.get(`/players/${dataFromUser[year]}/${dataFromUser[teamName]}`);
            return response;
        });
    }
    generateNewTeamPlayers(dataFromUser) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getTeamPlayers(dataFromUser).then(data => {
                let players = JSON.parse(data);
                this.playersTeam.splice(0);
                this.assignDataToPlayer(players);
            });
        });
    }
    assignDataToPlayer(players) {
        for (const player of players) {
            const fname = player.firstName;
            const lname = player.lastName;
            const jerseyNum = player.jersey;
            const position = player.pos;
            let hasBirthDate = false;
            if (player.hasOwnProperty("dateOfBirthUTC")) {
                hasBirthDate = true;
            }
            this.playersTeam.push({ fname: fname, lname: lname, jerseyNum: jerseyNum, position: position, hasBirthDate: hasBirthDate });
        }
    }
    getAllPlayers() {
        const myClonedArray = [];
        this.playersTeam.forEach(val => myClonedArray.push(Object.assign({}, val)));
        return myClonedArray;
    }
}
//# sourceMappingURL=PlayersDataModule.js.map