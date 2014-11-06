var Results = (function($, Handlebars) {

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
    this.$el.html(this.template(data));
  };

  return Results;

}(jQuery, Handlebars));
