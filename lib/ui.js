import { formatPrice } from './helpers.js';

function deleteLineFromCart(event){
  event.preventDefault();
  const lineToDelete=event.submitter.closest('tr');
  lineToDelete.parentElement.removeChild(lineToDelete);

  const cartTable=document.querySelector('.cart');
  if(!cartTable){
    console.warn('fann ekki cart table');
    return;
  }
  
  const cartTableElements=cartTable.querySelectorAll('.table tbody tr');
  if(cartTableElements.length===0){
    emptyCart();
  }
  else{
    updateCartTotal();
  }

}
export function emptyCart(){
  const cartTableElement=document.querySelector('.cart');
  if(!cartTableElement){
    console.warn('fann ekki cart table');
    return;
  }
  showCartContent(false);
}
export function updateCartTotal() {
  const cartTable = document.querySelector('.cart table');
  const cartLines = cartTable.querySelectorAll('tr[data-product-id]');
  let totalSum = 0;

  cartLines.forEach((cartLine) => {
    const productId = cartLine.dataset.productId;
    const quantityElement = cartLine.querySelector('.quantity');
    const quantity = parseInt(quantityElement.textContent, 10);

    if (!isNaN(quantity) && productId) {
      if (productId === '1') {
        totalSum += quantity * 5000;
      } else if (productId === '2') {
        totalSum += quantity * 3000;
      } else if (productId === '3') {
        totalSum += quantity * 20000;
      }
    }
  });

  const totalSumElement = document.querySelector('tfoot .price');
  if (totalSumElement) {
    totalSumElement.textContent = formatPrice(totalSum);
  }
}

export function createCartLine(product, quantity) {

  // TODO útfæra þannig að búin sé til lína í körfu á forminu:

  const cartLineElement = document.createElement('tr');
  cartLineElement.dataset.productId=product.id.toString();
  const titleElement=document.createElement('td');
  titleElement.textContent=product.title;
  titleElement.classList.add('text');
  cartLineElement.appendChild(titleElement);

  const quantityElement=document.createElement('td');
  quantityElement.textContent=quantity.toString();
  quantityElement.classList.add('quantity');
  cartLineElement.appendChild(quantityElement);

  const priceElement=document.createElement('td');
  priceElement.textContent=formatPrice(product.price);
  priceElement.classList.add('price');
  cartLineElement.appendChild(priceElement);

  const totalElement=document.createElement('td');
  totalElement.textContent=formatPrice(product.price*quantity);
  totalElement.classList.add('total');
  cartLineElement.appendChild(totalElement);

 const formTdElement=document.createElement('td');
 const formElement=document.createElement('form');
 formElement.addEventListener('submit',deleteLineFromCart);

 const buttonElement=document.createElement('button');
 buttonElement.textContent='Eyða';

 formElement.appendChild(buttonElement);
 formTdElement.appendChild(formElement);
 cartLineElement.appendChild(formTdElement);



  return cartLineElement;
}

/**
 * Sýna efni körfu eða ekki.
 * @param {boolean} show Sýna körfu eða ekki
 */
export function showCartContent(show = true) {
  // Finnum element sem inniheldur körfuna
  const cartElement = document.querySelector('.cart');

  if (!cartElement) {
    console.warn('fann ekki .cart');
    return;
  }

  const emptyMessage = cartElement.querySelector('.empty-message');
  const cartContent = cartElement.querySelector('.cart-content');

  if (!emptyMessage || !cartContent) {
    console.warn('fann ekki element');
    return;
  }

  if (show) {
    emptyMessage.classList.add('hidden');
    cartContent.classList.remove('hidden');
  } else {
    emptyMessage.classList.remove('hidden');
    cartContent.classList.add('hidden');
  }
}


