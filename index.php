<!DOCTYPE html>
<html lang="en" >

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>Precinct-by-precinct vote totals</title>
  <link rel="icon" type="image/png" href="//projects.statesman.com/common/favicon.ico">

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

  <link href="bower_components/bootstrap/dist/css/bootstrap.css" rel="stylesheet">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->
  <style>
    body {
      font-family: 'Open Sans', sans-serif;
      background: #f9f9f9;
    }
    .navbar {
      background: #395271;
      border-radius: 0;
    }
    .navbar-brand img {
      height: 26px;
      width: auto;
    }
    .legend-item .color {
      border:1px solid;
      opacity: .4;
      width: 12px;
      height: 12px;
      float: left;
      margin-right: 5px;
      border-radius: 50%;
      margin-top: 4px;
    }
    .panel {
      border-radius: 0;
    }
    #results .panel-body p {
      margin-bottom: 0;
    }
    #results .panel-body .table {
      margin-bottom: 5px;
    }
    .panel-title {
      font-weight: bold;
      text-transform: uppercase;
      font-size: 0.95em;
      color: #777;
    }
  </style>

  <!-- project additions -->
  <?php include "advertising.js";?>
  <?php include "includes/metrics-head.js";?>
</head>

<body>
  <nav class="navbar navbar-default" role="navigation">
    <div class="container">
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <img width="546" height="52" src="assets/logo.png" />
        </a>
      </div>
    </div>
  </nav>

  <div class="container">
    <div class="row">
      <div class="col-xs-12 col-sm-4">
        <div class="form-group">
          <label for="race" class="control-label">Choose a race:</label>
          <select class="form-control" id="race">
            <optgroup label="State offices">
              <option value="governor">Governor</option>
              <option value="lt-governor">Lt. Governor</option>
              <option value="attorney-general">Attorney General</option>
            </optgroup>
            <optgroup label="U.S. Senator">
              <option value="senate">U.S. Senator</option>
            </optgroup>
            <optgroup label="U.S. Representative">
              <option value="us-rep-10" data-center="30.341302420968095,-97.64940643310548">District 10</option>
              <option value="us-rep-17" data-center="30.428375366501577,-97.56906890869142">District 17</option>
              <option value="us-rep-21" data-zoom="1" data-center="30.20550377358846,-97.82930755615236">District 21</option>
              <option value="us-rep-25" data-zoom="-1" data-center="30.38514475827691,-97.94586563110353">District 25</option>
              <option value="us-rep-35" data-center="30.19660211266278,-97.66846084594728">District 35</option>
            </optgroup>
            <optgroup label="State Senate">
              <option value="state-senate-14" data-zoom="-1" data-center="30.348413324166945,-97.75171661376955">District 14</option>
              <option value="state-senate-25" data-zoom="1" data-center="30.1589095005721,-97.85969161987306">District 25</option>
            </optgroup>
            <optgroup label="State Representative">
              <option value="state-house-46" data-zoom="1" data-center="30.35907871018818,-97.61301422119142">District 46</option>
              <option value="state-house-47" data-zoom="-1" data-center="30.336561531832643,-97.95496368408205">District 47</option>
              <option value="state-house-48" data-center="30.282617764815303,-97.81042480468751">District 48</option>
              <option value="state-house-49" data-zoom="1">District 49</option>
              <option value="state-house-50" data-center="30.353746162505935,-97.58005523681642">District 50</option>
              <option value="state-house-51" data-center="30.16039373431057,-97.67412567138673">District 51</option>
            </optgroup>
            <optgroup label="City of Austin races">
              <option value="mayor">Austin Mayor</option>
              <option selected value="rail">Urban rail</option>
              <option value="council-d1" data-center="30.311964485472895,-97.63481521606447">Austin City Council, District 1</option>
              <option value="council-d2" data-zoom="1" data-center="30.17078274487305,-97.65404129028322">Austin City Council, District 2</option>
              <option value="council-d3" data-zoom="1" data-center="30.217668074920706,-97.68991851806642">Austin City Council, District 3</option>
              <option value="council-d4" data-zoom="1" data-center="30.347820768633277,-97.70193481445314">Austin City Council, District 4</option>
              <option value="council-d5" data-zoom="1" data-center="30.171969990649355,-97.80767822265626">Austin City Council, District 5</option>
              <option value="council-d6" data-zoom="1" data-center="30.404393625935764,-97.83583068847658">Austin City Council, District 6</option>
              <option value="council-d7" data-zoom="1" data-center="30.383663919043997,-97.69541168212892">Austin City Council, District 7</option>
              <option value="council-d8" data-zoom="1" data-center="30.243178552369244,-97.85780334472658">Austin City Council, District 8</option>
              <option value="council-d9" data-zoom="2" data-center="30.271944052881455,-97.73489379882814">Austin City Council, District 9</option>
              <option value="council-d10" data-zoom="1" data-center="30.35137604801479,-97.7984085083008">Austin City Council, District 10</option>
            </optgroup>
          </select>
        </div>
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">Legend</h3>
          </div>
          <div id="key" class="panel-body"></div>
        </div>
        <div id="results"></div>
      </div>
      <div class="col-xs-12 col-sm-8">
        <div id="map" style="width:100%;height:700px;"></div>
      </div>
    </div>
  </div>

  <script id="results-template" type="text/x-handlebars-template">
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3 class="panel-title">Precinct {{#if precinct}}{{precinct}} {{/if}}results</h3>
      </div>
      <div class="panel-body">
        {{#if precinct}}
          <table class="table table-striped table-condensed">
            <thead>
              <tr>
                <th>Candidate</th>
                <th class="text-right">Votes</th>
                <th class="text-right">Share</th>
              </tr>
            </thead>
            <tbody>
              {{#each results}}
                <tr>
                  <td>{{candidate}}</td>
                  <td class="text-right">{{votes_str}}</td>
                  <td class="text-right">{{share}}</td>
                </tr>
              {{/each}}
            </tbody>
          </table>
        {{else}}
          <p>Hover over a race to see per-precinct vote counts.</p>
        {{/if}}
      </div>
    </div>
  </script>

  <script id="key-item-template" type="text/x-handlebars-template">
    <div class="legend-item">
      <div class="color" style="background-color:{{color}};border-color:{{color}};"></div>{{{label}}}
    </div>
  </script>

  <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCy25plOzFlJryxCSF7CkOWL86C8tZWsLI"></script>
  <script type="text/javascript" src="dist/scripts.js"></script>

  <?php include "includes/advertising.php";?>
  <!-- metrics code -->
  <?php include "includes/project-metrics.js"; ?>
  <?php include "includes//metrics.js"; ?>

</body>
</html>