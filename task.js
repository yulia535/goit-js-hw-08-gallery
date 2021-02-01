/* <li class="gallery__item">
    <a
        class="gallery__link"
        href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
    >
        <img
            class="gallery__image"
            src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
            data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
            alt="Tulips"
        />
    </a>
</li> */
import galleryList from './gallery-items.js';

const refs = {
  gallery: document.querySelector('.js-gallery'),
  modal: document.querySelector('.js-lightbox'),
  modalImg: document.querySelector('.lightbox__image'),
  btnCloseLightbox: document.querySelector('.lightbox__button'),
  lightboxOverlay: document.querySelector('.lightbox__overlay'),
};

const createImage = (galleryEl) => {
  const galleryItem = document.createElement('li');
  const galleryLink = document.createElement('a');
  const galleryImage = document.createElement('img');

  galleryItem.appendChild(galleryLink);
  galleryLink.appendChild(galleryImage);

  galleryLink.setAttribute('href', galleryEl.original);
  galleryLink.classList.add('gallery__link');

  galleryImage.setAttribute('src', galleryEl.preview);
  galleryImage.setAttribute('data-source', galleryEl.original);
  galleryImage.setAttribute('alt', galleryEl.description);
  galleryImage.classList.add('gallery__image');

  return galleryItem;
};

const galleryItems = galleryList.map((item) => createImage(item));

refs.gallery.append(...galleryItems);

refs.gallery.addEventListener('click', (event) => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imageUrl = event.target.dataset.source;

  refs.modal.classList.add('is-open');

  refs.modalImg.setAttribute('src', imageUrl);
});

const closeModal = function () {
  refs.modal.classList.remove('is-open');
  refs.modalImg.removeAttribute('src');
};

refs.btnCloseLightbox.addEventListener('click', closeModal);
refs.lightboxOverlay.addEventListener('click', closeModal);
window.addEventListener('keyup', (event) => {
  if (event.code === 'Escape') {
    closeModal();
  }
});
