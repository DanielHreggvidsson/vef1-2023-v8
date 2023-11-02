import { createCartLine, updateCartTotal, showCartContent} from './lib/ui.js';
import { formatPrice } from './lib/helpers.js';

const products = [
  {
    id: 1,
    title: 'HTML húfa',
    description:
      'Húfa sem heldur hausnum heitum og hvíslar hugsanlega að þér hvaða element væri best að nota.',
    price: 5_000,
  },
  {
    id: 2,
    title: 'CSS sokkar',
    description: 'Sokkar sem skalast vel með hvaða fótum sem er.',
    price: 3_000,
  },
  {
    id: 3,
    title: 'JavaScript jakki',
    description: 'Mjög töff jakki fyrir öll sem skrifa JavaScript reglulega.',
    price: 20_000,
  },
];
function findCartLine(product) {
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  if (!cartTableBodyElement) {
    return null;
  }

  const existingCartLines = cartTableBodyElement.querySelectorAll(`tr[data-product-id="${product.id}"]`);
  if (existingCartLines.length > 0) {
    return existingCartLines[0]; 
  }

  return null;
}

/** Bæta vöru í körfu */
function addProductToCart(product, quantity) {
  // Hér þarf að finna `<tbody>` í töflu og setja `cartLine` inn í það
  const cartTableBodyElement = document.querySelector('.cart table tbody');
  

  if (!cartTableBodyElement) {
    console.warn('fann ekki .cart table');
    return;
  }
  const existingCartLine = findCartLine(product);
  
  if(existingCartLine){
    const existingQuantityElement = existingCartLine.querySelector('.quantity');
    const existingQuantity = parseInt(existingQuantityElement.textContent, 10);
    const newQuantity = existingQuantity + quantity;
    existingQuantityElement.textContent = newQuantity.toString();

    const newTotal = newQuantity * product.price;
    existingCartLine.querySelector('.total').textContent = formatPrice(newTotal);
  }
  
  // TODO hér þarf að athuga hvort lína fyrir vöruna sé þegar til
  else{
  const cartLine = createCartLine(product, quantity);
  cartTableBodyElement.appendChild(cartLine);
  }
  // Sýna efni körfu
  showCartContent(true);

  updateCartTotal();

}

function submitHandler(event) {
  // Komum í veg fyrir að form submiti
  event.preventDefault();
  
  // Finnum næsta element sem er `<tr>`
  const parent = event.target.closest('tr');

  // Það er með attribute sem tiltekur auðkenni vöru, t.d. `data-product-id="1"`
  const productId = Number.parseInt(parent.dataset.productId);

  // Finnum vöru með þessu productId
  const product = products.find((i) => i.id === productId);

  // TODO hér þarf að finna fjölda sem á að bæta við körfu með því að athuga
  // á input

  const quantityInput = parent.querySelector('input[type="number"]');

  if (!quantityInput) {
    console.warn('Gildi fannst ekki');
    return;
  }


  const quantity = parseInt(quantityInput.value, 10);

 
  if (isNaN(quantity) || quantity <= 0) {
    console.warn('Ólöglegt gildi');
    return;
  }
  

  // Bætum vöru í körfu (hér væri gott að bæta við athugun á því að varan sé til)
  addProductToCart(product, quantity);
}

// Finna öll form með class="add"
const addToCartForms = document.querySelectorAll('.add')

// Ítra í gegnum þau sem fylki (`querySelectorAll` skilar NodeList)
for (const form of Array.from(addToCartForms)) {
  // Bæta submit event listener við hvert
  form.addEventListener('submit', submitHandler);
}
function showReceipt(event) {
  event.preventDefault();
  const productsclass=document.querySelector('.products');
  const cart=document.querySelector('.cart');
  const receipt=document.querySelector('.receipt');
  if(productsclass && cart && receipt){
    productsclass.classList.add('hidden');
    cart.classList.add('hidden');
    receipt.classList.remove('hidden');
  } 
 
}

const receiptLink = document.querySelector('.takki');
if (receiptLink){
receiptLink.addEventListener('submit', showReceipt);
}

