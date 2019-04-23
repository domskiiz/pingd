import icalendar
import json
from selenium import webdriver
import re
import numpy as np
import os

options = webdriver.ChromeOptions()

# Save to a specific place that can be retrieved in here
options.add_argument("--start-maximized")
prefs = {"download.default_directory": os.getcwd(),
         "directory_upgrade": True}
options.add_experimental_option("prefs", prefs)

driver = webdriver.Chrome(chrome_options=options)

browser = webdriver.Chrome()

browser.get('https://facebook.com')

elem = browser.find_element_by_id('email')
elem.send_keys('adam1brownell@yahoo.com')

elem = browser.find_element_by_id('pass')
elem.send_keys('slakdodo123')

elem = browser.find_element_by_id('loginbutton')
elem.click()

browser.get('https://facebook.com/events/')

elem = browser.find_element_by_xpath("//a[contains(@href, '/events/ical/birthdays/')]")
ical = elem.get_property("href")
browser.get(ical)  # This downloads the calendar

uid = re.findall(r'uid=([0-9]+)&', ical)[0]
print(uid)

uid = '100000169094215'
g = open('/Users/adambrownell/Downloads/u{}.ics'.format(uid), 'rb')
gcal = icalendar.Calendar.from_ical(g.read())

birthdays = dict()
for i in range(1, len(gcal.walk())):
    t = gcal.walk()[i]
    birthdays[i] = {"date": str(t['DTSTART'].dt), "title": str(t['SUMMARY'])}

# print(birthdays)
g.close()

# with open('assets/bdays.json', 'w') as outfile:
#     json.dump(birthdays, outfile)

with open('assets/bdays.json', 'r') as infile:
    bdays = json.load(infile)
print(bdays['6'])

print("Ok!")
