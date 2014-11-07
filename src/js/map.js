var ElectionMap = (function(GMaps, google){

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

  return ElectionMap;

}(GMaps, google));
