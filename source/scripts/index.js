const burger = document?.querySelector('.user-actions__toggle-btn');
const menu = document.querySelector('.header__nav');
const slideList = document.querySelectorAll('.hero__slide');
const nextSlide = document.querySelector('.hero__control-next');
const prevSlide = document.querySelector('.hero__control-prev');
const sliderBulletsContainer = document.querySelector('.hero__bullets');
const sliderBullets = document.querySelectorAll('.hero__bullet');

const handleClickBurger = () => {
  burger.classList.toggle('user-actions__toggle-btn--active');

  if (menu) {
    menu.classList.toggle('header__nav--active');
  }
};

const setStateSliderButtons = (index) => {
  if (index <= 0) {
    prevSlide.setAttribute('disabled', 'disabled');
    nextSlide.removeAttribute('disabled');
  } else if (index === slideList.length - 1) {
    nextSlide.setAttribute('disabled', 'disabled');
    prevSlide.removeAttribute('disabled');
  } else {
    prevSlide.removeAttribute('disabled');
    nextSlide.removeAttribute('disabled');
  }
};

const setActiveBullet = (index) => {
  sliderBullets.forEach((bullet) => {
    bullet.classList.remove('hero__bullet--active');
  });

  sliderBullets[index].classList.add('hero__bullet--active');
};

const changeActiveSlide = (changedSlideList, direction, selectedSlideIndex = undefined) => {
  let activeSlideIndex;
  let changedSlideIndex = selectedSlideIndex;

  changedSlideList.forEach((slide, slideIndex) => {
    if (slide.classList.contains('hero__slide--active')) {
      activeSlideIndex = slideIndex;

      if (direction === 'next') {
        changedSlideIndex = activeSlideIndex + 1;
      } else if (direction === 'prev') {
        changedSlideIndex = activeSlideIndex - 1;
      }

      if (changedSlideList[changedSlideIndex]) {
        slide.classList.remove('hero__slide--active');
      }
    }
  });

  const index = changedSlideIndex ?? selectedSlideIndex;
  setStateSliderButtons(index);
  setActiveBullet(index);

  if (changedSlideList[index]) {
    changedSlideList[index].classList.add('hero__slide--active');
  }
};


const handleClickControlSlide = (event) => {
  changeActiveSlide(slideList, event.target.id);
};

const handleClickSliderBullet = (event) => {
  const index = [...sliderBullets].findIndex((slide) => slide === event.target);
  changeActiveSlide(slideList, '', index);
};

if (burger) {
  burger.addEventListener('click', handleClickBurger);
}

if (nextSlide && prevSlide) {
  nextSlide.addEventListener('click', handleClickControlSlide);
  prevSlide.addEventListener('click', handleClickControlSlide);
}


if (sliderBullets && sliderBulletsContainer) {
  sliderBulletsContainer.addEventListener('click', handleClickSliderBullet);
}

const handleDOMContetLoaded = () => {
  const slider = document.getElementById('slider');
  const minPriceInput = document.getElementById('min');
  const maxPriceInput = document.getElementById('max');

  noUiSlider.create(slider, {
    start: [24, 781],
    connect: true,
    range: {
      'min': 0,
      'max': 900
    },
    cssPrefix: 'my-slider-',
    step: 1,
    format: {
      to: function (value) {
        return Math.round(value);
      },
      from: function (value) {
        return Number(value);
      }
    }
  });


  slider.noUiSlider.on('update', (values, handle) => {
    const value = values[handle];
    if (handle === 0) {
      minPriceInput.value = Math.round(value);
    } else {
      maxPriceInput.value = Math.round(value);
    }
  });


  minPriceInput.addEventListener('change', function () {
    slider.noUiSlider.set([this.value, null]);
  });

  maxPriceInput.addEventListener('change', function () {
    slider.noUiSlider.set([null, this.value]);
  });
};

document.addEventListener('DOMContentLoaded', handleDOMContetLoaded);
