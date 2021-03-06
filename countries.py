import requests
import csv
import json

all_countries = requests.get('https://restcountries.eu/rest/v1/all').json()

codes = {}

for country in all_countries:

    codes[country['name']] = country['alpha3Code']

countries = []

with open('data/country_of_citizenship.csv', 'rU') as csvfile:

    reader = csv.reader(csvfile)
    next(reader)

    for row in reader:

        try:
            code = codes[row[0]]

            country = {
                'Code': code,
                'Year': int(row[1]),
                'Students': int(row[6])
            }

            countries.append(country)

        except:
            print row[0]
            pass

with open('data/countries.json', 'w') as outfile:
    json.dump(countries, outfile)
