
// const scroll = new LocomotiveScroll({
//   el: document.querySelector('.main'),
//   smooth: true
// });
// window.addEventListener('load',function(){
//   document.querySelector(".preloader").style.display = "none";
//   document.querySelector(".preloader-container").style.display = "none";
// })
document.querySelector(".preloader").style.display = "none";
document.querySelector(".preloader-container").style.display = "none";
// Modal Window
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const header = document.querySelector(".header");
const operationTabContainer = document.querySelectorAll('.operations__tab');
const operationTab = document.querySelector('.operations__tab-container');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const navbar = document.querySelector('.header .nav');
const allSections = document.querySelectorAll('.section');
const allImages = section1.querySelectorAll('img');
const dotContainer = document.querySelector('.dots');
const circle = document.querySelector('.cursor');
const upArrowImage = document.querySelector('.up-arrow img');

upArrowImage.addEventListener('mouseover',function(){
  upArrowImage.src = "./Images/up-arrow-white.png"
})
upArrowImage.addEventListener('mouseleave',function(){
  upArrowImage.src = "./Images/up-arrow.png"
})
upArrowImage.addEventListener('click',function(e){
  header.scrollIntoView({behavior:"smooth"})
})


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));


btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

const message = document.createElement('div');
message.innerHTML = 'We use cookies for improved functionalities and analytics. <button class="btn btn--close-cookie">Got it! </button>';
header.append(message);
document.querySelector('.btn--close-cookie').addEventListener('click',()=>{
  message.remove();
})
message.classList.add('cookie-message');
message.style.backgroundColor = '#37383d';



const navlinks = document.querySelectorAll('.nav__link');
for(let i=0;i<3;i++){
  navlinks[i].addEventListener('click',function(e){
    e.preventDefault();
    const id = this.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: "smooth", block: "start",inline : "start"})
  })
}



let currentActiveTab = document.querySelector('.operations__tab--active');
//Tabbed Component
operationTab.addEventListener('click',function(e){
  if(e.target.classList.contains('operations__tab')){
    const clicked = e.target.closest('.operations__tab');
    document.querySelector('.operations__content--active').classList.remove('operations__content--active');
    currentActiveTab.classList.remove('operations__tab--active');
    currentActiveTab = clicked;
    currentActiveTab.classList.add('operations__tab--active');
    document.querySelector(`.operations__content--${currentActiveTab.getAttribute(`data-tab`)}`).classList.add('operations__content--active');
    
  }
})

//navigation bar animation
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if(el !== link){
        el.style.opacity = this;
      }
    });
    logo.style.opacity =this;
  }
};
navbar.addEventListener('mouseover',handleHover.bind(0.2));
navbar.addEventListener('mouseout', handleHover.bind(1));

const obsCallback = function(entries,observer){
  const [entry] = entries;
  if(!entry.isIntersecting){
    navbar.classList.add('sticky');
    upArrowImage.classList.remove('hidden')
  }else{
    navbar.classList.remove('sticky');
    upArrowImage.classList.add('hidden')
  }
}
const obsOption = {
  root : null,
  threshold : [0],
  rootMargin : '-90px'
}
const observer = new IntersectionObserver(obsCallback,obsOption);
observer.observe(header);


// Reveal Sections
allSections.forEach(function(section){
  section.classList.add('section--hidden');
});

const revealSection = function(entries,observer){
  const [entry] = entries;
  if(entry.isIntersecting){
    entry.target.classList.remove('section--hidden')
    sectionObserver.unobserve(entry.target);
  }
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold : 0.25
})

allSections.forEach(function(section){
  sectionObserver.observe(section);
})

//slider

let currentSlide = 0;
const slider = document.querySelector('.slider');
const leftSlideBtn = document.querySelector('.slider__btn--left');
const rightSlideBtn = document.querySelector('.slider__btn--right');
const slides = document.querySelectorAll('.slide');
const createDots = function(){
  slides.forEach(function(_,i){
    dotContainer.insertAdjacentHTML('beforeend',`<button class='dots__dot' data-slide = ${i}></button>`)
  })
}
createDots();
const allDots = document.querySelectorAll('.dots__dot');
allDots[currentSlide].classList.add('dots__dot--active');

const slide = function(){
  allDots[currentSlide].classList.remove('dots__dot--active');
  currentSlide = (this==='right'?currentSlide===slides.length-1?0:currentSlide+1:currentSlide===0?slides.length-1:currentSlide-1);
  slides.forEach((slide,i) => {
    slide.style.transform = `translateX(${(i-currentSlide)*100}%)`;
  })
  allDots[currentSlide].classList.add('dots__dot--active');
}

slides.forEach((slide,i)=>{
  slide.style.transform = `translateX(${i*100}%)`;
})

rightSlideBtn.addEventListener('click',slide.bind('right'))
leftSlideBtn.addEventListener('click',slide.bind('left'))

document.addEventListener('keydown',function(e){
  if(e.key === 'ArrowRight'){
    slide.bind('right')();
  }else if(e.key==='ArrowLeft'){
    slide.bind('left')();
  }
})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    allDots[currentSlide].classList.remove('dots__dot--active');
    currentSlide = Number(e.target.getAttribute('data-slide'));
    slides.forEach((slide,i) => {
      slide.style.transform = `translateX(${(i-currentSlide)*100}%)`;
    })
    allDots[currentSlide].classList.add('dots__dot--active');
  }
})

document.addEventListener('mousemove', function(e) {
  let left = e.pageX;
  let top = e.pageY;
  circle.style.left = left + 'px';
  circle.style.top = top + 'px';
});

// Inventory Chart
const ctx = document.getElementById('myChart');
        new Chart(ctx, {
          responsive : true,
          type: 'pie',
          data: {
            labels: ['Medics', 'Food', 'Survival kits'],
            datasets: [{
              label: 'Quantity',
              data: [20, 40, 15,],
              borderWidth: 1
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });

//Hamburger
const hamburgerBtn = document.querySelector('#hamburger-nav img');
const hamburgerModal = document.querySelector('.hamburgerModal');
const hamburgerModalBtn = document.querySelector('#hamburgerModal-img img')

hamburgerBtn.addEventListener('click',function(e){
  hamburgerModal.classList.toggle('hidden')
})
hamburgerModalBtn.addEventListener('click',function(e){
  hamburgerModal.classList.toggle('hidden')
})

document.querySelector('.hamburger-nav__links').addEventListener('click',function(){
  hamburgerModal.classList.toggle('hidden');
})


