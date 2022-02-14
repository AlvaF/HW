const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

// let getRequest = (url, cb) => {
//     let xhr = new XMLHttpRequest();
//     // window.ActiveXObject -> xhr = new ActiveXObject()
//     xhr.open("GET", url, true);
//     xhr.onreadystatechange = () => {
//         if(xhr.readyState === 4){
//             if(xhr.status !== 200){
//                 console.log('Error');
//             } else {
//                 cb(xhr.responseText);
//             }
//         }
//     };
//     xhr.send();
// };

class ProductsList {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];//массив товаров из JSON документа
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                //                 console.log(data);
                this.render()
            });
    }
    // _fetchProducts(cb){
    //     getRequest(`${API}/catalogData.json`, (data) => {
    //         this.goods = JSON.parse(data);
    //         console.log(this.goods);
    //         cb();
    //     })
    // }
    _getProducts() {

        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });

    }
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            const productObj = new ProductItem(product);
            //            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }

    }
}


class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
        this.img = img;
    }
    render() {
        return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <div class="desc">
                    <h3>${this.title}</h3>
                    <p>${this.price} $</p>
                    <button class="buy-btn">Купить</button>
                </div>
            </div>`
    }
}

class Cart {
    constructor(container = '.cart-products') {
        this.container = container;
        this.products = []

        this.PressCart();
        this.GetBasket()
            .then(item => {
                this.products = item.contents;
                this.render();
            })
    }
    GetBasket() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
    }
    render() {
        const div = document.querySelector(this.container);
        for (let item of this.products) {
            const Obj = new CartItem();
            div.insertAdjacentHTML('beforeend', Obj.render(item));
        }
    }
    PressCart() {
        document.querySelector(".btn-cart").addEventListener('click', () => {
            document.querySelector(this.container).classList.toggle('visible');
        })
    }
}
class CartItem {
    render(item, img = 'https://picsum.photos/50/50?random=1') {
        return `<div class="cart-product" data-id="${item.id_product}">
                <img src="${img}" alt="Photo">
                <h4>${item.product_name}</h4>
                <span>Количество: ${item.quantity}</span> <br>
                <span>Цена: ${item.price} </span>
                </div>`
    }
}
let list = new ProductsList();
console.log(list.allProducts);
let cart = new Cart;

