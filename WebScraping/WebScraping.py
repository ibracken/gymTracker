"""The modules that need importing"""
import requests
from bs4 import BeautifulSoup
import pandas as pd

"""Downloads the website through the requests module"""
page = requests.get("https://dataquestio.github.io/web-scraping-pages/simple.html")


"""Some basic commands"""
print(page)

"""Gives status code which will indicate whether it was downloaded sucessfully"""
print(page.status_code)

"""Shows the HTML content"""
print(page.content)

"""Parses(Analyzes) the data"""
soup = BeautifulSoup(page.content, "html.parser")

"""Formats the HTML content how it would appear on a website"""
print(soup.prettify())

print("")

"""Prints the elements at the top of the page using the children property"""
print(list(soup.children))

"""Shows the type of each element in the list: """
"""The first is a Doctype, the second is a NavigableString and the last is a Tag object(Tag is most important)"""
print([type(item) for item in list(soup.children)])
print("")


"""Selects the html tag and uses the children function"""
html = list(soup.children)[2]
print(list(html.children))

print("")

"""Selects the 4th line from html which contains the p tag"""
body = list(html.children)[3]
print(list(body.children))

"""Isolates the p tag:"""
p = list(body.children)[1]
print(p.get_text())

"""A much quicker way of getting the text"""
"""isolates the p tag but remains in list form"""
print(soup.find_all('p'))

"""Prints out in text"""
print(soup.find_all('p')[0].get_text())