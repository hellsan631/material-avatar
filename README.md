![material-avatar](sample.png)

Vanilla Javascript implementation of material avatars using canvas

[![Code Climate](https://codeclimate.com/github/hellsan631/material-avatar/badges/gpa.svg)](https://codeclimate.com/github/hellsan631/material-avatar)

====

Material-Avatar is non-opinionated, only has a few small features, and was built to solve a larger problem. _How can I generate a good looking default avatar for a user?_.

I got asked this question once, and there are a lot of other more complex implimentations out there, using bits and bobs to calculate a pixelated image, or grab sets of images from places, or use other web services. I like the way google approached the problem, creating a simple image with initials text.

Material-Avatar uses HTML5 Canvas to fill an element with a random(ized) background color, [which uses this great module to find nice random colors](https://github.com/davidmerfield/randomColor), but has a fall-back just incase you don't include it.

### Useage

1. Install using __npm__, __bower__, or __download__.
    ```bash
    npm install --save material-avatar
    bower install --save  material-avatar
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
      MaterialAvatar(document.getElementsByClass('default-profile-photo'));
    </script>
    ```

4. Profit.

### Options

[see sample](https://github.com/hellsan631/material-avatar/tree/master/sample) or [the live website](http://hellsan631.github.io/material-avatar/) for more details for now (going to expand on these a bit later).

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
