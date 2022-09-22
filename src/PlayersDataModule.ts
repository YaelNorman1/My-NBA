class PlayersDataModule {
    playersTeam : Player [];


    constructor() {
        this.playersTeam= {} as Player []
    }

    async getTeamPlayers() {
        const response= await $.get(`/players/{year}/{team_name}`);
        console.log(response);
        return response;
    }
    
    async generateNewTeamPlayers(){       
        await this.getTeamPlayers().then(players => {
            
        })
    }



}
