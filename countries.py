import requests
import csv
import json

all_countries = requests.get('https://restcountries.eu/rest/v1/all').json()

codes = {}

for country in all_countries:

    codes[country['name']] = country['alpha3Code']

countries = {}

with open('data/country_of_citizenship.csv', 'rU') as csvfile:

    reader = csv.reader(csvfile)

    for row in reader:

        try:
            code = codes[row[0]]

            country = {
                'Code': code,
                'Year': int(row[1]),
                'Students': int(row[6]),
                'Lat': float(row[4]),
                'Lon': float(row[5])
            }

            countries[code] = country

        except:
            pass

with open('data/countries.json', 'w') as outfile:
    json.dump(countries, outfile)
