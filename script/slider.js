let images = [
  {
    src: '../images/s2/s2_image_slide1.jpg',
    city: `Rostov-on-Don LCD admiral`,
    area: `81 m2`,
    time: `3.5 months`,
    cost: `Upon request`,
  },
  {
    src: `../images/s2/s2_image_slide2.jpg`,
    city: `Sochi Thieves`,
    area: `105 m2`,
    time: `4 months`,
    cost: `Upon request`,
  },
  {
    src: `../images/s2/s2_image_slide3.jpg`,
    city: `Rostov-on-Don Patriotic`,
    area: `93 m2`,
    time: `3 months`,
    cost: `Upon request`,
  },
];

function initSlider() {
  if (!images || !images.length) return console.log(`missing images`);
  let sliderImages = document.querySelector(`.s2_image_slider`);
  let sliderArrows = document.querySelector(`.s2_slider_nav`);
  let sliderDots = document.querySelector(`.s2_slider_dots`);
  let sliderDesciption = document.querySelector(`.s2_grid_box`);
  let sliderLinks = document.querySelector(`.s2_menu`);

  let sliderMobImages = document.querySelector(`.s2_image_mob`);
  let sliderMobArrows = document.querySelector(`.s2__slider_mob`);

  initImages();
  initArrows();
  initMobArrows();
  initDots();
  initlinks();

  // !функция перебора картинок в обьекте. добавляет дивы в html с доп тегом active и присваивает каждой свой индекс + эвент лисенер на них
  function initImages() {
    images.forEach((image, index) => {
      let imageDiv = `<div class ="image n${index} ${
        index === 0 ? 'active' : ''
      }" style='background-image: url(${
        images[index].src
      });' data-index='${index}'></div>`;
      sliderImages.innerHTML += imageDiv;
      sliderMobImages.innerHTML += imageDiv;
    });
  }

  // !функция перебора стрелок. добавляет дивы в html с доп тегом active и присваивает каждой свой индекс + эвент лисенер на них
  function initArrows() {
    sliderArrows.querySelectorAll(`.s2_slider_arrow`).forEach((arrow) => {
      arrow.addEventListener(`click`, function () {
        let curSlide = +sliderImages.querySelector(`.active`).dataset.index;
        let nextSlide;
        if (arrow.classList.contains(`left`)) {
          nextSlide = curSlide === 0 ? images.length - 1 : curSlide - 1;
        } else {
          nextSlide = curSlide === images.length - 1 ? 0 : curSlide + 1;
        }
        moveSlider(nextSlide);
      });
    });
  }

  // !аналогично для стрелок мобилки
  function initMobArrows() {
    sliderMobArrows
      .querySelectorAll(`.s2_slider_mob_arrow`)
      .forEach((arrow) => {
        arrow.addEventListener(`click`, function () {
          let curSlide =
            +sliderMobImages.querySelector(`.active`).dataset.index;
          let nextSlide;
          if (arrow.classList.contains(`left`)) {
            nextSlide = curSlide === 0 ? images.length - 1 : curSlide - 1;
          } else {
            nextSlide = curSlide === images.length - 1 ? 0 : curSlide + 1;
          }
          moveSlider(nextSlide);
        });
      });
  }

  // !функция перебора точек. добавляет дивы в html с доп тегом active и присваивает каждой свой индекс + эвент лисенер на них
  function initDots() {
    images.forEach((image, index) => {
      let dot = `<div class = "s2__slider_dots-item n${index} ${
        index === 0 ? 'active' : ''
      }" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(`.s2__slider_dots-item`).forEach((dot) => {
      dot.addEventListener(`click`, function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  // !функция перебора ссылок. добавляет li в html с доп тегом active и присваивает каждой свой индекс + эвент лисенер на них
  function initlinks() {
    images.forEach((image, index) => {
      let link = `<li class = "s2_menu_link n${index} ${
        index === 0 ? `active` : ``
      }" data-index="${index}">${images[index].city}</li>`;
      sliderLinks.innerHTML += link;
    });
    sliderLinks.querySelectorAll(`.s2_menu_link`).forEach((link) => {
      link.addEventListener(`click`, function () {
        moveSlider(this.dataset.index);
      });
    });
  }

  // !функция смены слайдера
  function moveSlider(num) {
    if (sliderImages.querySelector(!`.active`)) {
      sliderImages.style.display = `none`;
    }
    // !меняет тег .active у фото
    sliderImages.querySelector(`.active`).classList.remove(`active`);
    sliderImages.querySelector(`.n` + num).classList.add(`active`);

    sliderMobImages.querySelector(`.active`).classList.remove(`active`);
    sliderMobImages.querySelector(`.n` + num).classList.add(`active`);

    // !меняет тег .active у точек
    sliderDots.querySelector(`.active`).classList.remove(`active`);
    sliderDots.querySelector(`.n` + num).classList.add(`active`);

    // !меняет тег .active у ссылок
    sliderLinks.querySelector(`.active`).classList.remove(`active`);
    sliderLinks.querySelector(`.n` + num).classList.add(`active`);

    // !далее был первоначальный простой вариант смены описаний в html по конкретному тегу, но ниже написал код перебора обьекта для автоматического сопоставления
    // sliderDesciption.querySelector(`.city`).innerText = images[num].city;
    // sliderDesciption.querySelector(`.area`).innerText = images[num].area;
    // sliderDesciption.querySelector(`.time`).innerText = images[num].time;
    // sliderDesciption.querySelector(`.cost`).innerText = images[num].cost;

    // !смена описания перебором обьекта images в статусе active по соответствию ключа с тегами в html и подставлением в соответствующий теговый элемент в html
    for (let key in images[num]) {
      let element = sliderDesciption.querySelector(`.${key}`);
      if (element) {
        element.innerText = images[num][key];
      }
    }
  }
}

document.addEventListener(`DOMContentLoaded`, initSlider);
