<img src="sample.png" align="center" alt="Material Avatar" />

Simple material design avatars using canvas

### Enhanced by [BrowserStack](http://browserstack.com/)

[![Code Climate](https://codeclimate.com/github/hellsan631/material-avatar/badges/gpa.svg)](https://codeclimate.com/github/hellsan631/material-avatar)
[![License](http://img.shields.io/badge/License-MIT-blue.svg)](http://opensource.org/licenses/MIT) 
1.33kb gziped!

====

Material-Avatar is non-opinionated and only has a few small features. It was built to solve a larger problem. _How can I generate a good looking default avatar for a user?_.

I got asked this question once, and there are a lot of other more complex implimentations out there, using bits and bobs to calculate a pixelated image, or grab sets of images from places, or use other web services. I like the way google approached the problem, creating a simple image with initials text.

Material-Avatar uses HTML5 Canvas to fill an element with a random(ized) background color, [which uses this great module to find nice random colors](https://github.com/davidmerfield/randomColor), but has a fall-back just incase you don't include it.

> __Now Supports jQuery!__

### Useage

1. Install using __npm__, __bower__, or __download__.
    ```bash
    npm install --save material-avatar
    bower install --save material-avatar
    ```

    And include your scripts,

    ```html
    <script src="vendor/material-avatar/material-avatar.min.js"></script>
    ```

2. Create a nice div and fill it with a name, or use the attribute __data-name__. _Note, material-avatar defaults to using the size provided by the style of the element on the page_
    ```html
    <div class="default-profile-photo" style="height:200px; width:200px;">
      Paul Gilbert
    </div>
    ```

3. Call __MaterialAvatar__ in somewhere on your page.
    ```html
    <script>
      MaterialAvatar(document.getElementsByClass('default-profile-photo'), options);

      //or use jQuery

      $('.default-profile-photo').materialAvatar(options);
    </script>
    ```

4. Profit.

### Options

> __EffectName:__ "default" _(type)_<br/>
>	Description

1. __shape__ "square" _(string)_ <br/>
Can either be "circle" or "square", and will take that shape (more shapes in future updates!)

2. __randomColor__ _(object)_ <br/>
Settings for using the [randomColor library](https://github.com/davidmerfield/randomColor)

3. __backgroundColor__ _(string)_ <br/>
A hex string for a background color (i.e. '#f12a27'). If not set, one will be chosen at random, or from
a default colorPalette (which can be overridden)

4. __textColor__ _(string)_ <br/>
A hex string for the text color (i.e. '#fff'). If not set, an accessable friendly color will be chosen
based on the background color (either '#222' or '#fff')

5. __colorPalette__ _(array)_ <br/>
An array of color hexes that can will be chosen from randomly as a fallback. Defaults can be found in
the material-avatar.js file.

6. __fontSize__ _(number or function)_ <br/>
An overriding size for font. This can either be a number, measured in px, or a function. If its a function,
it will be sent two arguments, the height of the canvas, and the initials length, which can be used to
return a calculated font size.

7. __fontFamily__ "Arial" _(string)_ <br/>
The chosen font family for generating the canvas initials font.

8. __initials__ _(string)_ <br/>
A string of characters used as the initials for the avatar.

9. __name__ _(string)_ <br/>
In addition to being able to use the data-name attribute, or the innerHtml of an element, you can also pass
a name in the options, which will be broken down into the initial.

[see sample](https://github.com/hellsan631/material-avatar/tree/master/sample) or [the live website](http://hellsan631.github.io/material-avatar/) for some examples.

### Development

If you'd like to develop this little module a bit further, I use a nice gulp build process.

__Get a localhost live-reload web-server running to develop the module__
```
npm install
gulp serve
```

__Before you push your changes, make sure to run the gulp build script__
```
gulp build
```

### License

MIT
