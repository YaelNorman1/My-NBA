class PlayersDataModule {
    playersTeam : Player [];


    constructor() {
        this.playersTeam= []
    }

    async getTeamPlayers(dataFromUser: object) {
        type ObjectKey = keyof typeof dataFromUser;
        const year = 'year' as ObjectKey
        const teamName = 'team_name' as ObjectKey
        const response= await $.get(`/players/${dataFromUser[year]}/${dataFromUser[teamName]}`);
        return response;
    }

    public async generateNewTeamPlayers(dataFromUser: object){       
        await this.getTeamPlayers(dataFromUser).then(data => {
            let players= JSON.parse(data)
            this.playersTeam.splice(0)
            this.assignDataToPlayer(players)
        })
    }

    assignDataToPlayer(players: any []){
        for (const player of players){
            const fname = player.firstName 
            const lname = player.lastName
            const jerseyNum = player.jersey
            const position= player.pos
            let hasBirthDate= false
            if (player.hasOwnProperty("dateOfBirthUTC")){
                hasBirthDate= true
            }  
            this.playersTeam.push({fname: fname, lname: lname, jerseyNum: jerseyNum, position: position, hasBirthDate: hasBirthDate})
        }
    }

    getAllPlayers() : any[] {
        const myClonedArray: object[] = [];
        this.playersTeam.forEach(val => myClonedArray.push(Object.assign({}, val)));     
        return myClonedArray
    }
}
