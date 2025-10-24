const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}

document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems) {
    const firstItem = accordionItems[0];
    if (firstItem) {
      const firstContent = firstItem.querySelector('.accordion-item-content');
      firstItem.classList.add('active');
      firstContent.style.height = firstContent.scrollHeight + 'px';
    }

    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-item-header');
      const content = item.querySelector('.accordion-item-content');

      trigger.addEventListener('click', function() {
        const parent = this.parentNode;

        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
          content.style.height = '0';
        } else {
          document.querySelectorAll('.accordion-item').forEach(child => {
            child.classList.remove('active');
            child.querySelector('.accordion-item-content').style.height = '0';
          });
          parent.classList.add('active');
          content.style.height = content.scrollHeight + 'px';
        }
      });
    });
  }
});

document.querySelectorAll('.services-slider').forEach(slider => {
  new Swiper(slider, {
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    watchSlidesProgress: true,
    allowTouchMove: false,
    navigation: {
      nextEl: slider.closest('.services-slider-section').querySelector('.swiper-button-next'),
      prevEl: slider.closest('.services-slider-section').querySelector('.swiper-button-prev'),
    },
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 24,
      },
      601: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1025: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1261: {
        slidesPerView: 2.8,
        spaceBetween: 24,
      }
    }
  });
});

var swiper2 = new Swiper(".projects-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  centeredSlides: true,
  initialSlide: 1,
  navigation: {
    nextEl: ".projects-section .swiper-button-next",
    prevEl: ".projects-section .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    601: {
      slidesPerView: 1,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 1.2,
      spaceBetween: 24,
    }
  }
});

var swiper3 = new Swiper(".testimonials-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: ".testimonials .swiper-button-next",
    prevEl: ".testimonials .swiper-button-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.05,
      spaceBetween: 24,
    },
    601: {
      slidesPerView: 2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 2.9,
      spaceBetween: 24,
    }
  }
});

var swiper4 = new Swiper(".certificates-slider", {
  observer: true,
  observeParents: true,
  observeSlideChildren: true,
  watchSlidesProgress: true,
  // navigation: {
  //   nextEl: ".testimonials .swiper-button-next",
  //   prevEl: ".testimonials .swiper-button-prev",
  // },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 24,
    },
    601: {
      slidesPerView: 2.2,
      spaceBetween: 24,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 24,
    }
  }
});

const mobileMenuButton = document.querySelector('.mobile-menu-button');
const closeMenuButton = document.querySelector('.close-menu-mobile');
const headerNav = document.querySelector('.header-nav');
let isMenuOpen = false;

function toggleMobileMenu() {
  isMenuOpen = !isMenuOpen;

  if (isMenuOpen) {
    headerNav.classList.add('show');
  } else {
    headerNav.classList.remove('show');
  }
}

function closeMobileMenu() {
  isMenuOpen = false;
  headerNav.classList.remove('show');
}

mobileMenuButton.addEventListener('click', toggleMobileMenu);
closeMenuButton.addEventListener('click', closeMobileMenu);

document.addEventListener('click', (e) => {
  if (isMenuOpen &&
    !headerNav.contains(e.target) &&
    !mobileMenuButton.contains(e.target)) {
    closeMobileMenu();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && isMenuOpen) {
    closeMobileMenu();
  }
});

// Скрипт модальных окон

document.addEventListener('DOMContentLoaded', function() {
  var modalButtons = document.querySelectorAll('.open-modal-dialog'),
    overlay = document.querySelector('body'),
    closeButtons = document.querySelectorAll('.modal-dialog .modal-close');

  var currentOpenModal = null;

  async function openModal(modalBtn) {
    return new Promise(resolve => {
      var modalId = modalBtn.getAttribute('data-src'),
        modalElem = document.querySelector('.modal-dialog.' + modalId);

      if (currentOpenModal && currentOpenModal !== modalElem) {
        closeModalDirectly(currentOpenModal);
      }

      overlay.classList.add('modal-open');
      modalElem.style.display = 'flex';

      setTimeout(function() {
        modalElem.classList.add('modal-opening');
        currentOpenModal = modalElem;
        resolve();
      }, 0);
    });
  }

  async function closeModal(closeBtn) {
    return new Promise(resolve => {
      var modal = closeBtn.closest('.modal-dialog');
      modal.classList.remove('modal-opening');
      modal.classList.add('modal-closing');

      setTimeout(function() {
        modal.classList.remove('modal-closing');
        modal.style.display = 'none';
        overlay.classList.remove('modal-open');
        if (currentOpenModal === modal) {
          currentOpenModal = null;
        }
        resolve();
      }, 500);
    });
  }

  function closeModalDirectly(modalElem) {
    modalElem.classList.remove('modal-opening');
    modalElem.style.display = 'none';

    if (currentOpenModal === modalElem) {
      currentOpenModal = null;
    }

    var anyModalOpen = document.querySelector('.modal-dialog[style*="display: flex"]');
    if (!anyModalOpen) {
      overlay.classList.remove('modal-open');
    }
  }

  /* open modal */
  modalButtons.forEach(function(modalBtn) {
    modalBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      await openModal(modalBtn);
    });
  });

  /* close modal */
  closeButtons.forEach(function(closeBtn) {
    closeBtn.addEventListener('click', async function(e) {
      await closeModal(closeBtn);
    });
  });

  document.querySelectorAll('.modal-dialog').forEach(function(item) {
    item.addEventListener('click', async function(e) {
      if (e.target !== e.currentTarget) {
        return;
      } else {
        await closeModal(this);
      }
    });
  });

});
