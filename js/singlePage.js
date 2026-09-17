let path = new URLSearchParams(window.location.search);
let productId = Number(path.get("id"));
let singleProduct = products.find((el) => Number(el.id) === productId);
let renderSingleProduct = document.getElementById("renderSingleProduct");

if (!renderSingleProduct) {
    throw new Error("renderSingleProduct element not found")
}

function renderSingle() {
    if (!singleProduct) {
        renderSingleProduct.innerHTML = `<p class="text-center text-xl text-gray-500">Product not found</p>`;
        return;
    }

    const cartItem = cart.find((el1) => el1.id === singleProduct.id);

    renderSingleProduct.innerHTML = `
        <div class="flex items-center justify-center pt-[50px]">
            <div class="w-full">
                <img src="${singleProduct.images[0]}" alt="${singleProduct.name}">
            </div>
            <div class="w-full">
                <h1 class="text-[25px] font-bold">${singleProduct.name}</h1>
                <p class="text-[16px] text-[grey]">${singleProduct.description}</p>
                <p class="text-[20px] font-bold">${singleProduct.price}</p>
                ${cartItem ? `
                    <div class="flex items-center justify-between border border-[#70C05B] rounded-[4px] overflow-hidden">
                        <button onClick="decrease(${singleProduct.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                            -
                        </button>
                        <span class="flex-1 text-center text-[16px] font-[500]">
                            ${cartItem.qty}
                        </span>
                        <button onClick="increase(${singleProduct.id})" class="w-[40px] h-[36px] font-[600] text-[18px] text-[#70C05B] hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer">
                            +
                        </button>
                    </div>
                ` : `
                    <div>
                        <button onClick="addToCart(${singleProduct.id})" class="w-full font-[400] text-[16px] text-[#70C05B] py-[8px] px-[16px] border border-[#70C05B] rounded-[4px] text-center hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer mt-auto">
                            В корзину
                        </button>
                    </div>
                `}
            </div>
        </div>
    `;
}

renderSingle();