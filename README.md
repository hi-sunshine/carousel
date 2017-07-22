# carousel



![](https://github.com/AnonymousBoy1/carousel/raw/master/image.png) 
<br>
This project provided a easy-used carousel plugin.

Usage
-----
1. Import the `bupt.carousel.css` and `bupt.carousel.js`into your page.<br>
```html
<link type="text/css" rel="stylesheet" href="bupt.carousel.css" />
<script type="text/javascript" src="bupt.carousel.js"></script>
```

2. Use the carousel like follow.<br>
```html
  <div id="container"></div>
  <script type="text/javascript">
	var imgs = ['./imgs/1.jpg', './imgs/2.jpg', './imgs/3.jpg', './imgs/4.jpg', './imgs/5.jpg'];
	var params = {
		width: '700px',              //the width of container div
		height: '500px',             //the height of container div
		imgs:imgs,                   //the array of images url
		interval: 300                //control the switching effect, the speed of image slide to next one, value(300-1000, unit: ms)
	};
	carousel.init("container", params);
  </script>
```



Example
----
`example.html` provided an complete example of this carousel plugin.
