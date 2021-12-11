function getMouseCoords(e) {
  var e = e || window.event;
}


var followCursor = (function() {
  var s = document.createElement('div');
  s.style.position = 'absolute';
  s.style.margin = '0';
  s.style.padding = '5px';
  s.style.backgroundImage = "url('images/pix-pxi.png')";
  s.style.backgroundSize = "contain";
  s.style.width = '150px';
  s.style.height = '150px';

  return {
    init: function() {
      document.body.appendChild(s);
    },

    run: function(e) {
      var e = e || window.event;
      s.style.left = (e.clientX - 5) + 'px';
      s.style.top = (e.clientY - 5) + 'px';
      getMouseCoords(e);
    }
  };
}());

window.onload = function() {
  followCursor.init();
  document.body.onmousemove = followCursor.run;
}