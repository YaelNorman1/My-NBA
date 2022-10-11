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


    async addPlayerToDreamTeam(player: Player) : Promise<Player []> {
        let sendPlayerData: string;
        // try{
            sendPlayerData= await $.post({
                url: "./dream_team",
                type: "post",
                async: false,
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(player)              
            });
            const playerJson = JSON.parse(sendPlayerData);
            const newPlayer= this.savePlayerDreamTeam([playerJson])
            return newPlayer;
        // } catch (err){
        //     return {err:err}
        // }
        
        
    }

}