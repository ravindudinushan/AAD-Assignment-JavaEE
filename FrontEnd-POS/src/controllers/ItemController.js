getAllItems();

$('#btnItemSave').click(function () {
    if (checkAll()) {
        saveItem();
    } else {
        alert("Please check the input fields");
    }
});

$("#btnItemUpdate").click(function () {
    let code = $("#txtItemCode").val();
    if (checkAll()) {
        updateItem(code);
    } else {
        alert("Please check the input fields")
    }
});

$("#btnItemDelete").click(function () {
    let code = $("#txtItemCode").val();

    let consent = confirm("Do you want to delete ?");
    if (consent) {
        let response = deleteItem(code);
        if (response) {
            clearItemInputFields()
            getAllItems();
            alert("Item Deleted");
        } else {
            alert("Item Not Removed. Invalid Item");
        }
    }
});

$("#btnItemClear").click(function () {
    clearItemInputFields();
});

function deleteItem(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {
            itemDB.splice(i, 1);
            return true;
        }
    }
    return false
}

function updateItem(code) {
    if (searchItem(code) == undefined) {
        alert("No such Item..please check the CODE");
    } else {
        let consentItem = confirm("Do you want to update this Item.?");
        if (consentItem) {
            let item = searchItem(code);

            let itemName = $("#txtItemName").val();
            let qtyOnHand = $("#txtItemQtyOnHand").val();
            let unitPrice = $("#txtItemPrice").val();

            item.description = itemName;
            item.qtyOnHand = qtyOnHand;
            item.unitPrice = unitPrice;

            getAllItems();
            clearItemInputFields()
        }
    }
}

function saveItem() {
    let itemCode = $("#txtItemCode").val();

    if (searchItem(itemCode.trim()) == undefined) {

        let itemName = $("#txtItemName").val();
        let qtyOnHand = $("#txtItemQtyOnHand").val();
        let unitPrice = $("#txtItemPrice").val();

        let newItem = Object.assign({}, item);

        newItem.code = itemCode;
        newItem.description = itemName;
        newItem.qtyOnHand = qtyOnHand;
        newItem.unitPrice = unitPrice;

        itemDB.push(newItem);
        clearItemInputFields()
        getAllItems();
        loadAllItemCodes();

    } else {
        alert("Item already exits !");
    }
}

$("#btnItemSearch").click(function () {
    if ($("#txtItemSearch") != null) {
        let option = $("#cmbItemSearch").val();

        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);

        if (option == "Code"){
            let itemByID = searchItemByCode($("#txtItemSearch").val());
            if (itemByID != null){
                setItemTextFieldValues(itemByID.code, itemByID.description, itemByID.qtyOnHand, itemByID.unitPrice);
            } else {
                alert("Invalid CODE");
            }
        } else if (option == "Name") {
            let itemByName = searchItemByName($("#txtItemSearch").val());
            if (itemByName != null){
                setItemTextFieldValues(itemByName.code, itemByName.description, itemByName.qtyOnHand, itemByName.unitPrice);
            } else {
                alert("Invalid Name");
            }
        }

    } else {
        alert("Please input CODE or Name")
    }

});

function searchItem(code) {
    return itemDB.find(function (item) {
        return item.code == code;
    });
}

function searchItemByCode(code) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].code == code) {

            let selectItem = Object.assign({}, item);
            selectItem.code = itemDB[i].code;
            selectItem.description = itemDB[i].description
            selectItem.qtyOnHand = itemDB[i].qtyOnHand
            selectItem.unitPrice = itemDB[i].unitPrice

            return selectItem;
        }
    }
    return null;
}

function searchItemByName(name) {
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].description == name) {

            let selectItem = Object.assign({}, item);
            selectItem.code = itemDB[i].code;
            selectItem.description = itemDB[i].description
            selectItem.qtyOnHand = itemDB[i].qtyOnHand
            selectItem.unitPrice = itemDB[i].unitPrice

            return selectItem;
        }
    }
    return null;
}

function getAllItems() {
    $("#tbody-item").empty();
    for (let i = 0; i < itemDB.length; i++) {
        let row = `<tr>
                <th>${itemDB[i].code}</th>
                <td>${itemDB[i].description}</td>
                <td>${itemDB[i].qtyOnHand}</td>
                <td>${itemDB[i].unitPrice}</td>
            </tr>`
        $("#tbody-item").append(row);
        bindItemEvents();
    }
    bindItemEvents();
}

function bindItemEvents() {
    $('#tbody-item>tr').click(function () {

        let itemRow = $(this);

        let itemCode = itemRow.children().eq(0).text();
        let itemName = itemRow.children().eq(1).text();
        let qtyOnHand = itemRow.children().eq(2).text();
        let unitPrice = itemRow.children().eq(3).text();

        setItemTextFieldValues(itemCode, itemName, qtyOnHand, unitPrice);
        $("#btnItemDelete").prop('disabled', false);
    });
}

function setItemTextFieldValues(code, name, qtyOnHand, unitPrice){
    $('#txtItemCode').val(code);
    $('#txtItemName').val(name);
    $('#txtItemQtyOnHand').val(qtyOnHand);
    $('#txtItemPrice').val(unitPrice);
}