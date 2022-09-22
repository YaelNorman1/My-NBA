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
        this.playersTeam = {};
    }
    getTeamPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield $.get(`/players/{year}/{team_name}`);
            console.log(response);
            return response;
        });
    }
    generateNewTeamPlayers() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.getTeamPlayers().then(players => {
            });
        });
    }
}
//# sourceMappingURL=PlayersDataModule.js.map