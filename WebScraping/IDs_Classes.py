import requests
from bs4 import BeautifulSoup
import pandas as pd

page = requests.get("https://dataquestio.github.io/web-scraping-pages/ids_and_classes.html")
soup = BeautifulSoup(page.content, 'html.parser')
# print(soup)

"""find all the p tags(there are a lot)"""
# print(soup.find_all('p'))

"""selects only the p tags that have the class outer-text"""
# print(soup.find_all('p', class_='outer-text'))

"""Searches by ID"""
print(soup.find_all(id="first"))