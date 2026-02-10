// Mobile Menu Toggle
const btn = document.querySelector("button.mobile-menu-button");
const menu = document.querySelector(".mobile-menu");

if(btn && menu) {
    btn.addEventListener("click", () => {
        menu.classList.toggle("hidden");
    });
}

// Scroll Animation
document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-10');
               // observer.unobserve(entry.target); // Keep animating or stop? Standard is to animate once.
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    // We didn't add this class to HTML yet, but good for future.
    // Let's add simple fade-in class to major sections in style override or inline.
});


// Dining Page - Simple Cart Logic
let cart = [];

function addToOrder(name, price) {
    cart.push({name, price});
    updateCartIcon();
    alert(`${name} added to your order!`);
}

function updateCartIcon() {
    const count = document.getElementById('cart-count');
    if(count) {
        count.innerText = cart.length;
        count.classList.add('animate-ping');
        setTimeout(() => count.classList.remove('animate-ping'), 300);
    }
}

function openOrder() {
    const modal = document.getElementById('order-modal');
    const list = document.getElementById('order-items');
    const totalEl = document.getElementById('order-total');
    
    if(!modal) return;

    list.innerHTML = '';
    let total = 0;

    if(cart.length === 0) {
        list.innerHTML = '<p class="text-gray-500 text-center">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            const div = document.createElement('div');
            div.className = 'flex justify-between items-center border-b pb-2';
            div.innerHTML = `
                <span>${item.name}</span>
                <div class="flex items-center">
                    <span class="font-bold mr-4">$${item.price}</span>
                    <button onclick="removeFromOrder(${index})" class="text-red-500 hover:text-red-700 text-sm">Remove</button>
                </div>
            `;
            list.appendChild(div);
        });
    }

    totalEl.innerText = '$' + total;
    modal.classList.remove('hidden');
}

function removeFromOrder(index) {
    cart.splice(index, 1);
    openOrder(); // Re-render
    updateCartIcon();
}

function closeOrder() {
    document.getElementById('order-modal').classList.add('hidden');
}

function checkout() {
    if(cart.length === 0) {
        alert("Cart is empty!");
        return;
    }
    alert("Order placed successfully! The kitchen will prepare your food.");
    cart = [];
    updateCartIcon();
    closeOrder();
}
