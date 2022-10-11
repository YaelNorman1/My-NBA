class APIHandler {

    async getDreamTeam() : Promise<Player[]> {
    
        const dreamTeam = await $.get(`./dream_team`);
        const playersJson:Player[] = JSON.parse(dreamTeam);     
        const players : Promise<Player[]> = this.savePlayerDreamTeam(playersJson);               
        return players;               
        
    }

    async savePlayerDreamTeam(players: Player[]) : Promise<Player[]> {
        const newPlayersArr : Player[]= []
        players.forEach((player: Player)=>{
            newPlayersArr.push(new Player(player.fname, player.lname, player.jerseyNum, player.position, true))
        });
        return newPlayersArr;

    }

    

    // async addPlayerToDreamTeam(player: object){
    //     const addPlayer = await $.ajax({
    //         type: "POST",
    //         url: "./dream_team",
    //         data: JSON.stringify(player),
    //         contentType: "application/json",
    //         dataType: "json",
    //     });
    // }
}