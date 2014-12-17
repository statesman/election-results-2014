<!DOCTYPE html>
<html lang="en" >
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1">

  <title>Travis and Williamson county precinct-by-precinct 2014 election results | Statesman.com</title>
  <link rel="icon" type="image/png" href="//projects.statesman.com/common/favicon.ico">

  <meta name="description" content="Precinct-by-precinct Travis and Williamson county election results for the 2014 general election.">

  <meta property="og:title" content="Travis and Williamson county election results map"/>
  <meta property="og:description" content="Precinct-by-precinct Travis and Williamson county election results for the 2014 general election."/>
  <meta property="og:image" content="http://projects.statesman.com/databases/election-maps/assets/social-share.jpg"/>
  <meta property="og:url" content="http://projects.statesman.com/databases/election-maps/"/>

  <meta name="twitter:card" content="summary" />
  <meta name="twitter:site" content="@statesman" />
  <meta name="twitter:title" content="Travis and Williamson county election results map" />
  <meta name="twitter:description" content="Precinct-by-precinct Travis and Williamson county election results for the 2014 general election." />
  <meta name="twitter:image" content="http://projects.statesman.com/databases/election-maps/assets/social-share.jpg" />
  <meta name="twitter:url" content="http://projects.statesman.com/databases/election-maps/" />

  <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700' rel='stylesheet' type='text/css'>

  <link href="dist/style.css" rel="stylesheet">
  <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- project additions -->
  <?php include "includes/advertising.js";?>
  <?php include "../../common/metrics-head.js";?>
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
      <div class="col-xs-12 header">
        <h4>2014 elections</h4>
        <h2 class="page-title">Travis and Williamson county precinct-by-precinct results</h2>
        <p><small>Interactive by Andrew Chavez and Christian McDonald, Austin American-Statesman</small></p>
        <p>Use the dropdown to see the highest vote-getter in a race for each Travis and Williamson county precinct in the Nov. 4 general election and the Dec. 17 runoff election. Roll your cursor over each precinct on the map to see votes for all candidates in the selected race. Hover over a candidate's name in the map legend to see his or her support in each precinct. For full results, go to <a href="http://statesman.com/electionresults" target="_blank">statesman.com/electionresults</a></p>
      </div>

      <div class="form-group clearfix">
        <div class="col-lg-6">
          <label for="race" class="control-label">Choose a race:</label>
            <select class="form-control" id="race" name="race">
            <optgroup label="State offices">
              <option data-zoom="-1" data-center="30.470995016166533,-97.67961883544923" value="governor">Governor</option>
              <option data-zoom="-1" data-center="30.470995016166533,-97.67961883544923" value="lt-governor">Lt. Governor</option>
              <option data-zoom="-1" data-center="30.470995016166533,-97.67961883544923" value="attorney-general">Attorney General</option>
            </optgroup>
            <optgroup label="U.S. Senator">
              <option data-zoom="-1" data-center="30.470995016166533,-97.67961883544923" value="senate">U.S. Senator</option>
            </optgroup>
            <optgroup label="U.S. Representative">
              <option value="us-rep-10" data-center="30.341302420968095,-97.64940643310548">District 10</option>
              <option value="us-rep-17" data-center="30.428375366501577,-97.56906890869142">District 17</option>
              <option value="us-rep-21" data-zoom="1" data-center="30.20550377358846,-97.82930755615236">District 21</option>
              <option value="us-rep-25" data-zoom="-1" data-center="30.38514475827691,-97.94586563110353">District 25</option>
              <option value="us-rep-31" data-zoom="-1" data-center="30.630061684293455,-97.61078262329103">District 31</option>
              <option value="us-rep-35" data-center="30.19660211266278,-97.66846084594728">District 35</option>
            </optgroup>
            <optgroup label="State Senate">
              <option value="state-senate-14" data-zoom="-1" data-center="30.348413324166945,-97.75171661376955">District 14</option>
              <option value="state-senate-25" data-zoom="1" data-center="30.1589095005721,-97.85969161987306">District 25</option>
            </optgroup>
            <optgroup label="State Representative">
              <option value="state-house-20" data-zoom="-1" data-center="30.664324403102558,-97.6226272583008">District 20</option>
              <option value="state-house-46" data-zoom="1" data-center="30.35907871018818,-97.61301422119142">District 46</option>
              <option value="state-house-47" data-zoom="-1" data-center="30.336561531832643,-97.95496368408205">District 47</option>
              <option value="state-house-48" data-center="30.282617764815303,-97.81042480468751">District 48</option>
              <option value="state-house-49" data-zoom="1" data-center="30.309296964723977,-97.72905731201173">District 49</option>
              <option value="state-house-50" data-center="30.353746162505935,-97.58005523681642">District 50</option>
              <option value="state-house-51" data-center="30.16039373431057,-97.67412567138673">District 51</option>
              <option value="state-house-52" data-center="30.540803561891984,-97.58623504638673">District 52</option>
              <option value="state-house-136" data-zoom="1" data-center="30.522468882456955,-97.80046844482423">District 136</option>
            </optgroup>
            <optgroup label="City of Austin races">
              <option value="mayor">Austin Mayor</option>
              <option value="rail">Urban rail</option>
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
            <optgroup label="City of Austin races - runoff">
              <option selected value="mayor-runoff">Austin Mayor - runoff</option>
              <option value="council-d1-runoff" data-center="30.311964485472895,-97.63481521606447">Austin City Council, District 1 - runoff</option>
              <option value="council-d3-runoff" data-zoom="1" data-center="30.217668074920706,-97.68991851806642">Austin City Council, District 3 - runoff</option>
              <option value="council-d4-runoff" data-zoom="1" data-center="30.347820768633277,-97.70193481445314">Austin City Council, District 4 - runoff</option>
              <option value="council-d6-runoff" data-zoom="1" data-center="30.404393625935764,-97.83583068847658">Austin City Council, District 6 - runoff</option>
              <option value="council-d7-runoff" data-zoom="1" data-center="30.383663919043997,-97.69541168212892">Austin City Council, District 7 - runoff</option>
              <option value="council-d8-runoff" data-zoom="1" data-center="30.243178552369244,-97.85780334472658">Austin City Council, District 8 - runoff</option>
              <option value="council-d10-runoff" data-zoom="1" data-center="30.35137604801479,-97.7984085083008">Austin City Council, District 10 - runoff</option>
            </optgroup>
          </select>
        </div>
        <div class="col-lg-6">
          <label for="address" class="control-label">Find an address:</label>
          <input name="address" id="address" type="text" class="form-control">
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-sm-8 col-sm-push-4">
        <div id="map" style="width:100%;min-height:350px;"></div>
      </div>
      <div class="col-xs-12 col-sm-4 col-sm-pull-8">
        <ul id="key" class="list-group"></ul>
        <div id="results"></div>
        <p><small>Data source: Travis County Clerk, Elections Division; Williamson County Clerk, Elections Department</small></p>
      </div>
    </div>
  </div>

  <?php include "includes/advertising.php";?>

  <script type="text/javascript" src="http://maps.google.com/maps/api/js?key=AIzaSyCy25plOzFlJryxCSF7CkOWL86C8tZWsLI&libraries=places"></script>
  <script type="text/javascript" src="dist/scripts.js"></script>

  <!-- metrics code -->
  <?php include "includes/project-metrics.js"; ?>
  <?php include "../../common/metrics.js"; ?>

  <p class="center-block text-center legal" style="max-width: 500px;margin-bottom:10px;line-height:15px;"><small>© 2014 <a href="http://www.coxmediagroup.com" target="_blank">Cox Media Group</a>. By using this website,
    you accept the terms of our <a href="http://www.mystatesman.com/visitor_agreement/" target="_blank">Visitor Agreement</a> and <a target="_blank" href="http://www.mystatesman.com/privacy_policy/">Privacy Policy</a>, and understand your options regarding <a target="_blank" href="http://www.mystatesman.com/privacy_policy/#ad-choices">Ad Choices</a><img border="0" src="http://media.cmgdigital.com/shared/img/photos/2012/02/29/d3/da/ad_choices_logo.png" alt="AdChoices" style="margin: 0 0 0 4px;">.</small></p>

</body>
</html>
