from fastapi import Request
from fastapi import FastAPI
from starlette.responses import FileResponse 
from fastapi.staticfiles import StaticFiles
import requests
import uvicorn
import json
from dream_team import Dream_Team

app = FastAPI()
app.mount("/static", StaticFiles(directory="static"), name="static")
dream_team = Dream_Team()

teams_id = {
    "lakers": "1610612747",
    "warriors": "1610612744",
    "heat": "1610612748",
    "suns": "1610612756"
}


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
    return {'dream_team': dream_team.get_dream_team()}


@app.post("/dream_team")
async def add_player_to_dream_team(request: Request):
    new_player= await request.json()
    dream_team.add_player(new_player)
    return dream_team.get_dream_team()
    

@app.delete("/dream_team")
async def remove_player_from_dream_team(request: Request):
    player_to_remove= await request.json()
    dream_team.remove_player(player_to_remove["fname"], player_to_remove["lname"])
    return dream_team.get_dream_team()


if __name__ == "__main__":
    uvicorn.run("server:app", host="0.0.0.0", port=8080,reload=True)