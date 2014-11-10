import csv, sys, simplejson

def is_in_county(p):
  """
  Check if the precinct number has a letter prefix, which would mean it's
  from another county.
  """
  try:
    float(p[0:1])
    return True
  except ValueError:
    return False


def write_precinct_data(races, precinct, data):
  """
  Write the race data to the passed precinct data dict
  """
  try:
    sorted_races = sorted(races, key=lambda k: k['votes'], reverse=True)
    data[precinct] = {
      'races': sorted_races,
      'winner': sorted_races[0]
    }

    # Special handling for ties
    if (sorted_races[0]['votes'] == sorted_races[1]['votes']):
      data[precinct]['winner'] = {
        'candidate': 'Tie',
        'votes': '-',
        'party': 'TIE'
      }
  except IndexError:
    pass


# And walk the CSV
def build_race_file(target_races, filename):

  # Get the JSON files for Travis and Williamson and combine them
  combined = open('precincts/combined-simplified.geojson', 'r')
  text = combined.read()
  combined.close()
  geo = simplejson.loads(text)

  races = []
  current_precinct = None
  running_vote_total = 0
  precinct_data = {}

  # Loop through Travis results and add them to precinct data
  with open('results/travis.csv', 'rb') as input_file:

    # Open a reader for the input file
    results = csv.reader(input_file, delimiter=',')
    next(results, None)

    # Loop over the input, parse & write the new file
    for row in results:

      # Pull our data from the CSV columns
      precinct = row[0]
      in_county = is_in_county(precinct)
      candidate_name = row[2]
      total_votes = int(row[4])
      race = row[1]
      party = row[3]

      if race in target_races and in_county:

        if current_precinct != precinct and current_precinct != None:
          if running_vote_total > 0:
            write_precinct_data(races, current_precinct, precinct_data)

          races = []
          running_vote_total = 0

        races.append({
          'candidate': candidate_name,
          'votes': total_votes,
          'party': party
        })

        current_precinct = precinct

        # Keep a running vote total to calculate the percentage down the road
        running_vote_total = running_vote_total + total_votes

    # Write the last row
    write_precinct_data(races, current_precinct, precinct_data)

  # Loop through Williamson results and add them to precinct data
  with open('results/williamson.csv', 'rb') as input_file:

    # Open a reader for the input file
    results = csv.reader(input_file, delimiter=',')
    next(results, None)

    # Loop over the input, parse & write the new file
    for row in results:

      # Pull our data from the CSV columns
      precinct = "W" + str(row[0])
      race = row[1]
      candidate_name = row[2]
      party = row[3]
      if party == "NON":
        party = None
      total_votes = int(row[4])

      if race in target_races:

        if current_precinct != precinct and current_precinct != None:
          if running_vote_total > 0:
            write_precinct_data(races, current_precinct, precinct_data)

          races = []
          running_vote_total = 0

        races.append({
          'candidate': candidate_name,
          'votes': total_votes,
          'party': party
        })

        current_precinct = precinct

        # Keep a running vote total to calculate the percentage down the road
        running_vote_total = running_vote_total + total_votes

    # Write the last row
    write_precinct_data(races, current_precinct, precinct_data)

  to_thin = []
  for i, feature in enumerate(geo['features']):
    precinct = feature['properties']['PCT']

    old_props = feature['properties']
    del feature['properties']

    try:
      feature['properties'] = dict(old_props.items() + precinct_data[precinct].items())
    except KeyError:
      to_thin.append(i)
      pass

  for feature in to_thin[::-1]:
    geo['features'].pop(feature)

  json_out = open('race-data/' + filename + '.json', 'w')
  json_out.write(simplejson.dumps(geo))
  json_out.close()

build_race_file(["GOVERNOR", "Governor"], 'governor')
build_race_file(["LIEUTENANT GOVERNOR", "Lieutenant Governor"], 'lt-governor')
build_race_file(["ATTORNEY GENERAL", "Attorney General"], 'attorney-general')

build_race_file(["MAYOR, CITY OF AUSTIN", "Mayor, City of Austin"], 'mayor')
build_race_file(["PROPOSITION, CITY OF AUSTIN", "Austin Prop 1 CITY OF AUSTIN FULL PURPOSE"], 'rail')
build_race_file(["DISTRICT 1, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d1')
build_race_file(["DISTRICT 2, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d2')
build_race_file(["DISTRICT 3, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d3')
build_race_file(["DISTRICT 4, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d4')
build_race_file(["DISTRICT 5, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d5')
build_race_file(["DISTRICT 6, AUSTIN CITY COUNCIL, CITY OF AUSTIN", "District 6, Austin City Council"], 'council-d6')
build_race_file(["DISTRICT 7, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d7')
build_race_file(["DISTRICT 8, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d8')
build_race_file(["DISTRICT 9, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d9')
build_race_file(["DISTRICT 10, AUSTIN CITY COUNCIL, CITY OF AUSTIN"], 'council-d10')

build_race_file(["DISTRICT 10, UNITED STATES REPRESENTATIVE"], 'us-rep-10')
build_race_file(["DISTRICT 17, UNITED STATES REPRESENTATIVE"], 'us-rep-17')
build_race_file(["DISTRICT 21, UNITED STATES REPRESENTATIVE"], 'us-rep-21')
build_race_file(["DISTRICT 25, UNITED STATES REPRESENTATIVE"], 'us-rep-25')
build_race_file(["DISTRICT 35, UNITED STATES REPRESENTATIVE"], 'us-rep-35')

build_race_file(["DISTRICT 46, STATE REPRESENTATIVE"], "state-house-46")
build_race_file(["DISTRICT 47, STATE REPRESENTATIVE"], "state-house-47")
build_race_file(["DISTRICT 48, STATE REPRESENTATIVE"], "state-house-48")
build_race_file(["DISTRICT 49, STATE REPRESENTATIVE"], "state-house-49")
build_race_file(["DISTRICT 50, STATE REPRESENTATIVE"], "state-house-50")
build_race_file(["DISTRICT 51, STATE REPRESENTATIVE"], "state-house-51")

build_race_file(["DISTRICT 14, STATE SENATOR"], "state-senate-14")
build_race_file(["DISTRICT 25, STATE SENATOR"], "state-senate-25")

build_race_file(["UNITED STATES SENATOR", "United States Senator US REPRESENTATIVE DISTRICT 31"], 'senate')

# Williamson-only races
build_race_file(["State Senator, District 5"], "state-senate-5")
build_race_file(["US Representative, District 31"], 'us-rep-31')
build_race_file(["State Representative, District 20"], "state-house-20")
build_race_file(["State Representative, District 52"], "state-house-52")
build_race_file(["State Representative, District 136"], "state-house-136")
