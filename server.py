# from multiprocessing.connection import wait
# from fastapi import Request
from urllib.request import Request
from fastapi import FastAPI
from starlette.responses import FileResponse 
from fastapi.staticfiles import StaticFiles
import requests
import uvicorn
import json
from dream_team import Dream_Team

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")

teams_id = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}

dream_team = Dream_Team



@app.get("/")
async def read_index():
    return FileResponse('static/index.html')


@app.get("/players/{year}/{team_name}")
async def get_players_per_year_team(year, team_name):
    team_id = teams_id.get(team_name) 
    players =[]
    res =  requests.get(f'http://data.nba.net/10s/prod/v1/{year}/players.json')
    league_list = res.json()["league"]
    for league in league_list:
        for player in league_list[league]:
            if player["teamId"] == team_id:
                players.append(player)
    return json.dumps(players)
    

@app.get("/dream_team")
def get_dream_team():



@app.post("/dream_team")
async def add_player_to_dream_team(request: Request):
    new_player= await request.json()
    dream_team.append(new_player)





if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8080,reload=True)