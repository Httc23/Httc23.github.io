
/* -----------------------------------------------------------------------
  產品主選單黏住
----------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function() {

  // ==========================================
  // 0. 基本變數設定
  // ==========================================
  const mainHeaderHeight = 80; // 上方藍色主選單的高度
  const subNavHeight = 60;     // 紅框導覽列的高度
  const totalOffset = mainHeaderHeight + subNavHeight; // 總共要扣掉的高度
  
  // 🔒 定義一個「鎖」，防止點擊時 Scroll 事件干擾
  let isClicking = false; 

  // 選取元素
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-item");
  const navContainer = document.querySelector('.nav-container'); // 捲動容器
  const tracker = document.querySelector('.nav-tracker'); // 👻 滑動方塊

  // ==========================================
  // 🛠️ 工具函式：移動灰色背景方塊
  // ==========================================
  function moveTracker(targetItem) {
      if (!tracker || !targetItem) return;
      const left = targetItem.offsetLeft;
      const width = targetItem.offsetWidth;
      tracker.style.left = left + "px";
      tracker.style.width = width + "px";
      tracker.style.opacity = "1"; // 確保它是顯示的
  }

  // ==========================================
  // 🛠️ 工具函式：讓選單橫向捲動置中
  // ==========================================
  function centerNavItem(item) {
      if (!navContainer) return;
      
      const itemLeft = item.offsetLeft;
      const itemWidth = item.offsetWidth;
      const containerWidth = navContainer.offsetWidth;
      
      // 計算置中位置
      const scrollPosition = itemLeft - (containerWidth / 2) + (itemWidth / 2);

      navContainer.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
      });
  }

  // 🚀 初始化：網頁剛載入時，先滑到目前的 active 項目
  const initialActive = document.querySelector('.nav-item.active');
  if (initialActive) {
      // 延遲一點點執行，確保 CSS 載入完畢
      setTimeout(() => moveTracker(initialActive), 100);
  }

  // ==========================================
  // 🖱️ 1. Click 事件 (點擊時)
  // ==========================================
  navItems.forEach(item => {
      item.addEventListener("click", function(e) {
          e.preventDefault(); // 阻止預設跳轉

          // 🔒 上鎖！告訴 Scroll 事件：「我正在手動點擊，你先閉嘴」
          isClicking = true;

          // --- 視覺更新 ---
          navItems.forEach(nav => nav.classList.remove("active"));
          this.classList.add("active");
          
          moveTracker(this);   // 1. 灰塊滑過去
          centerNavItem(this); // 2. 選單捲過去

          // --- 網頁捲動 ---
          const targetId = this.getAttribute("data-target");
          const targetSection = document.getElementById(targetId);

          if (targetSection) {
              const elementPosition = targetSection.offsetTop;
              const offsetPosition = elementPosition - totalOffset;

              window.scrollTo({
                  top: offsetPosition,
                  behavior: "smooth"
              });
          } else {
              console.error("找不到 ID 為 " + targetId + " 的區塊");
          }

          // 🔓 解鎖：1秒後解鎖 (通常平滑捲動不會超過1秒)
          setTimeout(() => {
              isClicking = false;
          }, 1000);
      });
  });

  // ==========================================
  // 📜 2. Scroll 事件 (滑動時)
  // ==========================================
  window.addEventListener("scroll", function() {
      // 🔒 如果正在「點擊跳轉中」，就直接略過 Scroll 監聽
      if (isClicking) return;

      let current = "";
      const scrollY = window.scrollY;
      
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          // 判斷邏輯
          if (scrollY >= (sectionTop - totalOffset - 20)) {
              current = section.getAttribute("id");
          }
      });

      if (current) {
          navItems.forEach(item => {
              // 只在「狀態改變」且「還沒變 active」的時候執行 (節省效能)
              if (item.getAttribute("data-target") === current && !item.classList.contains('active')) {
                  
                  // 更新 Active
                  navItems.forEach(nav => nav.classList.remove("active"));
                  item.classList.add("active");

                  // 連動效果
                  moveTracker(item);   // 灰塊跟隨
                  centerNavItem(item); // 選單跟隨
              }
          });
      }
  });

});


/* -----------------------------------------------------------------------
  Number Counter
----------------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 數字動畫程式 (慢速精確版) 已啟動！");

  const counters = document.querySelectorAll('.counter');
  
  // ==========================================
  // ⚙️ 設定區
  // ==========================================
  const duration = 1500; // 動畫總時間 (毫秒)，設 2000 = 2秒，您可以改長一點
  const frameRate = 10;  // 每 10ms 更新一次 (比之前更細膩)
  // ==========================================

  if (counters.length === 0) return;

  const animate = (counter) => {
      // 1. 取得目標數字
      const rawTarget = counter.getAttribute('data-target');
      const targetValue = parseInt(rawTarget.replace(/[^\d]/g, ''), 10);
      
      // 2. 取得「內部」目前的浮點數進度 (如果沒有就從 0 開始)
      // 我們把這個暫存值藏在 data-current 屬性裡，才不會跟畫面顯示的整數打架
      let currentValue = parseFloat(counter.getAttribute('data-current')) || 0;

      // 3. 計算每次加多少 (總量 / 總幀數)
      // 這樣不管數字是 14 還是 80000，都會跑一樣久
      const totalFrames = duration / frameRate;
      const increment = targetValue / totalFrames;

      if (currentValue < targetValue) {
          // 核心修改：允許小數點累加 (例如 0.14 + 0.14 ...)
          currentValue += increment;
          
          // 防止加過頭
          if (currentValue > targetValue) currentValue = targetValue;

          // 記錄目前的精確進度
          counter.setAttribute('data-current', currentValue);

          // ⭐️ 顯示時，只顯示整數 (Math.floor)
          counter.innerText = Math.floor(currentValue);
          
          // 繼續下一幀
          setTimeout(() => animate(counter), frameRate); 
      } else {
          // 確保最後顯示目標值
          counter.innerText = targetValue; 
      }
  }

  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              const counter = entry.target;
              
              // 開始跑動畫
              animate(counter);
              
              // 跑過一次就不再偵測
              observer.unobserve(counter); 
          }
      });
  }, { 
      // ⭐️ 關鍵修改：改成 0.8
      // 代表區塊要露出 80% (幾乎在畫面中間) 才會開始跑
      // 這樣保證您眼睛已經看過去了
      threshold: 0.8 
  });

  counters.forEach(counter => {
      // 初始化
      counter.style.border = "none";
      const target = counter.innerText;
      counter.setAttribute('data-target', target);
      counter.innerText = '0';
      counter.setAttribute('data-current', '0'); // 初始化內部計數器
      observer.observe(counter);
  });
});


(function($) {

  "use strict";


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


})(window.jQuery);