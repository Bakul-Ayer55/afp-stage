$(function () {
  var header = $('.header');
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();

    if (scroll >= 10) {
      header.addClass('header-sticky');
    } else {
      header.removeClass('header-sticky');
    }
  });
});

AOS.init({
  duration: 500,
  easing: 'ease-out-quart',
  once: true,
});

$('.hero__carousel').owlCarousel({
  loop: true,
  margin: 0,
  nav: true,
  dots: false,
  drag: false,
  items: 1,
  animateOut: 'fadeOut',
  autoplay: true,
  responsive: {
    0: {
      items: 1,
    },
  },
});

$('.realisaties__slider').owlCarousel({
  loop: false,
  margin: 24,
  nav: true,
  dots: false,
  drag: false,
  stagePadding: 100,
  autoplay: true,
  items: 2,
  responsive: {
    0: {
      items: 1,
      stagePadding: 15,
      margin: 12,
    },
    768: {
      items: 2,
      stagePadding: 30,
    },
    1200: {
      items: 2,
    },
    1600: {
      stagePadding: 130,
    },
  },
});

$('.history__slider').owlCarousel({
  loop: false,
  margin: 24,
  nav: false,
  dots: true,
  drag: false,
  stagePadding: 170,
  autoplay: false,
  items: 2,
  responsive: {
    0: {
      items: 1,
      stagePadding: 30,
    },
    768: {
      items: 2,
      stagePadding: 30,
    },
    1200: {
      items: 2,
    },
    1600: {
      stagePadding: 130,
    },
  },
});

$('.step__slider').owlCarousel({
  loop: false,
  margin: 48,
  nav: false,
  dots: true,
  drag: false,
  stagePadding: 70,
  autoplay: false,
  items: 2,
  responsive: {
    0: {
      items: 1,
      stagePadding: 30,
    },
    768: {
      items: 2,
      stagePadding: 20,
    },
    1200: {
      items: 2,
    },
    1600: {
      stagePadding: 100,
    },
  },
});

$(document).ready(function () {
  $('#menuHumburger').click(function () {
    $(this).toggleClass('open');
    $('body').toggleClass('menu-open');
    $('body').toggleClass('menu-not-open');
  });
});

$(document).ready(function () {
  $('.navbar-toggler').click(function () {
    $(this).toggleClass('open');
    $('body').toggleClass('menu-open');
    //$("body").toggleClass("menu-not-open");
  });
});

$(document).ready(function () {
  $('#menuCls').click(function () {
    $(this).removeClass('open');
    $('body').removeClass('menu-open');
    $('body').removeClass('menu-not-open');
  });
});

// setTimeout(function() {
// 	$('body').addClass('preloader-disable');
// }, 3000);

$('.menu__drop__btn').click(function () {
  $('.nav__menu__item').removeClass('active');
  $(this).addClass('active');
});

$('.menu__items__ttl').click(function () {
  if (!$(this).hasClass('active')) {
    $('.menu__items__ttl.active').removeClass('active');
    $(this).addClass('active');
  }
});

$(document).ready(function () {
  loadSvgImages();
});

function loadSvgImages() {
  $('img.svg').each(function () {
    var $img = $(this);
    var imgID = $img.attr('id');
    var imgClass = $img.attr('class');
    var imgURL = $img.attr('src');
    if (typeof imgURL == 'undefined' || imgURL == '') {
      imgURL = $img.attr('mentall-data-src');
    }
    $.get(
      imgURL,
      function (data) {
        var $svg = $(data).find('svg');
        if (typeof imgID !== 'undefined') {
          $svg = $svg.attr('id', imgID);
        }
        if (typeof imgClass !== 'undefined') {
          $svg = $svg.attr('class', imgClass + ' replaced-svg');
        }
        $svg = $svg.removeAttr('xmlns:a');
        $img.replaceWith($svg);
      },
      'xml'
    );
  });
}

/** Parallax **/

/**
 * MARQUEE
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.Marquee3k = factory();
  }
})(this, function () {
  'use strict';

  class Marquee3k {
    constructor(element, options) {
      this.element = element;
      this.selector = options.selector;
      this.speed = element.dataset.speed || 0.25;
      this.pausable = element.dataset.pausable;
      this.reverse = element.dataset.reverse;
      this.paused = false;
      this.parent = element.parentElement;
      this.parentProps = this.parent.getBoundingClientRect();
      this.content = element.children[0];
      this.innerContent = this.content.innerHTML;
      this.wrapStyles = '';
      this.offset = 0;

      this._setupWrapper();
      this._setupContent();
      this._setupEvents();

      this.wrapper.appendChild(this.content);
      this.element.appendChild(this.wrapper);
    }

    _setupWrapper() {
      this.wrapper = document.createElement('div');
      this.wrapper.classList.add('marquee3k__wrapper');
      this.wrapper.style.whiteSpace = 'nowrap';
    }

    _setupContent() {
      this.content.classList.add(`${this.selector}__copy`);
      this.content.style.display = 'inline-block';
      this.contentWidth = this.content.offsetWidth;

      this.requiredReps =
        this.contentWidth > this.parentProps.width
          ? 2
          : Math.ceil(
              (this.parentProps.width - this.contentWidth) / this.contentWidth
            ) + 1;

      for (let i = 0; i < this.requiredReps; i++) {
        this._createClone();
      }

      if (this.reverse) {
        this.offset = this.contentWidth * -1;
      }

      this.element.classList.add('is-init');
    }

    _setupEvents() {
      this.element.addEventListener('mouseenter', () => {
        if (this.pausable) this.paused = true;
      });

      this.element.addEventListener('mouseleave', () => {
        if (this.pausable) this.paused = false;
      });
    }

    _createClone() {
      const clone = this.content.cloneNode(true);
      clone.style.display = 'inline-block';
      clone.classList.add(`${this.selector}__copy`);
      this.wrapper.appendChild(clone);
    }

    animate() {
      if (!this.paused) {
        const isScrolled = this.reverse
          ? this.offset < 0
          : this.offset > this.contentWidth * -1;
        const direction = this.reverse ? -1 : 1;
        const reset = this.reverse ? this.contentWidth * -1 : 0;

        if (isScrolled) this.offset -= this.speed * direction;
        else this.offset = reset;

        this.wrapper.style.whiteSpace = 'nowrap';
        this.wrapper.style.transform = `translate(${this.offset}px, 0) translateZ(0)`;
      }
    }

    _refresh() {
      this.contentWidth = this.content.offsetWidth;
    }

    repopulate(difference, isLarger) {
      this.contentWidth = this.content.offsetWidth;

      if (isLarger) {
        const amount = Math.ceil(difference / this.contentWidth) + 1;

        for (let i = 0; i < amount; i++) {
          this._createClone();
        }
      }
    }

    static refresh(index) {
      MARQUEES[index]._refresh();
    }

    static refreshAll() {
      for (let i = 0; i < MARQUEES.length; i++) {
        MARQUEES[i]._refresh();
      }
    }

    static init(options = { selector: 'marquee3k' }) {
      window.MARQUEES = [];
      const marquees = Array.from(
        document.querySelectorAll(`.${options.selector}`)
      );
      let previousWidth = window.innerWidth;
      let timer;

      for (let i = 0; i < marquees.length; i++) {
        const marquee = marquees[i];
        const instance = new Marquee3k(marquee, options);
        MARQUEES.push(instance);
      }

      animate();

      function animate() {
        for (let i = 0; i < MARQUEES.length; i++) {
          MARQUEES[i].animate();
        }
        window.requestAnimationFrame(animate);
      }

      window.addEventListener(
        'resize',
        () => {
          clearTimeout(timer);

          timer = setTimeout(() => {
            const isLarger = previousWidth < window.innerWidth;
            const difference = window.innerWidth - previousWidth;

            for (let i = 0; i < MARQUEES.length; i++) {
              MARQUEES[i].repopulate(difference, isLarger);
            }

            previousWidth = this.innerWidth;
          });
        },
        250
      );
    }
  }

  return Marquee3k;
});

// initialise Marquee
Marquee3k.init();

// =================================================================================================== /

// let menuItems = document.querySelectorAll(
//   '.expertises__menu .expertises__menu__item'
// );
// let cursor = document.querySelector('.expertises__menu .hover__img');
// let getXY = (e) => [e.clientX, e.clientY];

// menuItems.forEach((menuItem) => {
//   menuItem.addEventListener('mouseenter', (e) => {
//     let [x, y] = getXY(e);
//     cursor.animate(
//       [
//         {
//           opacity: 0,
//           transform: `translate(${x}px, ${y}px) scale(0)`,
//         },
//         {
//           opacity: 1,
//           transform: `translate(${x}px, ${y}px) scale(1)`,
//         },
//       ],
//       { duration: 300, fill: 'forwards' }
//     );
//     menuItem.addEventListener('mouseleave', (e) => {
//       let [x, y] = getXY(e);
//       cursor.animate(
//         [
//           {
//             opacity: 1,
//             transform: `translate(${x}px, ${y}px) scale(1)`,
//           },
//           {
//             opacity: 0,
//             transform: `translate(${x}px, ${y}px) scale(0)`,
//           },
//         ],
//         { duration: 300, fill: 'forwards' }
//       );
//     });
//   });
//   menuItem.addEventListener('mousemove', (e) => {
//     let [x, y] = getXY(e);
//     cursor.animate(
//       [
//         {
//           transform: `translate(${x}px, ${y}px)`,
//         },
//         {
//           transform: `translate(${x}px, ${y}px)`,
//         },
//       ],
//       { duration: 500, delay: 50, fill: 'forwards' }
//     );
//   });
// });

// Get all the menu items
const menuItems = document.querySelectorAll('.expertises__menu__item');

// Loop through each menu item and add event listeners
menuItems.forEach((menuItem) => {
  const hoverImg = menuItem.querySelector('.hover__img');

  // Add mouseenter event listener
  menuItem.addEventListener('mouseenter', () => {
    hoverImg.style.top = '0';
    hoverImg.style.opacity = '1';
  });

  // Add mouseleave event listener
  menuItem.addEventListener('mouseleave', () => {
    hoverImg.style.top = '-100%';
    hoverImg.style.opacity = '0';
  });
});
