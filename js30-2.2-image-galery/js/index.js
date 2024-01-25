
let imageContainer = document.querySelector('.image__container').children;

let searchIcon = document.querySelector('.search__image');

let input = document.querySelector('input');

input.focus();

let queryInput = '';

let url = 'https://api.unsplash.com/search/photos?query=winter&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    for(let i = 0; i < data.results.length; i++){
      for(let j = i; j < imageContainer.length; j++){
        imageContainer[j].src = data.results[i].urls.regular;
      }
    }
  }
  getData();
  
  function searchImage(){
    queryInput = input.value;
    url = 'https://api.unsplash.com/search/photos?query=' + queryInput + '&per_page=30&orientation=landscape&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
    searchIcon.setAttribute('onclick', 'closeImage()');
    searchIcon.style.backgroundImage = "url('https://rolling-scopes-school.github.io/dzmitryalekseev-JSFEPRESCHOOL2023Q2/js30-2.2-image-galery/img/close.svg')";
    if(input.value === ''){
      return closeImage()
    }
    return getData();
  }

  function closeImage(){
    searchIcon.setAttribute('onclick', 'searchImage()');
    searchIcon.style.backgroundImage = "url('https://rolling-scopes-school.github.io/dzmitryalekseev-JSFEPRESCHOOL2023Q2/js30-2.2-image-galery/img/search.svg')";
    input.value = '';
    input.focus();
  }
  
  input.addEventListener("keydown", function(e){
    if(e.code === "Enter"){
      searchImage()
    }
  })