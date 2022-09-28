 class Render {

    renderPlayersToScreen(players :object[]) {
        // console.log(players)
        $(".player-container").empty();
        const source = $('#player-template').html();
        const template = Handlebars.compile(source);
        for (const player of players){
            const newHTML = template({player});
            $('.player-container').append(newHTML);
        }
    
    }


} 






// get_data_from_input() : object{
//     const team_name = document.getElementById("teamName")
//     const year = document.getElementById("year")

//     return {
//         'team_name': team_name,
//         'year': year
//         }
// }