mySwiper = new Swiper('.swiper-container', {
  direction: 'vertical',
  pagination: '.swiper-pagination',
  mousewheelControl: true,
  followFinger: false,
  observer: true,
  observeParents: true,
  //threshold: 50,
  onInit: function(swiper) {
    swiperAnimateCache(swiper);
    swiperAnimate(swiper);
  },
  onSlideChangeEnd: function(swiper) {
    swiperAnimate(swiper);//每个slide切换结束时也运行当前slide动画
  }
});

(function(doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      docEl.style.fontSize = 100 * (clientWidth / 375) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

window.onload = function() {
  document.getElementById('main').style.display = 'none';
};

$(function() {
  var audio = document.getElementById('audio');
  audio.src = "media/music.mp3";
  audio.loop = true; //歌曲循环
  function autoPlayAudio1() {
    wx.config({
      debug: false,
      appId: '',
      timestamp: 1,
      nonceStr: '',
      signature: '',
      jsApiList: []
    });
    wx.ready(function() {
      document.getElementById('audio').play();
    });
  }

  autoPlayAudio1();

  var musicFlag = true;//音乐是否暂停
  var self = this;
//失去焦点
  var onBlurHandler = function() {
    if (!self.isActivate) {
      return;
    }
    self.isActivate = false;
    document.getElementById('audio').pause();
    $('#music-icon').attr('src', 'img/music-close.png');
  };
//激活
  var onFocusHandler = function() {
    if (self.isActivate) {
      return;
    }
    self.isActivate = true;
    if (musicFlag == true) {
      document.getElementById('audio').play();
      $('#music-icon').attr('src', 'img/music-open.png');
    } else {
      document.getElementById('audio').pause();
      $('#music-icon').attr('src', 'img/music-close.png');
    }
  };

  var handleVisibilityChange = function() {
    if (!document[hidden]) {
      onFocusHandler();
    }
    else {
      onBlurHandler();
    }
  };

  window.addEventListener("focus", onFocusHandler, false);
  window.addEventListener("blur", onBlurHandler, false);

  var hidden, visibilityChange;
  if (typeof document.hidden !== "undefined") {
    hidden = "hidden";
    visibilityChange = "visibilitychange";
  } else if (typeof document["mozHidden"] !== "undefined") {
    hidden = "mozHidden";
    visibilityChange = "mozvisibilitychange";
  } else if (typeof document["msHidden"] !== "undefined") {
    hidden = "msHidden";
    visibilityChange = "msvisibilitychange";
  } else if (typeof document["webkitHidden"] !== "undefined") {
    hidden = "webkitHidden";
    visibilityChange = "webkitvisibilitychange";
  } else if (typeof document["oHidden"] !== "undefined") {
    hidden = "oHidden";
    visibilityChange = "ovisibilitychange";
  }
  if ("onpageshow" in window && "onpagehide" in window) {
    window.addEventListener("pageshow", onFocusHandler, false);
    window.addEventListener("pagehide", onBlurHandler, false);
  }
  if (hidden && visibilityChange) {
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }
  //打字效果
  var s = '工作计划书';
  var con = $('.plan');
  var index = 0;
  var length = s.length;
  var tId = null;

  function start() {
    con.text('');
    tId = setInterval(function() {
      con.append(s.charAt(index));
      if (index++ === length) {
        clearInterval(tId);
        index = 0;
        start();
      }
    }, 300);
  }

  start();
  //阻止长按
  $('.swiper_cover')
    .on('touchstart', function(e) {
      e.preventDefault();
    });
  /*音乐*/
  $('#music').height($('.music').width());
  var music = $('#music');
  music.on('touchstart', function(e) {
      if (audio.paused) {
        audio.play();
        musicFlag = true;
        $('.music').attr('src', 'img/music-open.png')
      } else {
        audio.pause();
        musicFlag = false;
        $('.music').attr('src', 'img/music-close.png')
      }
      e.preventDefault();
    });
  /*蒙层*/
  $('#share').height($('.share').width() * 2);
  $('#share').on('touchstart', function(e) {
    $('.mask').show();
    mySwiper.lockSwipes();
    return false;
    e.preventDefault();
  });
  $('.mask').on('touchstart', function(e) {
    $('.mask').hide();
    mySwiper.unlockSwipes();
    e.preventDefault();
  });
  /*购买*/
  var shop = $('.swiper-slide8 .shop');
  shop.height($('.shop').width() * 0.8);
  shop.on('touchstart', function(e) {
    window.location.href = 'http://mallapi.bluemoon.com.cn/webApp/#/home';
    e.preventDefault();
  });
})