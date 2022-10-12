from player import Player 


class Dream_Team:

    def __init__(self):
        self.dream_team_array = []


    def get_dream_team(self):
        return self.dream_team_array
    
    
    def add_player(self, player):
        self.dream_team_array.append(Player(player['fname'], player['lname'], player['jerseyNum'], player['position'], player['hasBirthDate']))


    def remove_player(self, fname, lname):
        self.dream_team_array= list(filter(lambda player: player.fname != fname or player.lname != lname, self.dream_team_array))