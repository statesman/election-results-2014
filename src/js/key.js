var Key = (function() {

  function Key(el) {
    this.$el = $(el);
    this.template = Handlebars.compile($("#key-item-template").html());
  }

  Key.prototype.add = function(data) {
    this.$el.append(this.template(data));
  };

  Key.prototype.reset = function() {
    this.$el.empty();
  };

  return Key;

}());
