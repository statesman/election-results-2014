var Results = (function($, Handlebars, _, numeral) {

  function Results(el) {
    this.$el = $(el);
    this.template = Handlebars.compile($("#results-template").html());
    this.$el.html(this.template());
  }

  // Show the precinct result instructions
  Results.prototype.showDefault = function() {
    this.$el.html(this.template());
  };

  // Update the key with new data
  Results.prototype.update = function(data) {
    // Take a pass to determine total votes
    var total_votes = 0;
    _.each(data.results, function(result) {
      total_votes += result.votes;
    });
    // Run through again and add percentages, format votes
    _.each(data.results, function(result) {
      result.share = numeral(result.votes / total_votes).format('0 %');
      result.votes_str = numeral(result.votes).format('0,0');
    });
    this.$el.html(this.template(data));
  };

  return Results;

}(jQuery, Handlebars, _, numeral));
