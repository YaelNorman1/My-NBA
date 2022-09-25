class PlayersDataModule {
    playersTeam : Player [];


    constructor() {
        this.playersTeam= {} as Player []
    }

    async getTeamPlayers(dataFromUser: object) {
        type ObjectKey = keyof typeof dataFromUser;
        const year = 'year' as ObjectKey
        const teamName = 'team_name' as ObjectKey
        const response= await $.get(`/players/${dataFromUser[year]}/${dataFromUser[teamName]}`);
        return response;
    }

    async generateNewTeamPlayers(dataFromUser: object){       
        await this.getTeamPlayers(dataFromUser).then(players => {
            console.log(players)
        })
    }



}
