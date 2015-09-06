;(function(win, doc) {

  /**
   * Main function to create material avatars
   * @param element - The element(s) to apply the material avatar look to
   */
  function MaterialAvatar(elements, options) {
    this.options = options;
    this.elements = elements;
    var _this = this;

    if (this.elements[0]) {

      //Turn our HTMLCollection into an array so we can iterate through it.
      this.elements = [].slice.call(this.elements);

      this.elements.forEach(function(element){
        element.avatar = new Avatar(element, _this.options);
      });
    } else {
      this.elements.avatar = new Avatar(elements, _this.options);
    }
  }

  MaterialAvatar.prototype.updateOptions = function(options) {
    var _this = this;

    if (options) {
      this.options = options;
    }

    this.elements.forEach(function(element){
      element.avatar.options = _this.options;
    });
  };

  function Avatar(element, options) {
    var _this = this;
    this.element  = element;
    this.options  = options;
    this.canvas   = doc.createElement('canvas');

    //Push our reflows to a new animation frame.
    requestAnimationFrame(function() {
      _this.width   = parseInt(_this.element.offsetWidth, 10);
      _this.height  = parseInt(_this.element.offsetHeight, 10);

      _this.canvas.setAttribute('width', _this.width);
      _this.canvas.setAttribute('height', _this.width);

      _this.initials = _this.getInitials();
      _this.fontSize = _this.getFontSize();

      _this.render();
    });
  }

  Avatar.prototype.render = function() {
    this.backgroundColor  = this.generateColor(this.initials.charCodeAt(0) - 65);
    this.context          = this.canvas.getContext('2d');

    //Create our font styles
    this.context.font       = this.fontSize + 'px/0px Arial';
    this.context.textAlign  = 'center';

    //Decide what type of shape we should draw for the background
    if (this.options) {
      if(this.options.shape === 'circle') {
        this._drawCircle();
      } else {
        this._drawSquare();
      }
    } else {
      this._drawSquare();
    }

    //Create the color and add our initials
    this.context.fillStyle  = this.getTextColor();
    this.context.fillText(
      this.initials,
      this.width/2,
      (this.height / 2) + ((this.fontSize*0.68)/2)
    );

    //Remove the inner text and swap in the canvas elemnt
    this.element.innerHTML  = '';
    this.element.appendChild(this.canvas);
  };

  //Creates circle background area
  Avatar.prototype._drawCircle = function() {
    var centerX = this.width  / 2;
    var centerY = this.height / 2;
    var radius  = this.width  / 2;

    this.context.beginPath();
    this.context.arc(centerX, centerY, radius, 0, 2 * Math.PI, false);
    this.context.fillStyle  = this.backgroundColor;
    this.context.fill();
  };

  //Creates square background area
  Avatar.prototype._drawSquare = function() {
    this.context.fillStyle  = this.backgroundColor;
    this.context.fillRect(0, 0, this.width, this.height);
  };

  Avatar.prototype.getInitials = function () {
    this.name       = this.element.getAttribute('data-name') || this.element.innerHTML.trim();
    var _nameSplit  = this.name.split(' ');
    var _initials;

    this.element.setAttribute('data-name', this.name);

    //Get initials from name
    if (_nameSplit.length > 1) {
      _initials = _nameSplit[0].charAt(0).toUpperCase() + _nameSplit[1].charAt(0).toUpperCase();
    } else {
      _initials = _nameSplit[0].charAt(0).toUpperCase();
    }

    return _initials;
  };

  Avatar.prototype.getFontSize = function () {
    var _fontSize = this.height/((this.initials.length*0.5) + 1);

    if (this.canvas.classList.contains('circle')) {
      _fontSize = _fontSize/(3.1415926/2);
    }

    return _fontSize;
  };

  Avatar.prototype.getTextColor = function () {
    var _hexColor   = this._hexToRgb(this.backgroundColor);
    var _colorValue = (_hexColor.r * 299) + (_hexColor.g * 587) + (_hexColor.b * 114);

    return (Math.round(_colorValue/1000) > 125) ? '#222' : '#fff';
  };

  Avatar.prototype._hexToRgb = function (hex) {
    var _result;

    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    hex = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    _result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    if (_result) {
      return {
        r: parseInt(_result[1], 16),
        g: parseInt(_result[2], 16),
        b: parseInt(_result[3], 16)
      };
    }

    return null;
  };

  Avatar.prototype.generateColor = function (index) {
    var _defaults = [
        '#303F9F', '#3F51B5', '#C5CAE9',
        '#FFC107', '#727272',
        '#00796B', '#009688', '#009688',
        '#536DFE', '#FFA000', '#FFEB3B',
        '#FFECB3'
      ];

    //Uses the randomColor generator - https://github.com/davidmerfield/randomColor
    if (randomColor) {
      if (this.options && this.options.randomColor) {
        return randomColor(this.options.randomColor);
      } else if (!this.options) {
        return randomColor();
      }
    }

    return _defaults[index % _defaults.length];
  };

  // export
  win.MaterialAvatar  = MaterialAvatar;
  win.Avatar          = Avatar;
})(window, document);
