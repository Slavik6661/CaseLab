const products = [
    {
        id: 1,
        title: 'Lenovo Yoga',
        price: 3000,
    },
    {
        id: 2,
        title: 'Acer Aspire',
        price: 1800,
    },
    {
        id: 3,
        title: 'Dell Vostro',
        price: 3400
    },
];

let order = [];
let totalPrice=0
function addToBasket(productId) {
    // TODO: добавить проверку наличия товара в заказе (при наличии выдать alert, что товар уже в корзине)
    // TODO: если товар еще не в корзине, добавить его из массива products
    if(order.includes(products[productId-1])){
        console.log('error');
    }else{
        order.push(products[productId-1])
        totalPrice+=products[productId-1].price
    }
    
    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice(productId);
}

function removeFromBasket(productId) {
    // TODO: описать логику удаления товара из корзины
    let product=order.findIndex(item=>item.id===productId)
    let idElement=products[productId-1]
    let index
    if(product!==-1){
        order.forEach((e=>{
            if(e.id===productId){
                index=order.indexOf(e);  
                 
            }
        })) 
        totalPrice=Number(totalPrice-idElement.price)
        order.splice(index,1)
       
        
    }
   
    // Эти строчки не трогаем, они отвечают за переотрисовку страницы
    renderCart();
    rerenderTotalPrice(totalPrice);
}


function rerenderTotalPrice() { 
   
    document.getElementById('total').innerText = totalPrice;
}

// Этот метод остается без изменений
function renderCart() {
    const cart = document.getElementById('basket-items');

    cart.innerHTML = '';
    order.forEach(item => {
        const el = document.createElement('li');
        el.innerText = item.title;
        el.onclick = () => removeFromBasket(item.id);
        cart.appendChild(el);
    })
}