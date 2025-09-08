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
        card.classList.add('card', 'bg-base-100', 'shadow-sm', 'p-2', 'h-75')
        
        card.innerHTML = `<figure class="rounded-md mb-2">
                            <img src="${plant.image}" alt="Shoes" />
                        </figure>
                        <div class="card-body p-0 ">
                            <h2 class="card-title text-sm">${plant.name}</h2>
                            <p class="text-[9px] tracking-tight text-gray-600 ">${plant.description}</p>
                            <div class="cat_price flex justify-between">
                                <div class="badge badge-soft bg-[#DCFCE7] border-none text-green-600 text-xs font-semibold rounded-xl">
                                    ${plant.category}</div>
                                <div class="badge badge-ghost text-xs font-semibold">৳<span>${plant.price}</span></div>
                            </div>
                            <div class="card-actions justify-end">
                                <button class="btn w-full rounded-3xl bg-[#15803D] text-white font-normal text-xs h-8">Add
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



