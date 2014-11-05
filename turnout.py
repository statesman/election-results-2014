import csv
import simplejson

totals = {}
just_totals = []

with open('turnout.csv', 'rb') as input_file:
  results = csv.reader(input_file)
  next(results, None)
  for row in results:
    precinct = int(row[0])
    total = int(row[3].replace(',', ''))
    totals[precinct] = total
    just_totals.append(total)

fd = open('turnout.geojson', 'r')
text = fd.read()
fd.close()
geo = simplejson.loads(text)
for feature in geo['features']:
  precinct = int(feature['properties']['PCT'])
  vap = int(feature['properties']["SUM_VAP"])

  del feature['properties']
  feature['properties'] = {
    'turnout': totals[precinct],
    'vap': vap,
    'precinct': precinct
  }

  try:
    feature['properties']['percent'] = float(totals[precinct]) / float(vap)
  except ZeroDivisionError:
    feature['properties']['percent'] = 0

json_out = open('data.json', 'w')
json_out.write(simplejson.dumps(geo))
json_out.close()

print 'Done'
