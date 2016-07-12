
$(document).ready(function(){
	
	// set tab
	(function(){
		
		/*
			需要很清楚代码的执行顺序，和触发代码执行的条件!!!
			
			w：表示操作完（点击切换或缩放后）的可视区的宽度
			h：表示操作完（点击切换或缩放后）的可视区的高度
			l：轮播图的个数
			c：记录每次点击完切换后的iNow值
			s：表示轮播图中文字和按钮的缩放系数
			
			要点1：什么情况下需要修正left值 ? 
				  每次点击了切换图片按钮后，.wrap 会发生一个left值的改变，不难理解，此时，如果再进行缩放操作，必须修正left值的大小。
				  原因：每次缩放会重新定义.wrap 的整体宽度和高度，不修正的话，left值就是缩放前窗口的宽度，这个值过大或过小，都会导致.wrap不能出现在正常的位置上。

		*/
		
		var w = h = c = 0;
		var s = 0.8;
		var l = $('.swiper .tab').length;
		
		setTab();
		
		w = setTab().a;
		h = setTab().b;
		
		$(window).resize(function(){
			/*
				这里的代码仅在调整了浏览器窗口大小后，才触发：
					1、更新可视区宽高的值
					2、对轮播区的left值进行修正
					3、优化每个轮播图中的文字和按钮 (可选)
			*/
			setTab();
			w = setTab().a;
			h = setTab().b;
			$('.swiper .wrap').css('left',-c*w);	// left 修正
		});
		
		function setTab(){
			w = $(window).width();
			h = $(window).height();
			$('.swiper').css({'width': w, 'height': h});
			$('.swiper .wrap .tab').css({'width': w, 'height': h});
			$('.swiper .wrap').css({'width': w*l, 'height': h});
			return { a: w, b: h};	// 无论是否调整了浏览器窗口大小，返回值始终是最新的可视区的宽高
		}
		
		
		var iNow = 0;
		$('.swiper .next').click(function(){
			//console.log(w,h)
			if(iNow == l-1){
				iNow = 0;
			}
			else{
				iNow++;
			}
			c = iNow;
			$('.swiper .wrap').stop().animate({'left': -w*iNow}, 200);
			$('.swiper .page-now a').removeClass('active');
			$('.swiper .page-now a').eq(iNow).addClass('active');
		});
		
		$('.swiper .prev').click(function(){
			if(iNow == 0){
				iNow = l-1;
			}
			else{
				iNow--;
			}
			c = iNow;
			$('.swiper .wrap').stop().animate({'left': -w*iNow}, 200);
			$('.swiper .page-now a').removeClass('active');
			$('.swiper .page-now a').eq(iNow).addClass('active');
		});
		
		$('.swiper .page-now a').each(function(index){
			$(this).click(function(){
				$(this).parent().children().removeClass('active');
				$(this).addClass('active');
				$('.swiper .wrap').stop().animate({'left': -w*index}, 200);
			})
		});
	
	})();
	
	
	// problem hover
	(function(){
		$('#problem li').each(function(i){
			$(this).mouseover(function(){
				$(this).find('.hover-before').hide();
				$(this).find('.hover-after').show();	
			})
			$(this).mouseout(function(){
				$(this).find('.hover-before').show();
				$(this).find('.hover-after').hide();	
			})
		})	
	})();
	
	// scroll 
	(function(){
		$(window).scroll(function(){
			var $iTop = $(document).scrollTop();
			if($iTop >= 4){
				$('#header .nav-down').css('background','#fff');
				$('#header .main-nav a').css('color','#000');
				$('#header .nav-down a').hover(function(){
					$(this).css('color','blue') 
				},function(){
					$(this).css('color','black') 
				});
			}
			else{
				$('#header .nav-down').css('background','transparent');
				$('#header .main-nav a').css('color','#fff');
				$('#header .nav-down a').hover(function(){
					$(this).css('color','blue') 
				},function(){
					$(this).css('color','#fff') 
				});		
			}
		});
	})();
		
});