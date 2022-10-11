 class Render {

    renderPlayersToScreen(players :object[]) {
        $('.player-container').empty();
        const source = $('#player-template').html();
        const template = Handlebars.compile(source);
        for (const player of players){
            const newHTML = template({player});
            $('.player-container').append(newHTML);
        }
    }


} 






