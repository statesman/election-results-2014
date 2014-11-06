function Palette() {
  this.colors = [
    '#1E8A0E',
    '#1E44A8',
    '#FFCC00',
    '#FF6600',
    '#4D1979'
  ];
  this.partycolors = {
    'REP': '#B72B21',
    'LIB': '#E0C828',
    'DEM': '#1E44A8',
    'GRN': '#1E8A0E'
  };
  this.nextColor = 0;
  this.candidates = {};
  $('#legend').show();
  $('#legend').find('.panel-body').empty();
}
Palette.prototype.set = function(candidate, color) {
  this.candidates[candidate] = color;
  $('#legend').find('.panel-body').append("<div class='legend-item'><div class='color' style='background-color:" + color + ";border-color:" + color + ";'></div>" + candidate + "</div></div>");
};
Palette.prototype.get = function(candidate, party) {
  if(typeof this.candidates[candidate] === "undefined") {
    if(party === "") {
      this.set(candidate, this.colors[this.nextColor]);
      this.nextColor++;
    }
    else {
      this.set(candidate, this.partycolors[party]);
    }
  }
  return this.candidates[candidate];
};

var legend = Handlebars.compile($("#legend-template").html());

var map;

var set_race = function(race, map) {
  map.removePolygons();
  map.removePolylines();
  colors = new Palette();

  if(race === 'rail') {
    $.getJSON('race-data/rail.json', function(data) {
      _.each(data.features, function(feature) {
        if(typeof feature.properties !== "undefined") {
          var votes_for = 0;
          var total_votes = 0;
          _.each(feature.properties.races, function(opt) {
            if(opt.candidate === "For") {
              votes_for += opt.votes;
            }
            total_votes += opt.votes;
          });
          map.drawPolygon({
            paths: feature.geometry.coordinates,
            useGeoJSON: true,
            strokeColor: '#fff',
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: '#1E44A8',
            fillOpacity: (votes_for / total_votes) * 1.25,
            mouseover: function() {
              var data = {
                precinct: feature.properties.precinct,
                results: feature.properties.races
              };
              $('#key').find('.panel-body').html(legend(data));
              $('#key').find('#number').text(feature.properties.precinct + ' ');
              $('#key:hidden').show();
            },
            mouseout: function() {
              $('#key').hide();
            }
          });
        }
      });
      $('#legend').find('.panel-body').append("<div class='legend-item'><div class='color' style='background-color:#3A56E0;border-color:#3A56E0;'></div>Votes for rail <small>(darker precincts indicate higher support)</small></div></div>");
      // Draw the proposed rail line
      $.getJSON('rail-routes/new.json', function(data) {
        var rail_line = data.features[0].geometry.coordinates;
        var transposed_coords = _.map(rail_line, function(el) {
          return [el[1], el[0]];
        });
        map.drawPolyline({
          path: transposed_coords,
          strokeColor: '#B72B21',
          strokeOpacity: 0.75,
          strokeWeight: 5,
        });
        $('#legend').find('.panel-body').append("<div class='legend-item'><div class='color' style='background-color:#B72B21;border-color:#B7B21;'></div>Proposed rail line</div></div>");
      });
    });
  }

  else {
    $.getJSON('race-data/' + race + '.json', function(data) {
      _.each(data.features, function(feature) {
        if(typeof feature.properties !== "undefined") {
          var stroke = tinycolor(colors.get(feature.properties.winner.candidate, feature.properties.winner.party));
          var fill = tinycolor(colors.get(feature.properties.winner.candidate, feature.properties.winner.party));

          map.drawPolygon({
            paths: feature.geometry.coordinates,
            useGeoJSON: true,
            strokeColor: '#fff',
            strokeOpacity: 0.5,
            strokeWeight: 1,
            fillColor: fill.toHexString(),
            fillOpacity: 0.5,
            mouseover: function() {
              var data = {
                precinct: feature.properties.precinct,
                results: feature.properties.races
              };
              $('#key').find('.panel-body').html(legend(data));
              $('#key').find('#number').text(feature.properties.precinct + ' ');
              $('#key:hidden').show();
            },
            mouseout: function() {
              $('#key').hide();
            }
          });
        }
      });
    });
  }
};

$(function() {

  var center_default = [30.280245929155083,-97.73489379882814];
  var zoom_default = 11;

  map = new GMaps({
    div: '#map',
    lat: center_default[0],
    lng: center_default[1],
    zoom: zoom_default
  });
  set_race('rail', map);

  $('#race').change(function() {
    var race = $(this).val();
    if(race === 'none') {
      map.removePolygons();
      map.setCenter(center_default[0], center_default[1]);
      map.setZoom(zoom_default);
    }
    else {
      set_race(race, map);
    }
    var center = $(this).find(':selected').attr('data-center');
    if(typeof center !== "undefined") {
      center = center.split(',');
      map.setCenter(center[0], center[1]);
    }
    else {
      map.setCenter(center_default[0], center_default[1]);
    }
    var zoom = $(this).find(':selected').attr('data-zoom');
    if(typeof zoom !== "undefined") {
      console.log(parseInt(zoom, 10));
      map.setZoom(zoom_default + parseInt(zoom, 10));
    }
    else {
      map.setZoom(zoom_default);
    }
  });

});
