;(function(win, doc) {

  /**
   * Main function to create material avatars
   * @param element - The element(s) to apply the material avatar look to
   */
  function MaterialAvatar(elements, options) {

    if (elements[0]) {
      elements = [].slice.call(elements);

      elements.forEach(_createCanvas);
    } else {
      _createCanvas(elements);
    }

  }

  function _createCanvas(element){
    var _name = element.getAttribute('data-name') || element.innerHTML.replace(/\W/g, '');
    var _nameSplit = _name.split(' ');
    var _canvas = doc.createElement('canvas');
    var _initials;

    //Get initials from name
    if(_nameSplit.length > 1){
      _initials = _nameSplit[0].charAt(0).toUpperCase() + _nameSplit[1].charAt(0).toUpperCase();
    }else{
      _initials = _nameSplit[0].charAt(0).toUpperCase();
    }

    element.setAttribute('data-name', _name);
    element.innerHTML = '';
    element.appendChild(_canvas);

    var _context = _canvas.getContext('2d');

    var _canvasWidth = parseInt(_canvas.parentNode.offsetHeight, 10);
    var _canvasHeight = parseInt(_canvas.parentNode.offsetWidth, 10);

    _canvas.setAttribute('height', _canvasWidth);
    _canvas.setAttribute('width', _canvasHeight);

    var _fontSize = (_canvasHeight)/1.5;

    if(_canvas.classList.contains('circle')){
      _fontSize = _fontSize/(3.1415926/2);
    }

    var _textTop = (_canvasHeight / 2)+((_fontSize*0.68)/2);

    _context.fillStyle = _generateColor(_initials.charCodeAt(0) - 65);
    _context.fillRect (0, 0, _canvasWidth, _canvasHeight);
    _context.font = _fontSize + 'px/0px Arial';
    _context.textAlign = 'center';
    _context.fillStyle = _getTextColor(_context.fillStyle);
    _context.fillText(_initials, _canvasWidth / 2, _textTop);

  }

  function _getTextColor(backgroundColor){
    var _hexColor = _hexToRgb(backgroundColor);
    var _colorValue = (parseInt(_hexColor.r) * 299) + (parseInt(_hexColor.g) * 587) + (parseInt(_hexColor.b) * 114);
    var _check = Math.round(_colorValue/1000);

    return (_check > 125) ? '#222' : '#fff';
  }

  function _hexToRgb(hex) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
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

    if(randomColor) {
      return randomColor(options);
    }

    return defaults[index % defaults.length];

  }

  // export
  win.MaterialAvatar = MaterialAvatar;
})(window, document);
