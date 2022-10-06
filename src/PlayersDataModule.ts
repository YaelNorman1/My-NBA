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

            for (const player of players){
                const fname = player.firstName 
                const lname = player.lastName
                const jerseyNum = player.jersey
                const position= player.pos
                if (player.dateOfBirthUTC){
                    const hasBirthDate= true
                } else {
                    const hasBirthDate= false
                }     
                //TODO: here i stoped. need to send hasBirthDate to Player constractor and filter hasBirthDate in controller
                this.playersTeam.push({fname: fname, lname: lname, jerseyNum: jerseyNum, position: position})
            }
        })
    }

    getAllPlayers() : object[] {
        const myClonedArray: object[] = [];
        this.playersTeam.forEach(val => myClonedArray.push(Object.assign({}, val)));     
        return myClonedArray
    }



}
