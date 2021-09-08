import productDb, {
    bulkCreate
} from './Module.js'

let db = productDb('Productdb', {
    products: '++id ,name, seller, price'
});

//input tags
const userid = document.querySelector("#userid");
const productName = document.querySelector("#productName");
const seller = document.querySelector("#seller");
const price = document.querySelector("#price");

// buttons
const btnCreate = document.querySelector('#btn-create');
const btnUpdate = document.querySelector('#btn-update');
const btnRead = document.querySelector('#btn-read');
const btnDelete = document.querySelector('#btn-delete');


// Insert value using Create button
// btnCreate.addEventListener('click', bulkCreate(db.products, {
//     name: productName.ariaValueMax,
//     seller: seller.value,
//     price: price.value
// }))

btnCreate.onclick = (event) => {
    let flag = bulkCreate(db.products, {
        name: productName.value,
        seller: seller.value,
        price: price.value
    })
    console.log(flag)
}