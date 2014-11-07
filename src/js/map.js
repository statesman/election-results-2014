var ElectionMap = (function($, GMaps, google){

  function ElectionMap(el, keyEl) {
    this.defaults = {
      center: [30.2968475746788, -97.72768402099611],
      zoom: 11
    };

    this.gmap = new GMaps({
      div: el,
      lat: this.defaults.center[0],
      lng: this.defaults.center[1],
      zoom: this.defaults.zoom
    });
  }

  ElectionMap.prototype.focus = function(zoom, center) {
    if(typeof center !== "undefined") {
      this.gmap.setCenter(center[0], center[1]);
    }
    else {
      this.gmap.setCenter(this.defaults.center[0], this.defaults.center[1]);
    }

    if(typeof zoom !== "undefined") {
      this.gmap.setZoom(this.defaults.zoom + parseInt(zoom, 10));
    }
    else {
      this.gmap.setZoom(this.defaults.zoom);
    }
  };

  ElectionMap.prototype.clear = function() {
    this.gmap.removePolygons();
    this.gmap.removePolylines();
  };

  ElectionMap.prototype.mark = function(lat, lng) {
    this.unMark();
    this.gmap.addMarker({
      lat: lat,
      lng: lng
    });
    this.focus(2, [lat, lng]);
  };

  ElectionMap.prototype.unMark = function() {
    this.gmap.removeMarkers();
  };

  ElectionMap.prototype.drawPrecinct = function(opts) {
    var opacity = opts.opacity || 0.5,
        self = this;

    this.gmap.drawPolygon({
      paths: opts.paths,
      useGeoJSON: true,
      strokeColor: '#fff',
      strokeOpacity: 0.5,
      strokeWeight: 1,
      fillColor: opts.fill,
      fillOpacity: opacity,
      zIndex: 500,
      mouseover: function() {
        self.results.update(opts.resultsData);
      },
      mouseout: function() {
        self.results.showDefault();
      }
    });
  };

  ElectionMap.prototype.preDraw = function() {
    this.clear();

    this.key = new Key('#key');
    this.colors = new Palette(this.key);
    this.results = new Results('#results');
  };

  ElectionMap.prototype.drawWinners = function(race) {
    this.preDraw();
    var self = this;

    $.getJSON('race-data/' + race + '.json', function(data) {
      _.each(data.features, function(feature) {
        if(typeof feature.properties !== "undefined") {
          this.drawPrecinct({
            paths: feature.geometry.coordinates,
            fill: this.colors.get(feature.properties.winner.candidate, feature.properties.winner.party),
            resultsData: feature.properties
          });
        }
      }, self);
    });
  };

  ElectionMap.prototype.drawSupport = function(race, opt) {
    this.preDraw();
    var self = this;

    var label = "";
    if (opt === "For") {
      label = "Votes for " + race;
    }
    else {
      label = "Votes for " + opt;
    }
    label = label + " <small>(darker precincts indicate higher support)</small>";
    var color = this.colors.get(opt, "", label);

    $.getJSON('race-data/' + race + '.json', function(data) {
      _.each(data.features, function(feature) {
        if(typeof feature.properties !== "undefined") {
          var votes_for = 0,
              total_votes = 0;
          _.each(feature.properties.races, function(option) {
            if(option.candidate === opt) {
              votes_for += option.votes;
            }
            total_votes += option.votes;
          });
          this.drawPrecinct({
            paths: feature.geometry.coordinates,
            fill: color,
            opacity: (votes_for / total_votes) * 1.25,
            resultsData: feature.properties
          });
        }
      }, self);
    });
  };

  return ElectionMap;

}(jQuery, GMaps, google));
