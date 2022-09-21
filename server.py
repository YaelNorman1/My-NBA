from multiprocessing.connection import wait
from fastapi import FastAPI
# from fastapi import Request
import requests
import uvicorn

app = FastAPI()

teams_id = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


@app.get("/players/{year}/{team_name}")
async def get_players_per_year_team(year, team_name):
    team_id = teams_id.get(team_name) 
    players =[]
    res =  requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    league_list = res.json()["league"]
    for league in league_list:
        players = [player for player in league_list[league] if player["teamId"] == team_id]
        # for player in league_list[league]:
        #     if player["teamId"] == team_id:
        #         players.append(player)
    return players
    


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8000,reload=True)