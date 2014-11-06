var Palette = (function($) {

  function Palette(key) {
    this.key = key;
    this.colors = [
      '#1E8A0E',
      '#1E44A8',
      '#FFCC00',
      '#FF6600',
      '#4D1979'
    ];
    this.partycolors = {
      'TIE': '#000000',
      'REP': '#B72B21',
      'LIB': '#E0C828',
      'DEM': '#1E44A8',
      'GRN': '#1E8A0E'
    };
    this.nextColor = 0;
    this.candidates = {};
    this.key.reset();
  }

  Palette.prototype.set = function(candidate, color) {
    this.candidates[candidate] = color;
    this.key.add({
      color: color,
      label: candidate
    });
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

  return Palette;

}(jQuery));
