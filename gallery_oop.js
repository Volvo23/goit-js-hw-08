import galleryItems from '../gallery-items.js'

const listGalleryRef = document.querySelector('.js-gallery')
const modalRef = document.querySelector('.js-lightbox')
const imageModalRef = document.querySelector('.lightbox__image')
const closeModalButton = document.querySelector('button[data-action="close-lightbox"]')
const overlayRef = document.querySelector('.lightbox__overlay')
let indexCurrentImage  ;
listGalleryRef.addEventListener('click', onOpenModal)

// function createGallery() {
//     let markup = ''
//     for (let i = 0; i < galleryItems.length; i += 1) {
//         markup += `<li class="gallery__item">
//         <a
//           class="gallery__link"
//           href="${galleryItems[i].original}"
//         >
//           <img
//             class="gallery__image"
//             src="${galleryItems[i].preview}"
//             data-source="${galleryItems[i].original}"
//             alt="${galleryItems[i].description}"
//             data-index="${i}"
//           />
//         </a>
//       </li>`
//     }
//     listGalleryRef.innerHTML = markup
// }
// ebashym 2 metodom 
function createLi({original, preview, description }, index) {
    const li = document.createElement('li')
    const a = document.createElement('a')
    const img = document.createElement('img')

    li.classList.add('gallery__item')
    a.classList.add('gallery__link')
    img.classList.add('gallery__image')

    a.href = original;
    img.src = preview;
    img.alt = description;
    img.setAttribute('data-source', original);
    img.setAttribute('data-index', index);
    // a.innerHTML = [img];
    a.append(img);
   
    // console.log('img', img);
    li.append(a);
    // console.log('li', li);
    return li;
}


function createGallery ( galleryItems) {
    return galleryItems.map((liItem, index) => {
        return createLi({ original: liItem.original, preview: liItem.preview, description: liItem.description }, index);
    });
    
}







listGalleryRef.append(...createGallery(galleryItems));
 

function onOpenModal(event) {
    event.preventDefault()
    if (event.target.nodeName !== 'IMG') {
        return
    }
    indexCurrentImage = Number(event.target.dataset.index)
    modalRef.classList.add('is-open')
    imageModalRef.src = event.target.dataset.source
    imageModalRef.alt = event.target.alt
    closeModalButton.addEventListener('click', onCloseModal)
    overlayRef.addEventListener('click', onCloseModal)
    window.addEventListener('keydown', onPressKey)
}

function onCloseModal() {
    modalRef.classList.remove('is-open')
    imageModalRef.src = ""
}

function onPressKey(event) {
    switch (event.code) {
        case "Escape":
            onCloseModal()
            break;
        case "ArrowRight":
            indexCurrentImage + 1 === galleryItems.length ? (indexCurrentImage = 0) : indexCurrentImage += 1;
            imageModalRef.src = galleryItems[indexCurrentImage].original
            break
        
        case "ArrowLeft":
            indexCurrentImage === 0 ? (indexCurrentImage = galleryItems.length - 1) : indexCurrentImage -= 1;
            imageModalRef.src = galleryItems[indexCurrentImage].original
            break
            
            default:
            break;
    }

}


// createGallery()