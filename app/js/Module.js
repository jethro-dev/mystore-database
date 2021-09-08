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

    //debug only price input also validate
    for (let value in object) {
        if (object[value] != "" && object.hasOwnProperty(value)) {
            flag = true;
        } else {
            flag = false;
        }
    }
    return flag;
}

export default productDb
export {
    bulkCreate
}