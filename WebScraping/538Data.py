import requests
from bs4 import BeautifulSoup

"""Gathers info from 538"""
page = requests.get("https://projects.fivethirtyeight.com/2023-nba-predictions/")
soup = BeautifulSoup(page.content, "html.parser")
standings = soup.find(id = "standings-table")
playoffs_odds = standings.find_all(class_="pct div make-playoffs")
NBAteams = standings.find_all(class_ = "team")

"""Creates a list of the odds a team makes the playoffs"""
playoff_list = []

for squad in playoffs_odds:
    playoff_list.append(squad.get_text())

"""Creates a list of the NBA teams"""
team_list = []

for team in NBAteams:
    team_list.append(team.get_text())
team_list.pop(0)

"""Creates a dictionary based on the two lists"""
data_table = dict(zip(team_list, playoff_list))

"""Allows the user to search for a team and the odds the team makes the playoffs will be returned"""
team_select = input("What team would you like info on(Capitals needed)?")

for team in data_table:
    if team.__contains__(team_select):
        print(team)
        print(data_table[team] + " percent chance of making playoffs")
