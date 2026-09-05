const discountProducts = document.getElementById("discountProducts");

function renderDiscountProducts(content, data) {
    if (!content) return;

    // Filter by discount > 0 and display the first 4 items to fit the layout
    data.filter((el) => el.discount > 0).slice(0, 4).map((el) => {
        // Adjust the image path to work from index.html (root directory)
        const imagePath = el.images[0].replace(/^\.\.\//, "./");

        // Calculate the discounted price
        const discountedPrice = Math.round(el.price * (1 - el.discount / 100));

        content.innerHTML += `
        <div class="py-[8px] px-[8px] rounded-[4px] bg-[white] flex flex-col justify-between w-[272px]">
            <img class="w-full h-[160px] object-contain mb-[8px]" src="${imagePath}" alt="${el.name}">
            <div>
                <div class="flex items-center justify-between">
                     <h1 class="text-[18px] font-[700]">${discountedPrice}₽</h1>
                <p class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">${el.price}₽</p>
                </div>
                <h2 class="text-[12px] font-[400] text-[#BFBFBF] mb-[8px]">С картой (-${el.discount}%)</h2>
                <p class="text-[16px] font-[400] max-w-[256px] mb-[8px]">${el.name}</p>
                <img class="mb-[8px]" src="./images/rating.png" alt="rating">
            </div>
            <button class="max-w-[256px] w-full font-[400] text-[16px] text-[#70C05B] py-[8px] px-[40px] border border-[#70C05B] rounded-[4px] text-center hover:bg-[#70C05B] hover:text-white transition-colors cursor-pointer mt-auto">В корзину</button>
        </div>
        `;
    });
}

if (typeof products !== "undefined") {
    renderDiscountProducts(discountProducts, products);
}
