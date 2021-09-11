import productDb, {
    bulkCreate,
    getData,
    createElement,
    sortObj
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

    productName.value = seller.value = price.value = "";
    getData(db.products, (data) => {
        userid.value = data.id + 1 || 1;
    });
    table()
}

// create event on read button
btnRead.addEventListener("click", table)

btnUpdate.addEventListener("click", () => {
    const id = parseInt(userid.value || 0);
    if (id) {
        db.products.update(id, {
            name: productName.value,
            seller: seller.value,
            price: price.value
        }).then((updated) => {
            let get = updated ? `data Updated` : `Couldn't update Data`
            console.log(get);
            table();
        })
    }
})

btnDelete.addEventListener('click', () => {
    db.delete()
    db = productDb('Productdb', {
        products: '++id ,name, seller, price'
    });
    //db.open();
    table();
    textBoxID(userid)
})


function table() {
    const tbody = document.getElementById("tbody")
    while (tbody.hasChildNodes()) {
        tbody.removeChild(tbody.firstChild)
    }



    getData(db.products, data => {
        if (data) {
            createElement("tr", tbody, tr => {
                for (const value in data) {
                    createElement("td", tr, td => {
                        td.textContent = data.price === data[value] ? `$${data[value]}` : data[value]


                    })
                }
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-edit btn-edit"
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = editBtn

                    })
                })
                createElement("td", tr, td => {
                    createElement("i", td, i => {
                        i.className += "fas fa-trash-alt btn-delete"
                        i.setAttribute(`data-id`, data.id)
                        i.onclick = deleteBtn
                    })
                })

            })
        }
    })

}

function editBtn(event) {
    let id = parseInt(event.target.getAttribute('data-id'))
    db.products.get(id, data => {
        console.log(sortObj(data))
        userid.value = data.id || 0
        productName.value = data.name || ""
        seller.value = data.seller || ""
        price.value = data.price || ""
    })
}

function deleteBtn(event) {
    let id = parseInt(event.target.getAttribute('data-id'))
    db.products.delete(id);
    table();
}

window.onload = () => {
    textBoxID(userid)
    table()
};

function textBoxID(textboxid) {
    getData(db.products, data => {
        textboxid.value = data.id + 1 || 1
    })
}