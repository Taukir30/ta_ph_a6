//empty cart array
let cart = [
    
];

//loading all plants by default(1)
const loadAllPlants = async() => {                                                  //calling api with async function
    let res = await fetch('https://openapi.programming-hero.com/api/plants');
    let json = await res.json();                                                   //converting raw api into json

    showAllPlants(json.plants);                                                     //calling showing function(2) with data passing

    toggleActive(0);                                                                //calling toggle fucntion for 1st category button
}
loadAllPlants()                                                                     //calling loader function

//showing all plants in dom(2)
const showAllPlants = (plants) => {
    let cardHolder = document.getElementById('card_holder');
    cardHolder.innerHTML = "";

    for( let plant of plants) {
        let card = document.createElement('div');
        card.classList.add('card', 'bg-base-100', 'shadow-sm', 'p-2', 'h-75');
        // card.onclick = () => plantDetail(plant.id);

        card.innerHTML = `<figure class="rounded-md mb-2">
                            <img src="${plant.image}" alt="Shoes" />
                        </figure>
                        <div class="card-body p-0 ">
                            <h2 onclick="plantDetail(${plant.id})" class="card-title text-sm hover:cursor-pointer">${plant.name}</h2>
                            <p class="text-[9px] tracking-tight text-gray-600 ">${plant.description}</p>
                            <div class="cat_price flex justify-between">
                                <div class="badge badge-soft bg-[#DCFCE7] border-none text-green-600 text-xs font-semibold rounded-xl">
                                    ${plant.category}</div>
                                <div class="badge badge-ghost text-xs font-semibold">৳<span>${plant.price}</span></div>
                            </div>
                            <div class="card-actions justify-end">
                                <button onclick="addToCart(${plant.id})" class="btn w-full rounded-3xl bg-[#15803D] text-white font-normal text-xs h-8">Add
                                    to Cart</button>
                            </div>
                        </div>`;

        cardHolder.append(card);
    }
}

// loding categories api data(3)
const loadCategory = () => {
    fetch('https://openapi.programming-hero.com/api/categories')
        .then( res => res.json() )
        .then( json => showCategories(json.categories) )
}
loadCategory()

// showing categories in dom(4)
const showCategories = (categories) => {
    let categoryMenu = document.getElementById('category_menu');

    for(let catrgory of categories) {
        // console.log(catrgory.id)
        let categoryItem = document.createElement('li');
        categoryItem.innerHTML = `<a onclick="loadPlants(${catrgory.id})" id="cat_btn${catrgory.id}" class="cat_btn hover:bg-[#CFF0DC] text-sm">${catrgory.category_name}</a>`;
        categoryMenu.append(categoryItem);
    }
}

// loading plants by category api (5)
const loadPlants = (id) => {
        console.log(id)
    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then( res => res.json() )
        .then( json => showAllPlants(json.plants) )                 //calling show plant function(2) with new plant data by category

        toggleActive(id);                                           //calling toggle function(6)
}

//toggle active function(6)
function toggleActive(id){
    let catBtns = document.querySelectorAll('.cat_btn');
    catBtns.forEach( btn => btn.classList.remove('active') );
    document.getElementById(`cat_btn${id}`).classList.add('active');
}

//loading single plant details(7)
const plantDetail = async(id) => {
    let res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
    let json = await res.json();
    // console.log(json)
    showModal(json.plants);
}

//showing plant in modal(8)
const showModal = (plant) => {
    // let modal = document.getElementById('tree_modal');
    let modalBox = document.getElementById('modal-box');
    // modalBox.classList.add('modal-box');

    modalBox.innerHTML = `<div class="h-[200px] rounded-md mb-2 bg-[url('${plant.image}')] bg-cover bg-center w-full"></div>
                        <div class="card-body p-0 ">
                            <h2 class="card-title text-sm">${plant.name}</h2>
                            <p class="text-[12px] tracking-tight text-gray-800 ">${plant.description}</p>
                            <div class="cat_price flex justify-between">
                                <div class="badge badge-soft bg-[#DCFCE7] border-none text-green-600 text-xs font-semibold rounded-xl">
                                    ${plant.category}</div>
                                <div class="badge badge-ghost text-xs font-semibold">৳<span>${plant.price}</span></div>
                            </div>
                        </div>

                        <div class="modal-action">
                            <form method="dialog">
                                <!-- if there is a button in form, it will close the modal -->
                                <button class="btn">Close</button>
                            </form>
                        </div>`
    
    document.getElementById('tree_modal').showModal();
}

//show cart function 
const showCart = () => {
    let itemHolder = document.getElementById('item_holder');
    
    itemHolder.innerHTML = "";

    let totalPrice = 0;

    // console.log(cart)
    for(let product of cart){
        let item = document.createElement('div');
        item.classList.add('item', 'flex', 'justify-between', 'p-2', 'bg-[#F0FDF4]', 'rounded-md', 'my-2');

        item.innerHTML = `<div class="item_body">
                            <h2 class="font-semibold text-xs mb-1">${product.name}</h2>
                            <p class="text-sm text-gray-500">৳<span>${product.price}</span> x <span>${product.qty}</span></p>
                        </div>
                        <button onclick="del(${product.id})" class="text-gray-500 hover:text-red-600 hover:cursor-pointer">x</button>`

        itemHolder.append(item);

        let itemPrice = product.price * product.qty;
        totalPrice += itemPrice; 
    }
    
    document.getElementById('total').innerText = totalPrice;
}
// showCart()

//add to cart function
async function addToCart(id){                                                           //getting id from 'add to cart' button
    let res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);      //fetching data 
    let json = await res.json();
    let plant = json.plants;
    
    // console.log(plant.id)
    let singleItem = {"id":plant.id, "name":plant.name, "price":plant.price, "qty":1};  //making single cart item to push

    let found=cart.find( item => {                                                      //checking if the item already in cart or not
        return item.id==id;
    })

    if(found==null){
        cart.push(singleItem);                                                          //if not in cart then push
    }else{
        found.qty++;                                                                    //if already in cart then increase qty
    }

    showCart()
}

//delete from cart function
function del(id){
    // console.log(id)
    let index = cart.findIndex( item=>{
        return item.id==id;
    })
    console.log(index)

    cart.splice(index,1);
    showCart();
}


