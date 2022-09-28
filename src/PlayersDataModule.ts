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

    async generateNewTeamPlayers(dataFromUser: object){       
        await this.getTeamPlayers(dataFromUser).then(data => {
            // console.log(data)
            let players= JSON.parse(data)
            // this.playersTeam= []

            for (const player of players){
                // console.log(player)
                const fname = player.firstName 
                const lname = player.lastName
                const jerseyNum = player.jersey
                const position= player.pos    
                // let p: Player= new Player (fullName,jerseyNum, position)      
                this.playersTeam.push({fname: fname, lname: lname, jerseyNum: jerseyNum, position: position})//p
            }
            // console.log(this.playersTeam)
        })
    }

    getAllPlayers() : object[] {

        const myClonedArray: object[] = [];
        this.playersTeam.forEach(val => myClonedArray.push(Object.assign({}, val)));     


        return myClonedArray
    }



}
