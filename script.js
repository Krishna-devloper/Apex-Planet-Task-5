document.addEventListener('DOMContentLoaded', () => {
    // Burger menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    burger.addEventListener('click', ()=> nav.classList.toggle('active'));

    // Cart sidebar
    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCart = document.getElementById('close-cart');
    cartBtn.addEventListener('click', ()=> cartSidebar.classList.add('active'));
    closeCart.addEventListener('click', ()=> cartSidebar.classList.remove('active'));

    // Static products using local images
    const products = [
        {id:1, name:"Red Shirt", price:25, logo:"Images/red-shirt.webp"},
        {id:2, name:"Blue Jeans", price:40, logo:"Images/blue-jeans.webp"},
        {id:3, name:"Sneakers", price:60, logo:"Images/sneakers.webp"},
        {id:4, name:"Green Hoodie", price:50, logo:"Images/green-hoodie.webp"},
        {id:5, name:"Black Cap", price:15, logo:"Images/black-cap.jpg"},
        {id:6, name:"Yellow Backpack", price:70, logo:"Images/yellow-backpack.webp"}
    ];

    const productGrid = document.getElementById('product-grid');
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];

    function renderProducts() {
        productGrid.innerHTML = '';
        products.forEach(p=>{
            const card = document.createElement('div');
            card.className = 'product-card';
            card.innerHTML = `
                <img src="${p.logo}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p>$${p.price}</p>
                <button data-id="${p.id}">Add to Cart</button>
            `;
            productGrid.appendChild(card);
        });
    }

    function updateCart() {
        cartItems.innerHTML = '';
        if(cart.length===0){
            cartItems.innerHTML = "<p>Cart is empty</p>";
            cartTotal.textContent = "";
            document.getElementById('cart-count').textContent = 0;
            return;
        }
        let total = 0;
        cart.forEach(item=>{
            total += item.price * item.qty;
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `
                ${item.name} - $${item.price} x ${item.qty} 
                <span>
                    <button class="increase" data-id="${item.id}">+</button>
                    <button class="decrease" data-id="${item.id}">-</button>
                </span>
            `;
            cartItems.appendChild(div);
        });
        cartTotal.textContent = `Total: $${total}`;
        document.getElementById('cart-count').textContent = cart.reduce((acc,i)=>acc+i.qty,0);
    }

    productGrid.addEventListener('click', e=>{
        if(e.target.tagName==='BUTTON'){
            const id = parseInt(e.target.dataset.id);
            const existing = cart.find(i=>i.id===id);
            if(existing){ existing.qty += 1; }
            else{
                const product = {...products.find(p=>p.id===id), qty:1, id:id};
                cart.push(product);
            }
            updateCart();
        }
    });

    cartItems.addEventListener('click', e=>{
        if(e.target.classList.contains('increase') || e.target.classList.contains('decrease')){
            const id = parseInt(e.target.dataset.id);
            const item = cart.find(i=>i.id===id);
            if(e.target.classList.contains('increase')) item.qty +=1;
            if(e.target.classList.contains('decrease')) item.qty -=1;
            cart = cart.filter(i=>i.qty>0);
            updateCart();
        }
    });

    renderProducts();
    updateCart();
});
