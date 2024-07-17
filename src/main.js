import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

import {
  renderGallery,
  clearGallery,
  hide,
  show,
  disable,
  enable
} from "./js/render-functions";
import { getPicturesByQuery } from "./js/pixabay-apy";

let currentPage = 1;
let currentQuery = '';

const searchForm = document.querySelector('.form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

hide(loadMoreBtn);
enable(loadMoreBtn, loader);
searchForm.addEventListener('submit', handleSearch);

async function handleSearch(evt) {
  evt.preventDefault();

  clearGallery();
  const queryValue = evt.currentTarget.elements.query.value.trim();
  
  if (!queryValue) {
    iziToast.error({
      title: 'Error',
      message: '❌ Please enter a search query',
    });
    return;
  }
  disable(loadMoreBtn, loader);

  currentQuery = queryValue;
  currentPage = 1;
  
  try {
    const data = await getPicturesByQuery(queryValue, currentPage);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No Results',
        message: 'Sorry, there are no images matching your search query.',
      });
      hide(loadMoreBtn);
    } else {
      renderGallery(data.hits);

      if (data.totalHits > currentPage * 15) {
        
        show(loadMoreBtn);
        enable(loadMoreBtn, loader);
      } else {
        hide(loadMoreBtn);
        iziToast.info({
          title: 'End of Results',
          message: "We're sorry, but you've reached the end of search results.",
        })
      }
    }
  } catch (error) {
    onFetchError(error);
  } finally {
    enable(loadMoreBtn, loader);
    searchForm.reset();
  }
}

function onFetchError(error) {
    iziToast.error({
    title: 'Error',
        message: '❌ No pictures found',
        });
}

loadMoreBtn.addEventListener('click', loadMoreImages);
async function loadMoreImages() {
  disable(loadMoreBtn, loader);
  hide(loadMoreBtn);
  currentPage += 1;

  try {
    const data = await getPicturesByQuery(currentQuery, currentPage);
    renderGallery(data.hits);

    if (data.totalHits > currentPage * 15) {

      show(loadMoreBtn);
      enable(loadMoreBtn, loader);
    } else {
      hide(loadMoreBtn);
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
      });
    }

    smoothScroll();
  } catch (error) {
    onFetchError(error);
  } finally {
    enable(loadMoreBtn, loader);
    searchForm.reset();
  }
}

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

