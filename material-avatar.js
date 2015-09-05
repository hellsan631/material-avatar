;(function(win, doc) {

  /**
   * Main function to create material avatars
   * @param element - The element(s) to apply the material avatar look to
   */
  function MaterialAvatar(elements, options) {
    if (elements[0]) {

      //Turn our HTMLCollection into an array so we can iterate through it.
      elements = [].slice.call(elements);

      elements.forEach(_createCanvas);
    } else {
      _createCanvas(elements);
    }

    return elements;
  }

  function _createCanvas(element) {
    var canvas        = doc.createElement('canvas');
    var initials;
    var width;
    var height;

    //Push our reflows to a new animation frame.
    requestAnimationFrame(function() {
      width   = parseInt(element.offsetWidth, 10);
      height  = parseInt(element.offsetHeight, 10);

      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);

      _fillCanvas(element, canvas, width, height);
    });
  }

  function _fillCanvas(element, canvas, width, height) {
    var _initials         = _getInitials(element);
    var _fontSize         = _getFontSize(canvas, height, _initials);
    var _backgroundColor  = _generateColor(initials.charCodeAt(0) - 65);

    var _context          = canvas.getContext('2d');

    //Create background
    _context.fillStyle = _backgroundColor;
    _context.fillRect(0, 0, width, height);

    //Create our font styles
    _context.font       = _fontSize + 'px/0px Arial';
    _context.textAlign  = 'center';

    //Create the color and add our initials
    _context.fillStyle = _getTextColor(_backgroundColor);
    _context.fillText(_initials, width/2, (height / 2) + ((_fontSize*0.68)/2));

    element.innerHTML = '';
    element.appendChild(canvas);
  }

  function _getInitials(element) {
    var _name = element.getAttribute('data-name') || element.innerHTML.trim();
    var _nameSplit = _name.split(' ');
    var _initials;

    element.setAttribute('data-name', _name);

    //Get initials from name
    if (_nameSplit.length > 1) {
      _initials = _nameSplit[0].charAt(0).toUpperCase() + _nameSplit[1].charAt(0).toUpperCase();
    } else {
      _initials = _nameSplit[0].charAt(0).toUpperCase();
    }

    return _initials;
  }

  function _getFontSize(canvas, height, initials) {
    var _fontSize = height/((initials.length*0.5) + 1);

    if (canvas.classList.contains('circle')) {
      _fontSize = _fontSize/(3.1415926/2);
    }

    return _fontSize;
  }

  function _getTextColor(backgroundColor) {
    var _hexColor   = _hexToRgb(backgroundColor);
    var _colorValue = (_hexColor.r * 299) + (_hexColor.g * 587) + (_hexColor.b * 114);

    return (Math.round(_colorValue/1000) > 125) ? '#222' : '#fff';
  }

  function _hexToRgb(hex) {
    var result;

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (result) {
      return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      };
    }

    return null;
  }

  function _generateColor(index, options) {
    var defaults = [
        '#1abc9c', '#2ecc71', '#3498db',
        '#9b59b6', '#34495e', '#16a085',
        '#27ae60', '#2980b9', '#8e44ad',
        '#2c3e50', '#f1c40f', '#e67e22',
        '#e74c3c', '#95a5a6', '#f39c12',
        '#d35400', '#c0392b', '#bdc3c7',
        '#7f8c8d'
      ];

    //Uses the randomColor generator - https://github.com/davidmerfield/randomColor
    if (randomColor && options && options.randomcolor) {
      return randomColor(options);
    }

    return defaults[index % defaults.length];
  }

  // export
  win.MaterialAvatar = MaterialAvatar;
})(window, document);
