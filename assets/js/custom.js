(function($) {

  "use strict";

  // 1.preloader_10
  // 2.header_10
  // 3.WOW JS
  // 4.footer_6
  // 5.product_6
  // 6.index_6_1(首頁Banner輪播)
  // 7.index_6_4(首頁最新消息輪播)
  // 8.product_info_6_5(產品說明輪播)
  // 9.index_6_8(首頁連結輪播)
  // 10.product_info_6_9(產品案例實績)

  // 00.cookie_6
  // 00.index_6_3(首頁公司簡介數字)



  /* -----------------------------------------------------------------------
     1.preloader_10
     ----------------------------------------------------------------------- */

  // Preloader

  if ($('.preloader_10').length) {
    function stylePreloader() {
      $('body').addClass('preloader-deactive');
    }

    $(window).on('load', function() {
      stylePreloader();
    });
  }



  /* -----------------------------------------------------------------------
     2.header_10
     ----------------------------------------------------------------------- */

  if ($('.header_10').length) {
    // Header Sticky Js
    var varWindow = $(window);
    varWindow.on('scroll', function(event) {
      var scroll = varWindow.scrollTop();
      if (scroll < 100) {
        $(".sticky-header").removeClass("sticky");
      } else {
        $(".sticky-header").addClass("sticky");
      }
      if ($(window).width() < 992) {
        if (scroll < 50) {
          $(".responsive-header").removeClass("sticky");
          $(".header-top").show();
        } else {
          $(".responsive-header").addClass("sticky");
          $(".header-top").hide();
        }
      }
    });

    // Width
    $('[data-width]').each(function() {
      $(this).css('width', $(this).data("width"));
    });
    // Margin Top
    $('[data-margin-top]').each(function() {
      $(this).css('margin-top', $(this).data("margin-top"));
    });
    // Margin Bottom
    $('[data-margin-bottom]').each(function() {
      $(this).css('margin-bottom', $(this).data("margin-bottom"));
    });
    // Padding Top
    $('[data-padding-top]').each(function() {
      $(this).css('padding-top', $(this).data("padding-top"));
    });
    // Padding Bottom
    $('[data-padding-bottom]').each(function() {
      $(this).css('padding-bottom', $(this).data("padding-bottom"));
    });

    // Off Canvas JS
    var canvasWrapper = $(".off-canvas-wrapper");
    $(".btn-menu").on('click', function() {
      canvasWrapper.addClass('active');
      $("body").addClass('fix');
    });

    $(".close-action > .btn-menu-close, .off-canvas-overlay").on('click', function() {
      canvasWrapper.removeClass('active');
      $("body").removeClass('fix');
    });

    //Responsive Slicknav JS
    $('.header_10__main-menu').slicknav({
      appendTo: '.res-mobile-menu',
      allowParentLinks: true,
      closeOnClick: false,
      removeClasses: true,
      closedSymbol: '<i class="fas fa-plus"></i>',
      openedSymbol: '<i class="fas fa-minus"></i>'
    });

    // Menu Activeion Js
    var cururl = window.location.pathname;
    var curpage = cururl.substr(cururl.lastIndexOf('/') + 1);
    var hash = window.location.hash.substr(1);
    if ((curpage == "" || curpage == "/" || curpage == "admin") && hash == "") {} else {
      $(".header-navigation-area li").each(function() {
        $(this).removeClass("active");
      });
      if (hash != "")
        $(".header-navigation-area li a[href*='" + hash + "']").parents("li").addClass("active");
      else
        $(".header-navigation-area li a[href*='" + curpage + "']").parents("li").addClass("active");
    }

    // header搜尋框
    $(".btn-search").on('click', function() {
      $(".btn-search-content").toggleClass("show").focus();
    });


    //手機板搜尋按鈕
    $('.btn-search').on('click', function() {
      $('.responsive-search-content').slideToggle();
    });

    //手機板語言按鈕
    $('.btn-lang').on('click', function() {
      $('.responsive-langauge-wrap').slideToggle();
    });

    //手機板會員按鈕
    $('.btn-member').on('click', function() {
      $('.responsive-member-wrap').slideToggle();
    });

  }



  /* -----------------------------------------------------------------------
     3.WOW JS
     ----------------------------------------------------------------------- */

  if ($('.wow').length) {
    var wow = new WOW({
      mobile: false
    });
    wow.init();
  }



  /* -----------------------------------------------------------------------
     4.footer_6
     ----------------------------------------------------------------------- */

  if ($('.footer_6__scroll-to-top').length) {
    function scrollToTop() {
      var $scrollUp = $('#scroll-to-top'),
        $lastScrollTop = 0,
        $window = $(window);
      $window.on('scroll', function() {
        var st = $(this).scrollTop();
        if (st > $lastScrollTop) {
          $scrollUp.removeClass('show');
        } else {
          if ($window.scrollTop() > 120) {
            $scrollUp.addClass('show');
          } else {
            $scrollUp.removeClass('show');
          }
        }
        $lastScrollTop = st;
      });
      $scrollUp.on('click', function(evt) {
        $('html, body').animate({ scrollTop: 0 }, 50);
        evt.preventDefault();
      });
    }
    scrollToTop();
  }



  /* -----------------------------------------------------------------------
     5.product_6
     ----------------------------------------------------------------------- */

  if ($('.product_6__category-sub-menu').length) {
    // 側欄active判斷自動展開
    $(".product_6__category-sub-menu>ul>li>ul>li").each(function() {
      if ($(this).hasClass('active')) {
        $(this).parent().addClass('show');
        $(this).parent().prev().removeClass('collapsed');
      }
    });
  }

  // 產品放大鏡
  if ($('.zoom-hover').length) {
    $('.zoom-hover').zoom()
  }

  // 產品輪播
  if ($('.single-product-nav-slider2').length) {
    var ProductNav2 = new Swiper('.single-product-nav-slider2', {
      slidesPerView: 4,
      spaceBetween: 10,
      freeMode: true,
    });
    var ProductThumb2 = new Swiper('.single-product-thumb-slider2', {
      freeMode: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true,
      },
      thumbs: {
        swiper: ProductNav2
      }
    });
  }



  /* -----------------------------------------------------------------------
     6.index_6_1(首頁Banner輪播)
     ----------------------------------------------------------------------- */

  if ($('.index_6_1').length) {
    // 首頁banner輪播(電腦)
    if ($('.default-slider-container').length) {
      var carouselSlider = new Swiper('.default-slider-container', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        speed: 1000,
        spaceBetween: 0,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        navigation: {
          nextEl: ".swiper-button-next.index_6_1__next",
          prevEl: ".swiper-button-prev.index_6_1__prev",
        },
      });
    }

    // 首頁banner輪播(手機)
    if ($('.default-slider-container--mb').length) {
      var carouselSlider = new Swiper('.default-slider-container--mb', {
        slidesPerView: 1,
        slidesPerGroup: 1,
        loop: true,
        speed: 1000,
        spaceBetween: 0,
        autoplay: {
          delay: 7000,
          disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          type: 'bullets',
        },
      });
    }

    //背景圖片讀取
    const bgSelector = $("[data-bg-img]");
    bgSelector.each(function(index, elem) {
      let element = $(elem),
        bgSource = element.data('bg-img');
      element.css('background-image', 'url(' + bgSource + ')');
    });
  }



  /* -----------------------------------------------------------------------
     7.index_6_4(首頁最新消息輪播)
     ----------------------------------------------------------------------- */

  // 首頁最新消息
  if ($('.index_6_4__swiper').length) {
    var swiper = new Swiper(".index_6_4__swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      autoplay: true,
      loop:true,
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
        type: 'bullets',
      },
      navigation: {
        nextEl: ".swiper-button-next.index_6_4__next",
        prevEl: ".swiper-button-prev.index_6_4__prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      }
    });
  }



  /* -----------------------------------------------------------------------
     8.product_6_5(產品說明輪播)
     ----------------------------------------------------------------------- */

  // 產品說明輪播
  if ($('.product_info_6_5__swiper').length) {
    var swiper = new Swiper(".product_info_6_5__swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      autoplay: false,
      centeredSlides: true,
      loop:true,
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
        type: 'bullets',
      },
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
        type: 'bullets',
      },
      navigation: {
        nextEl: ".swiper-button-next.product_info_6_5__next",
        prevEl: ".swiper-button-prev.product_info_6_5__prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 1,
        },
        1199: {
          slidesPerView: 1,
        },
      }
    });
  }



  /* -----------------------------------------------------------------------
     9.service_aip_6_3(解決方案輪播)
     ----------------------------------------------------------------------- */

  // 產品說明輪播
  if ($('.service_aip_6_3__swiper').length) {
    var swiper = new Swiper(".service_aip_6_3__swiper", {
      slidesPerView: 1,
      spaceBetween: 15,
      autoplay: false,
      centeredSlides: true,
      loop:true,
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
        type: 'bullets',
      },
      pagination: {
        el: '.swiper-pagination1',
        clickable: true,
        type: 'bullets',
      },
      navigation: {
        nextEl: ".swiper-button-next.service_aip_6_3__next",
        prevEl: ".swiper-button-prev.service_aip_6_3__prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 1,
        },
        991: {
          slidesPerView: 1,
        },
        1199: {
          slidesPerView: 1,
        },
      }
    });
  }



  /* -----------------------------------------------------------------------
     index_6_6(目前沒有)
     ----------------------------------------------------------------------- */

  if ($('.index_6_6__swiper').length) {
    // 首頁消息輪播
    var swiper = new Swiper(".index_6_6__swiper", {
      slidesPerView: 3,
      spaceBetween: 15,
      centeredSlides: true,
      loop: true,
      // autoplay:true,
      pagination: {
        el: ".swiper-pagination6",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next.index_6_6__next",
        prevEl: ".swiper-button-prev.index_6_6__prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 2,
          centeredSlides: true,
        },
        992: {
          slidesPerView: 3,
          centeredSlides: true,
        },
      }
    });
  }



  /* -----------------------------------------------------------------------
     9.index_6_8(首頁連結輪播)
     ----------------------------------------------------------------------- */

  // 首頁連結輪播
  if ($('.index_6_8__swiper').length) {
    var swiper = new Swiper(".index_6_8__swiper", {
      slidesPerView: 5,
      spaceBetween: 30,
      autoplay: true,
      loop:true,
      pagination: {
        el: ".swiper-pagination8",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next.index_6_8__next",
        prevEl: ".swiper-button-prev.index_6_8__prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        375: {
          slidesPerView: 2,
        },
        767: {
          slidesPerView: 3,
        },
        991: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
      }
    });
  }



  /* -----------------------------------------------------------------------
     10.product_info_6_9(產品案例實績)
     ----------------------------------------------------------------------- */

  // 產品案例實績
  if ($('.product_info_6_9__swiper').length) {
    var swiper = new Swiper(".product_info_6_9__swiper", {
      slidesPerView: 4,
      spaceBetween: 30,
      autoplay: false,
      loop:true,
      pagination: {
        el: '.swiper-pagination2',
        clickable: true,
        type: 'bullets',
      },
      navigation: {
        nextEl: ".swiper-button-next.product_info_6_9__next",
        prevEl: ".swiper-button-prev.product_info_6_9__prev",
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        600: {
          slidesPerView: 1,
        },
        767: {
          slidesPerView: 2,
        },
        991: {
          slidesPerView: 3,
        },
      }
    });
  }




  /* ==================================================
     00. cookie_6
  ===============================================*/
  $('.cookie_6 .btn-all').on('click', function() {
    $('.cookie_6').fadeOut(300);
  });



  /* ==================================================
     00. index_6_3(首頁公司簡介數字)
  ===============================================*/
    $(".counter").counterUp({
        delay: 5,
        time: 4000
    });



  // 測試特效用
  // if ($("#scene").length > 0) {
  //   new Parallax(document.getElementById('scene
  // }


  
  


})(window.jQuery);