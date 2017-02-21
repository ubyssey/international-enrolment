import csv
import json

faculties = []

START_YEAR = 2006

with open('data/enrolment.csv', 'rU') as csvfile:

    reader = csv.reader(csvfile)

    for i in range(10):

        faculty = next(reader)[0]
        domestic = next(reader)[1:]
        international = next(reader)[1:]

        years = []

        for i in range(10):
            domes = float(domestic[i] or 0)
            inter = float(international[i] or 0)

            if domes != 0:
                percent = inter / (domes + inter)
            else:
                percent = 1.0

            years.append({
                'year': START_YEAR + i,
                'value': percent
            })

        faculties.append({
            'faculty': faculty,
            'values': years
        })

with open('data/faculties.json', 'w') as outfile:
    json.dump(faculties, outfile)
