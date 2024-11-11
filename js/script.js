document.addEventListener("DOMContentLoaded", function() {
    createItemDescription();
});

function createItemDescription(){
    fetch('./js/itens.json')
        .then(response => {
            if (!response.ok) throw new Error("Arquivo JSON não encontrado");
            return response.json();
        })
        .then(data => {
            const item = data[0];
            for(let i = 1; i <= 8; i++){
                let elemento = document.getElementById(`op${i}`);
                if (!elemento) continue;
                let h3 = document.createElement("h3");
                h3.textContent = item.title;
                let p = document.createElement("p");
                p.textContent = item.department;
                let price = document.createElement("p");
                price.textContent = `${item.price} `;
                let discountedPrice = document.createElement("span");
                discountedPrice.textContent = item.discountedPrice;
                price.appendChild(discountedPrice);
                let colorContainer = document.createElement("div");
                colorContainer.style.display = "flex";
                colorContainer.style.gap = "10px";
                Object.values(item.colorPalette).forEach(colorCode => {
                    let colorButton = document.createElement("button");
                    colorButton.style.width = "30px";
                    colorButton.style.height = "30px";
                    colorButton.style.borderRadius = "50%";
                    colorButton.style.backgroundColor = colorCode;
                    colorButton.style.border = "none";
                    colorButton.style.cursor = "pointer";
                    colorButton.addEventListener("click", () => {
                        alert(`Você clicou na cor: ${colorCode}`);
                    });
                    colorContainer.appendChild(colorButton);
                });
                elemento.append(h3, p, price, colorContainer);
            }
        })
        .catch(error => console.error("Erro ao buscar dados:", error));
}


