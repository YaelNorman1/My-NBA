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
        await this.getTeamPlayers(dataFromUser).then(data => {
            console.log(data)
            let players= JSON.parse(data)

            for (const player of players){
                console.log(player)
                const fullName = player.firstName + player.lastName
                const jerseyNum = player.jersey
                const position= player.pos          
                // this.playersTeam.append(new Player())
            }

        })
    }



}
