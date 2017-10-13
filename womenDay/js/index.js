$(function() {
  var button = $('.button'),
    button1 = $('.button1'),
    button2 = $('.button2'),
    flower = $('.flower'),
    cover = $('.cover'),
    ling = $('.ling'),
    mask = $('#mask'),
    handTop = $('.handTop'),
    handBottm = $('.handBottm'),
    content = $('.content'),
    win = $(window),
    load = $('.load'),
    lingContent = $('.ling-content'),
    container = $('.container'),
    product = $('.product'),
    again = $('.again'),
    share = $('.share'),
    code = $('.code'),
    arrow = $('.arrow'),
    flag = true,
    perAngle = 22.5,
    position,
    ButtonTimer,
    handTimer,
    angles;
  load.hide();
  container.show();
  mask.css({'width': win.width(), 'left': (container.width() - win.width()) / 2});
  product.css({'width': win.width() / 2, 'left': (container.width() - win.width()) / 2});
  code.css({'width': win.width() / 2, 'left': container.width() / 2});
  /*音乐*/
  var audio = document.getElementById('audio');

  /*微信分享，自动播放音乐*/
  $.ajax({
    url: 'http://h5pf.xykjg.com/gamesServer/wx/getSignature',
    type: 'post',
    data: JSON.stringify({'url': window.location.href}),
    contentType: 'application/json',
    success: function(data) {
      wx.config({
        debug: false,
        appId: data.appId,
        timestamp: data.timestamp,
        nonceStr: data.nonceStr,
        signature: data.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ']
      });
    }
  });

  var title = '今天我最大，我有旨令下';
  var desc = '不求你三生三世，只愿你今日能许我这件事';
  var link = 'http://h5.xykjg.com/womenDay/?_campaign=womenDay&_adTag=prd';
  var imgUrl = 'http://h5.xykjg.com/womenDay/images/link.png';

  wx.ready(function() {
    document.getElementById('audio').play();
    wx.onMenuShareAppMessage({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl// 分享图标
    });
    wx.onMenuShareTimeline({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl // 分享图标
    });
    wx.onMenuShareQQ({
      title: title, // 分享标题
      desc: desc, // 分享描述
      link: link, // 分享链接
      imgUrl: imgUrl // 分享图标
    });
  });

  var musicFlag = true;//音乐是否暂停
  var self = this;
//失去焦点
  var onBlurHandler = function() {
    if (!self.isActivate) {
      return;
    }
    self.isActivate = false;
    audio.pause();
    $('.music-btn').attr('src', 'images/music-close.png');
  };
//激活
  var onFocusHandler = function() {
    if (self.isActivate) {
      return;
    }
    self.isActivate = true;
    if (musicFlag == true) {
      audio.src = "media/17.mp3";
      audio.loop = true; //歌曲循环
      audio.play();
      $('.music-btn').attr('src', 'images/music-open.png');
    } else {
      document.getElementById('audio').pause();
      $('.music-btn').attr('src', 'images/music-close.png');
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

  /*点击关闭/开启音乐*/
  $('.music-btn').on('touchstart', function(e) {
    if (audio.paused) {
      audio.play();
      musicFlag = true;
      $('.music-btn').addClass('active').attr('src', 'images/music-open.png')
    } else {
      audio.pause();
      musicFlag = false;
      $('.music-btn').removeClass('active').attr('src', 'images/music-close.png')
    }
    e.preventDefault();
  });


  /*手指效果切换*/
  function handToggle(obj, run) {
    var hand1 = obj.find('.hand1');
    var hand2 = obj.find('.hand2');
    var toggle;
    clearInterval(handTimer);
    handTimer = setInterval(function() {
      if (run) {
        if (toggle) {
          hand1.show();
          hand2.hide();
        } else {
          hand2.show();
          hand1.hide();
        }
        toggle = !toggle;
      }
    }, 500);
  }

  /*按钮效果切换*/
  buttonToggle();
  function buttonToggle() {
    var toggle;
    clearInterval(ButtonTimer);
    ButtonTimer = setInterval(function() {
      if (toggle) {
        button.addClass('active');
      } else {
        button.removeClass('active');
      }
      toggle = !toggle;
    }, 400);
  }

  /*转动转盘*/
  button.on('click', function(e) {
    if (flag) {
      flag = false;
      clearInterval(ButtonTimer);
      button.addClass('active');
      cover.addClass('active');
      setTimeout(function() {
        button.removeClass('active');
      }, 400);
      var num = 0;
      //随机生成1-16的奇数
      while (num % 2 == 0) {
        num = parseInt(Math.random() * 16) + 1;
      }
      ;
      //转动角度
      angles = 'rotate(' + (num * perAngle + 720) + 'deg' + ')';
      flower.css({'transform': angles, '-webkit-transform': angles}).addClass('active');
      //转到哪个令
      position = num * perAngle / 22.5;
      setTimeout(function() {
        //令显示
        ling.addClass('active');
      }, 2200);
      setTimeout(function() {
        button.css('z-index', '2');
        //蒙层，手指显示
        mask.show();
        handTop.show();
        handToggle(handTop, true);
      }, 3300);
      e.preventDefault();
    }
  });
  /*令展开*/
  handTop.on('touchstart', function(e) {
    handTop.hide();
    handToggle(handTop, false);
    ling.hide();
    $('.open1').show();
    setTimeout(function() {
      $('.open2').show();
      $('.open1').hide();
    }, 200);
    setTimeout(function() {
      $('.open3').show();
      $('.open2').hide();
      //展示令内容
      showLing(position);
      lingContent.addClass('fadeIn1');
      //商城，二维码展示
      product.addClass('fadeIn2');
      code.addClass('fadeIn2');
      again.addClass('fadeIn2');
      share.addClass('fadeIn2');
    }, 400);
    setTimeout(function() {
      handBottm.show();
      handToggle(handBottm, true);
    }, 2400);
    e.preventDefault();
  });

  /*在玩一次*/
  again.on('touchstart', function(e) {
    cover.removeClass('active');
    button.css('z-index', '10');
    lingContent.removeClass('fadeIn1');
    product.removeClass('fadeIn2');
    code.removeClass('fadeIn2');
    again.removeClass('fadeIn2');
    share.removeClass('fadeIn2');
    $('.open3').hide();
    mask.hide();
    handBottm.hide();
    handToggle(handBottm, false);

    ling.show().removeClass('active');
    arrow.hide();
    flag = true;
    flower.removeClass('active').css({'transform': 'rotate(0deg)', '-webkit-transform': 'rotate(0deg)'});
    buttonToggle();
    e.preventDefault();
  });

  /*分享*/
  share.on('touchstart', function(e) {
    arrow.show();
    e.preventDefault();
  });

  /*展示令内容*/
  function showLing(position) {
    switch (position) {
      //兰花令
      case 1:
        lingUrl('lanhua');
        break;
      //荷花令
      case 3:
        lingUrl('hehua');
        break;
      //梅花令
      case 5:
        lingUrl('meihua');
        break;
      //水仙令
      case 7:
        lingUrl('shuixian');
        break;
      //月季令
      case 9:
        lingUrl('yueji');
        break;
      //茶花令
      case 11:
        lingUrl('chahua');
        break;
      //杜鹃令
      case 13:
        lingUrl('dujuan');
        break;
      //菊花令
      case 15:
        lingUrl('juhua');
        break;
    }
    ;
  }

  function lingUrl(str) {
    lingContent.css({
      'background': 'url("images/' + str + '.png")',
      'background-size': '100%',
      '-webkit-background-size': '100%'
    });
  }

  /*阻止长按*/
  $('.content_cover')
    .on('touchstart', function(e) {
      e.preventDefault();
    });


});