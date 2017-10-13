/**
 * Created by zhengguorong on 2016/11/9.
 */


//设计图宽高比
var designwhScale = 320/504;
//现窗口宽高比
var curwhScale = document.documentElement.clientWidth/document.documentElement.clientHeight;
var resizes = document.querySelectorAll('.resize');

//外层容器定位
var swiperContainer = document.querySelector('.container');
var containerWidth = 320;
var containerHeight = 504;
var containerTop = 0;
var containerLeft = 0;
if (curwhScale < designwhScale) {
  containerWidth = document.documentElement.clientWidth;
  containerHeight = document.documentElement.clientHeight;
  // containerHeight = document.documentElement.clientWidth / designwhScale
  containerTop = (document.documentElement.clientHeight - containerHeight)/2;
}else {
  containerWidth = document.documentElement.clientHeight * designwhScale;
  containerHeight = document.documentElement.clientHeight;
  containerLeft = (document.documentElement.clientWidth - containerWidth)/2;
}
swiperContainer.style.width = containerWidth+ 'px';
swiperContainer.style.height = containerHeight+ 'px';
swiperContainer.style.left = containerLeft+ 'px';
swiperContainer.style.top = containerTop+ 'px';

//放大比例
var scale = containerWidth / 320;
//元素缩放
for (var j = 0; j < resizes.length; j++) {
  resizes[j].style.width = parseInt(resizes[j].style.width) * scale + 'px';
  resizes[j].style.height = parseInt(resizes[j].style.height) * scale + 'px';
  resizes[j].style.left = parseInt(resizes[j].style.left) * scale + 'px';
  resizes[j].style.top = parseInt(resizes[j].style.top) * scale + 'px';
  resizes[j].style.bottom = parseInt(resizes[j].style.bottom) * scale + 'px';
  resizes[j].style.right = parseInt(resizes[j].style.right) * scale + 'px';
}

