let dropDownMenu = document.getElementById("drop-down-category");
let category = document.getElementById("category");
let simpleProducts = document.getElementById("simpleProducts");
const cartData = localStorage.getItem("cart");
let cart = cartData ? JSON.parse(cartData) : [];
let badge = document.getElementById("badge");
let korzinaProducts = document.getElementById("korzinaProducts");
console.log("korzina: ", cart);
localStorage.setItem("cart", JSON.stringify(cart));
if (badge) badge.textContent = cart ? cart.length : 0;
const discountProducts = document.getElementById("discountProducts");
const resMenu = document.getElementById("res-menu");
const newProducts = document.getElementById("newProducts");



if (dropDownMenu) {
    dropDownMenu.addEventListener("click", function () {
        resMenu.classList.toggle("translate-y-[-100%]")
    })
}

if (category) {
    categoriesData.map((el) => {
        category.innerHTML += `
            <div class="containrflex items-center gap-3 p-5">
                <div class="w-10 h-10 rounded-full overflow-hidden">
                    <img class="w-full h-full object-cover" src="${el.imageUrl}" alt="">
                </div>
                <p class="text-[20px]">${el.name}</p>
            </div>
            `
    })
}


function renderDiscountProducts(content, data) {
    if (content) content.innerHTML = "";
    data.filter((el) => el.discount > 0).slice(0, 4).map((el) => {
        const imagePath = el.images[0].replace(/^\.\.\//, "./");

        const discountedPrice = Math.round(el.price * (1 - el.discount / 100));

        if (content) content.innerHTML += `

        <div class="py-[8px] px-[8px] rounded-[4px] bg-[white] flex flex-col justify-between max-w-[572px] w-full">
            <a href=./pages/singlePage.html?id=${el.id}>
            <div class=" h-[160px] w-full">
                <img class="w-full h-full object-cover mb-[8px]" src="${imagePath}" alt="${el.name}">
            </div> 
            </a>        
            <div>
                <div class="flex items-center justify-between">
                     <h1 class="text-[18px] font-[700]">${discountedPrice}₽</h1>
                <p class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">${el.price}₽</p>
                </div>
                <h2 class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">С картой (-${el.discount}%)</h2>
                <p class="text-[16px] font-[400] max-w-[256px] mb-[8px]">${el.name}</p>
                <img class="mb-[8px]" src="./images/rating.png" alt="rating">
            </div>
            ${(() => {
                const cartItem = cart.find((el1) => el1.id === el.id); return cartItem ? `<div class="flex items-center justify-between border border-[#70C05B] rounded-[4px] overflow-hidden">
                <button onClick="decrease(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                -
                </button>
                <span class="flex-1 text-center text-[16px] font-[500]">
                ${cartItem.qty}
                </span>
                <button onClick="increase(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                +
                </button>
            </div>` : `<div>
                <button onClick="addToCart(${el.id})" class="w-full font-[400] text-[16px] text-[#70C05B] py-[8px] px-[16px] border border-[#70C05B] rounded-[4px] text-center hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer mt-auto">
                В корзину
                </button>
            </div>`;
            })()}
        </div>

        `;
    })

}

function renderProducts(content, data) {
    if (content) content.innerHTML = "";
    data.slice(4, 8).map((el) => {
        const imagePath = el.images[0].replace(/^\.\.\//, "./");
        const discountedPrice = Math.round(el.price * (1 - el.discount / 100));
        if (content) content.innerHTML += `
        <div class="py-[8px] px-[8px] rounded-[4px] bg-[white] flex flex-col justify-between max-w-[572px] w-full">
            <a href="./pages/singlePage.html?id=${el.id}">
               <div class=" h-[160px] w-full">
                <img class="w-full h-full object-cover mb-[8px]" src="${imagePath}" alt="${el.name}">
               </div>
            </a>
            <div>
                <div class="flex items-center justify-between">
                     <h1 class="text-[18px] font-[700]">${discountedPrice}₽</h1>
                <p class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">${el.price}₽</p>
                </div>
                <h2 class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">С картой (-${el.discount}%)</h2>
                <p class="text-[16px] font-[400] max-w-[256px] mb-[8px]">${el.name}</p>
                <img class="mb-[8px]" src="./images/rating.png" alt="rating">
            </div>
            ${(() => {
                const cartItem = cart.find((el1) => el1.id === el.id); return cartItem ? `<div class="flex items-center justify-between border border-[#70C05B] rounded-[4px] overflow-hidden">
                <button onClick="decrease(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                -
                </button>
                <span class="flex-1 text-center text-[16px] font-[500]">
                ${cartItem.qty}
                </span>
                <button onClick="increase(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                +
                </button>
            </div>` : `<div>
                <button onClick="addToCart(${el.id})" class="w-full font-[400] text-[16px] text-[#70C05B] py-[8px] px-[16px] border border-[#70C05B] rounded-[4px] text-center hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer mt-auto">
                В корзину
                </button>
            </div>`;
            })()}
        </div>
        `

    })
}

function rendernewProducts(content, data) {
    if (content) content.innerHTML = "";
    data.slice(8, 12).map((el) => {
        const imagePath = el.images[0].replace(/^\.\.\//, "./");
        const discountedPrice = Math.round(el.price * (1 - el.discount / 100));
        if (content) content.innerHTML += `
        <div class="py-[8px] px-[8px] rounded-[4px] bg-[white] flex flex-col justify-between max-w-[572px] w-full">
            <a href=./pages/singlePage.html?id=${el.id}>
            <div class=" h-[160px] w-full">
                <img class="w-full h-full object-cover mb-[8px]" src="${imagePath}" alt="${el.name}">
            </div>
            </a>
            <div>
                <div class="flex items-center justify-between">
                     <h1 class="text-[18px] font-[700]">${discountedPrice}₽</h1>
                <p class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">${el.price}₽</p>
                </div>
                <h2 class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">С картой (-${el.discount}%)</h2>
                <p class="text-[16px] font-[400] max-w-[256px] mb-[8px]">${el.name}</p>
                <img class="mb-[8px]" src="./images/rating.png" alt="rating">
            </div>
            ${(() => {
                const cartItem = cart.find((el1) => el1.id === el.id); return cartItem ? `<div class="flex items-center justify-between border border-[#70C05B] rounded-[4px] overflow-hidden">
                <button onClick="decrease(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                -
                </button>
                <span class="flex-1 text-center text-[16px] font-[500]">
                ${cartItem.qty}
                </span>
                <button onClick="increase(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                +
                </button>
            </div>` : `<div>
                <button onClick="addToCart(${el.id})" class="w-full font-[400] text-[16px] text-[#70C05B] py-[8px] px-[16px] border border-[#70C05B] rounded-[4px] text-center hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer mt-auto">
                В корзину
                </button>
            </div>`;
            })()}
        </div>
        `

    })
}

function renderkorzinaProducts(content, data) {
    if (content) content.innerHTML = "";
    data.map((el) => {
        const imagePath = el.images[0];
        if (content) content.innerHTML += `
        <div class="p-5 flex max-w-[600px] w-full items-center gap-5">
           <div class="max-w-[150px] h-[150px] w-full">
                <img class="w-full h-full object-cover" src="${imagePath}" alt="${el.name}">
           </div>
           <div>
                <h1 class="text-[25px] font-bold">${el.name}</h1>
                <p>${el.description}</p>
                <p class="text-[#70C05B]">${el.price}</p>
                <div>
                     ${(() => {
                const cartItem = cart.find((el1) => el1.id === el.id); return cartItem ? `<div class="flex items-center justify-between border border-[#70C05B] rounded-[4px] overflow-hidden">
                <button onClick="decrease(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                -
                </button>
                <span class="flex-1 text-center text-[16px] font-[500]">
                ${cartItem.qty}
                </span>
                <button onClick="increase(${el.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                +
                </button>
            </div>` : `<div>
                <button onClick="addToCart(${el.id})" class="w-full font-[400] text-[16px] text-[#70C05B] py-[8px] px-[16px] border border-[#70C05B] rounded-[4px] text-center hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                В корзину
                </button>
            </div>`;
            })()}
                </div>
           </div>
        </div>
        `
    })
}

renderProducts(simpleProducts, products);
renderDiscountProducts(discountProducts, products);
renderkorzinaProducts(korzinaProducts, cart);
rendernewProducts(newProducts, products);

function addToCart(id) {
    let existing = cart.find((el) => el.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        let item = products.find((el) => el.id === id);
        item.qty = 1;
        cart.push(item);
        if (badge) badge.textContent = cart.length;
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProducts(simpleProducts, products);
    renderDiscountProducts(discountProducts, products);
    renderkorzinaProducts(korzinaProducts, cart);
    rendernewProducts(newProducts, products);
    if (typeof renderSingle === "function") renderSingle();
}

function increase(id) {
    let item = cart.find((el) => el.id === id);
    item.qty += 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderProducts(simpleProducts, products);
    renderDiscountProducts(discountProducts, products);
    renderkorzinaProducts(korzinaProducts, cart);
    rendernewProducts(newProducts, products);
    if (typeof renderSingle === "function") renderSingle();
}

function decrease(id) {
    let item = cart.find((el) => el.id === id);
    item.qty -= 1;
    if (item.qty <= 0) {
        cart = cart.filter((el) => el.id != id);
        if (badge) badge.textContent = cart.length;
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    renderProducts(simpleProducts, products);
    renderDiscountProducts(discountProducts, products);
    renderkorzinaProducts(korzinaProducts, cart);
    rendernewProducts(newProducts, products);
    if (typeof renderSingle === "function") renderSingle();
}
