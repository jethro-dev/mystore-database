// create database
function productDb(dbname, table) {
    const db = new Dexie(dbname);
    db.version(1).stores(table);
    db.open();

    console.log('DB created.')
    return db;
}

// Insert function
function bulkCreate(dbtable, data) {
    let flag = empty(data)
    if (flag) {
        dbtable.bulkAdd([data])
        console.log("data inserted successfully")
    } else {
        console.log("Please provide data.")
    }

    return flag;
}

// check textbox validation
function empty(object) {
    let flag = false;


    for (let value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true;
        } else {
            flag = false;
            return flag;
        }
    }
    return flag;
}

// Get data from database
function getData(dbtable, fn) {
    let index = 0;
    let obj = {};
    dbtable.count(count => {
        if (count) {
            dbtable.each(table => {
                obj = sortObj(table)
                fn(obj, index++)
            })
        } else {
            fn(0)
        }
    })
}

// Sort data obj
function sortObj(sortObj) {
    let obj = {};
    obj = {
        id: sortObj.id,
        name: sortObj.name,
        seller: sortObj.seller,
        price: sortObj.price
    }

    return obj
}

//Create dynamic element
function createElement(tagname, appendTo, fn) {
    const element = document.createElement(tagname);
    if (appendTo) appendTo.appendChild(element);
    if (fn) fn(element);

}

export default productDb
export {
    bulkCreate,
    getData,
    createElement,
    sortObj
}