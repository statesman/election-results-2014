var gmap;

(function(jQuery, ElectionMap, _, Key, Palette, Results) {

  var set_race = function(race, map) {
    map.clear();

    // Persistent race-level key that shows colors per-candidate
    var key = new Key('#key');
    var colors = new Palette(key);

    // Per-precinct vote total details
    var results = new Results('#results');

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
            map.gmap.drawPolygon({
              paths: feature.geometry.coordinates,
              useGeoJSON: true,
              strokeColor: '#fff',
              strokeOpacity: 0.5,
              strokeWeight: 1,
              fillColor: '#1E44A8',
              fillOpacity: (votes_for / total_votes) * 1.25,
              mouseover: function() {
                results.update(feature.properties);
              },
              mouseout: function() {
                results.showDefault();
              }
            });
          }
        });

        key.add({
          color: "#3A56E0",
          label: "Votes for rail <small>(darker precincts indicate higher support)</small>"
        });

        // Draw the proposed rail line
        $.getJSON('rail-routes/new.json', function(data) {
          var rail_line = data.features[0].geometry.coordinates;
          var transposed_coords = _.map(rail_line, function(el) {
            return [el[1], el[0]];
          });
          map.gmap.drawPolyline({
            path: transposed_coords,
            strokeColor: '#B72B21',
            strokeOpacity: 0.75,
            strokeWeight: 5,
          });
          key.add({
            color: "#B72B21",
            label: "Proposed rail line"
          });
        });

      });
    }

    else {
      $.getJSON('race-data/' + race + '.json', function(data) {
        _.each(data.features, function(feature) {
          if(typeof feature.properties !== "undefined") {
            map.gmap.drawPolygon({
              paths: feature.geometry.coordinates,
              useGeoJSON: true,
              strokeColor: '#fff',
              strokeOpacity: 0.5,
              strokeWeight: 1,
              fillColor: colors.get(feature.properties.winner.candidate, feature.properties.winner.party),
              fillOpacity: 0.5,
              mouseover: function() {
                results.update(feature.properties);
              },
              mouseout: function() {
                results.showDefault();
              }
            });
          }
        });
      });
    }
  };

  $(function() {

    var map = new ElectionMap('#map');
    gmap = map.gmap;
    set_race('rail', map);

    $('#race').change(function() {
      set_race($(this).val(), map);

      var center = $(this).find(':selected').data('center');
      var zoom = $(this).find(':selected').data('zoom');

      map.focus(zoom, center);
    });

  });

}(jQuery, ElectionMap, _, Key, Palette, Results));
