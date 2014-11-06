var Key = (function($, JST){

  function Key(el) {
    this.$el = $(el);
  }

  Key.prototype.add = function(data) {
    this.$el.append(JST.key_item(data));
  };

  Key.prototype.reset = function() {
    this.$el.empty();
  };

  return Key;

}(jQuery, JST));
