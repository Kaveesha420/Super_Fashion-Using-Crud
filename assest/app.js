document.addEventListener('DOMContentLoaded', function () {
    displayCartItems();
});


let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, productPrice, productImage) {
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: parseFloat(productPrice.replace('Rs.', '').replace(',', '')),
            image: productImage,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} added to cart!`);
}

function displayCartItems() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <tr id="empty-cart">
                <td colspan="6">Your cart is empty</td>
            </tr>
        `;
        if (totalElement) totalElement.textContent = 'Total: Rs. 0';
        return;
    }

    let total = 0;
    cartContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span class="remove-item" onclick="removeFromCart(${index})">❌</span></td>
            <td><img src="${item.image}" alt="${item.name}"></td>
            <td>${item.name}</td>
            <td>Rs.${item.price.toLocaleString()}</td>
            <td><input type="number" min="1" value="${item.quantity}" 
                 onchange="updateQuantity(${index}, this.value)"></td>
            <td>Rs.${subtotal.toLocaleString()}</td>
        `;
        cartContainer.appendChild(row);
    });

    if (totalElement) {
        totalElement.textContent = `Total: Rs.${total.toLocaleString()}`;
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCartItems();
}

function updateQuantity(index, newQuantity) {
    const quantity = parseInt(newQuantity);
    if (quantity > 0) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
    }
}

function checkout() {
    alert('Order placed successfully!');
    cart = [];
    localStorage.removeItem('cart');
    displayCartItems();
}