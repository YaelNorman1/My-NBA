class APIHandler {

    async getDreamTeam() : Promise<Player[]> {
        const dreamTeam = await $.get(`./dream_team`);
        const playersJson:Player[] = dreamTeam.dream_team;     
        const players : Promise<Player[]> = this.savePlayerDreamTeam(playersJson);               
        return players;               
        
    }


    async savePlayerDreamTeam(players: Player[] | any) : Promise<Player[]> {
        const newPlayersArr : Player[]= []
        players.forEach((player: Player)=>{
            newPlayersArr.push(new Player(player.fname, player.lname, player.jerseyNum, player.position, true))
        });
        return newPlayersArr;

    }


    async addPlayerToDreamTeam(player: Player) : Promise<Player[]> {
        let sendPlayerData: string;
        sendPlayerData= await $.post({
            url: "./dream_team",
            type: "post",
            async: false,
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(player)              
        });
        const newPlayer= this.savePlayerDreamTeam(sendPlayerData)
        return newPlayer;
    }


    async removePlayerFromDreamTeam(playerName : object) {
        await $.ajax({
            url: "./dream_team",
            type: "DELETE",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(playerName)              
        })
    }

}