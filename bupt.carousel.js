(function(){
	var carousel = {};
	//build the ui
	carousel.ui = function(id, params){
		var $wrapContainer = document.getElementById(id);
		$wrapContainer.className = "ui-bupt-carousel-container";
		var $wrapWidth = parseInt(params.width) || 600;
		var $wrapHeight = parseInt(params.height) || 400;
		$wrapContainer.style.width = $wrapWidth + 'px';
		$wrapContainer.style.height = $wrapHeight + 'px';
		var $imgs = params.imgs || [];
		var len=$imgs.length;
		$wrapContainer.className = "ui-bupt-carousel-container";
		var html = '<div class="ui-bupt-carousel-imgWrap">';
		html += '<img alt="'+len+'" src="'+$imgs[len-1]+'" />';
		for(var i=0; i<len; i++){
			html += '<img alt="'+(i+1)+'" src="'+$imgs[i]+'" />';
		}
		html += '<img alt="'+1+'" src="'+$imgs[0]+'" /></div>';
		html += '<div class="ui-bupt-carousel-imgButtons">';
		for(var i=0; i<len; i++){
			if(i==0){
				html += '<span index="'+(i+1)+'" class="ui-bupt-carousel-active"></span>';
			}else{
				html += '<span index="'+(i+1)+'" class=""></span>';
			}
		}
		html += '</div>';
		html += '<a href="javascript:;" id="ui-bupt-carousel-prev" class="ui-bupt-carousel-arrow"><</a>';
		html += '<a href="javascript:;" id="ui-bupt-carousel-next" class="ui-bupt-carousel-arrow">></a>';
		$wrapContainer.innerHTML = html;
		var $list = document.getElementsByClassName('ui-bupt-carousel-imgWrap')[0];
		//set container size and position
		$list.style.width = ((len+2)*$wrapWidth)+'px';
		$list.style.height = ($wrapHeight)+'px';
		$list.style.left = (-$wrapWidth)+'px';
		var $images = document.getElementsByTagName('img');
		for(var i=0,size=$images.length; i<size; i++){
			$images[i].style.width = $wrapWidth + 'px';
			$images[i].style.height = $wrapHeight + 'px';
		}
	}	

	//click next or prev button, switch the image
	carousel.switch = function(id, params){
		var $wrapContainer = document.getElementById(id);
		var $offset = $wrapContainer.offsetWidth;
		var $list = document.getElementsByClassName('ui-bupt-carousel-imgWrap')[0];
		var $btnsContainer = document.getElementsByClassName('ui-bupt-carousel-imgButtons')[0];;
		var $btns = document.getElementsByTagName('span');
		var $prev = document.getElementById('ui-bupt-carousel-prev');
		var $next = document.getElementById('ui-bupt-carousel-next');
		var $imgs = params.imgs || [];
		var iLen = $imgs.length;
		var $interval = params.interval || 300;					//control the effect of animation
		var inx = 1;
		var animated = false;
		var timer;
		//control the buttons show effectss
		function showButton(){
			for(var i=0, size=$btns.length; i<size; i++){
				if($btns[i].className == 'ui-bupt-carousel-active'){
					$btns[i].className = '';
					break;
				}
			}
			$btns[inx-1].className = 'ui-bupt-carousel-active';
		}
		//the animation of switch
		function animate(offset){
			animated = true;
			var $step = offset/($interval/5);
			var startInx = -parseInt($offset);
			var endInx = startInx*iLen;
			var newLeft = parseInt($list.style.left) + offset;
			function go(){
				if(($step<0 && parseInt($list.style.left)>newLeft) || ($step>0 && parseInt($list.style.left)<newLeft)){
					$list.style.left = parseInt($list.style.left) + $step +'px';
					setTimeout(go, 5);
				}else{
					animated = false;
					$list.style.left = newLeft + 'px';
					if(newLeft > startInx){
						$list.style.left = endInx + 'px';
					}
					if(newLeft < endInx){
						$list.style.left = startInx + 'px';
					}
				}
			}
			go();
		}
		//auto play function
		function play(){
			if($interval > 1000){
				$interval = 1000;
			}
			if($interval < 300){
				$interval = 300;
			}
			timer = setInterval(function(){
				$next.onclick();
			}, 5000);
		}
		//stop auto play
		function stop(){
			clearInterval(timer);
		}
		//switch to prev image
		$prev.onclick = function(){
			inx--;
			if(inx < 1){
				inx = iLen;
			}
			showButton();
			if(!animated){
				animate($offset);
			}
		}
		//switch to next image
		$next.onclick = function(){
			inx++;
			if(inx > iLen){
				inx = 1;
			}
			showButton();
			if(!animated){
				animate(-$offset);
			}
		}
		//click the button to switch image
		$btnsContainer.onclick = function(e){
			var that = e.target;
			if(that.className == 'ui-bupt-carousel-active'){
				return;
			}
			var index = parseInt(that.getAttribute('index'));
			var offset = -$offset*(index-inx);
			inx = index;
			showButton();
			if(!animated){
				animate(offset);
			}
		}
		//add and run auto play function
		$wrapContainer.onmouseover = stop;
		$wrapContainer.onmouseout = play;
		play();
	}

	//init carousel
	carousel.init = function(id, params){
		carousel.ui(id, params);
		carousel.switch(id, params);
	}
	window.carousel = carousel;
})();