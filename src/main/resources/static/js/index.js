$(document).ready(function () {
    index.onload();
});

var $slider = $('.home-slider'),
    oldItem = 0,
    items = $('.slider--item').length,
    clickable = true,
    speed = 1.4;

var msgQueue = [];

var index = {

    onload: function () {
        var item = {'img': '../img/heisenberg.png', 'info': '新婚快乐！！！'};
        $('body').barrager(item);
        item = {'img': '../img/heisenberg.png', 'info': '新婚大吉！！！'};
        $('body').barrager(item);
        var timeStamp = Date.parse(new Date());

        index.loadMsgs();

        index.homeSlide_new();
    },
    loadMsgs: function () {
        var timeStamp = Date.parse(new Date());
        var url = "/loadMsgs";
        var data = {'timeStamp': timeStamp};
        $.ajax({
            "url": url,             // 请求的地址(统一资源定位符)
            "type": "get",          // 请求的方法(get/post/delete/put)
            "data": data,           // 发送给服务器的数据
            "dataType": "json",     // 服务器返回的数据类型
            "success": function (jsonObj) {  // 请求成功后要执行的回调函数
                if (jsonObj && jsonObj.length > 0) {
                    var info = "";
                    var msgId = "";
                    var item = {};
                    for (var i = 0; i < jsonObj.length; i++) {
                        (function (i) {
                            info = jsonObj[i].msg_content;
                            msgId = jsonObj[i].msg_id;
                            var method = 'index.sendMsg(\'' + info + '\',\'' + msgId + '\')';
                            setTimeout(method, 2000 * i);
                        })(i);
                    }
                }
            },
            "error": function (error) {   // 请求失败后要执行的回调函数
            }
        })
        setTimeout('index.loadMsgs()', 30000);
    },
    delMsg: function (msgId) {
        var url = "/delMsg?msgId=" + msgId;
        $.ajax({
            "url": url,             // 请求的地址(统一资源定位符)
            "type": "get",          // 请求的方法(get/post/delete/put)
            "dataType": "json",     // 服务器返回的数据类型
            "success": function (jsonObj) {  // 请求成功后要执行的回调函数
                if (jsonObj == 1) {
                    console.log("删除" + msgId + "成功！");
                }
            },
            "error": function (error) {   // 请求失败后要执行的回调函数
            }
        })
        var divId = '#' + msgId;
        $(divId).remove();
    },
    showMsg: function (jsonObj) {

    },
    clearBarrage: function () {
        $.fn.barrager.removeAll();
    },
    sendMsg: function (info, msgId) {
        var iconList = ['../img/heisenberg.png', '../img/cute.png', '../img/haha.png'];
        var screenHeight = window.screen.height;
        var random = parseInt(Math.random() * 7 + 1, 10);
        var bottom = screenHeight * random / 7;
        var item = {'img': iconList[Math.random() % iconList.length], 'info': info, 'bottom': bottom, 'id': msgId};
        $('body').barrager(item);
    },
    homeSlider: function () {
        var $slider = $('.home-slider'),
            oldItem = 0,
            items = $('.slider--item').length,
            clickable = true,
            speed = 1.4;

        // Dots
        var $dots = $('<div class="slider--dots"></div>').appendTo($slider);
        for (var i = 0; i < items; i++) {
            $('<button class="slider--dot">' + i + '</button>').appendTo($dots);
        }

        // Move
        function sliderGoTo(i) {
            clickable = false;
            $('.slider--item.active, .slider--dot.active').removeClass('active').addClass('next');
            $('.slider--item').eq(i).addClass('active');
            $('.slider--dot').eq(i).addClass('active');

            x = Math.random() * parseInt($(window).width());
            y = Math.random() * parseInt($(window).height());

            TweenLite.fromTo('.slider--item.active path', speed, {
                    scale: 1,
                    x: x,
                    y: y
                },
                {
                    scale: 1000,
                    x: -1500,
                    y: -1500,
                    ease: Power4.easeInOut,
                    onComplete: function () {
                        clickable = true;
                        $('.slider--item.next, .slider--dot.next').removeClass('next');
                    }
                });

            oldItem = i;
        }

        sliderGoTo(0);

        $slider.on('click', '.slider--dot:not(".active")', function () {
            if (clickable) {
                sliderGoTo($(this).text());
            }
            return false;
        }).on('mouseover', '.slider--dot', function () {
            console.log(parseInt($(this).text()));
            $('.slider--item').eq(parseInt($(this).text())).addClass('next');
        }).on('mouseout', '.slider--dot', function () {
            $('.slider--item').eq(parseInt($(this).text())).removeClass('next');
        });

        var swiper = document.querySelector('.home-slider'),
            mc = new Hammer(swiper);

        mc.on('panright', function (ev) {
            if ($('.slider--dot.active').prev().length) {
                $('.slider--dot.active').prev().click();
            } else {
                $('.slider--dot:last').click();
            }
        });
        mc.on('panleft', function (ev) {
            if ($('.slider--dot.active').next().length) {
                $('.slider--dot.active').next().click();
            } else {
                $('.slider--dot:first').click();
            }
        });
    },

    homeSlide_new: function () {

        for (var j = 0; j < items; j++) {
            // (function(j){
            var method = 'index.sliderGoTo(' + j + ')';
            setTimeout(method, 10000);
            // })(j);
        }
        setTimeout('index.homeSlide_new()', 90000);
    },
    sliderGoTo: function (i) {
        clickable = false;
        $('.slider--item.active, .slider--dot.active').removeClass('active').addClass('next');
        $('.slider--item').eq(i).addClass('active');
        $('.slider--dot').eq(i).addClass('active');

        x = Math.random() * parseInt($(window).width());
        y = Math.random() * parseInt($(window).height());

        TweenLite.fromTo('.slider--item.active path', speed, {
                scale: 1,
                x: x,
                y: y
            },
            {
                scale: 1000,
                x: -1500,
                y: -1500,
                ease: Power4.easeInOut,
                onComplete: function () {
                    clickable = true;
                    $('.slider--item.next, .slider--dot.next').removeClass('next');
                }
            });

        oldItem = i;
    }
};