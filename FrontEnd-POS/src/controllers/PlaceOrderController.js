loadAllCustomerIds();
loadAllItemCodes();
setDataToOrderDate();
getAllCartData();



function generateNextOrderId() {

}

function setDataToOrderDate() {
    let today = new Date();
    let year = today.getFullYear();
    let month = String(today.getMonth() + 1).padStart(2, '0');
    let day = String(today.getDate()).padStart(2, '0');
    let orderDate = `${day}-${month}-${year}`;
    $('#txtOrderDate').val(orderDate);
}

$('#cmbCustomerIds').click(function () {
    //setCustomerDetails ///////////////////////////////////////////////////
    let id = $('#cmbCustomerIds').val();

    for (let customer of customerDB) {
        if (customer.id == id) {
            $('#lblCustomerName').text(customer.name);
            $('#lblCustomerAddress').text(customer.address);
        }
    }
});

$("#cmbItemCodes").click(function () {
    //setItemDetails ///////////////////////////////////////////////////
    let code = $("#cmbItemCodes").val();

    for (let item of itemDB) {
        if (item.code == code) {
            $('#lblItemName').text(item.description);
            $('#lblItemUnitPrice').text(item.unitPrice);
            $('#lblQtyOnHand').text(item.qtyOnHand);
        }
    }
});

function loadAllCustomerIds(){
    $("#cmbCustomerIds").empty();
    $("#cmbCustomerIds").append(`<option selected></option>`);
    for (let customer of customerDB) {
        $("#cmbCustomerIds").append(`<option value="${customer.id}">${customer.id}</option>`);
    }
}

function loadAllItemCodes(){
    $("#cmbItemCodes").empty();
    $("#cmbItemCodes").append(`<option selected></option>`);
    for (let item of itemDB) {
        $("#cmbItemCodes").append(`<option value="${item.code}">${item.code}</option>`);
    }
}

// Add To Cart ////////////////////////////////////////////////////////////////////////////////////////
$('#btnAddToCart').click(function () {
    setDataToCartTable();
});

function searchItemIsExits(code) {
    return CartDB.find(function (cart) {
        return cart.itemCode == code;
    });
}

function getAllCartData() {
    $('#tbody-orderCart').empty();
    for (let cartRow of CartDB) {
        let row = `<tr>
            <th>${cartRow.itemCode}</th>
            <td>${cartRow.itemName}</td>
            <td>${cartRow.unitPrice}</td>
            <td>${cartRow.quantity}</td>
            <td>${cartRow.total}</td>
        </tr>`;

        $('#tbody-orderCart').append(row);
    }
}

function setDataToCartTable() {

    //$('#tbody-orderCart').empty();
    let itemCode = $('#cmbItemCodes').val();
    let itemName = $('#lblItemName').text();
    let unitPrice = parseFloat($('#lblItemUnitPrice').text());
    let quantity = parseInt($('#txtOrderQty').val());

    let exitsItem = searchItemIsExits(itemCode);

    if (exitsItem != undefined) {
        exitsItem.quantity = (exitsItem.quantity + quantity);
        exitsItem.total = exitsItem.quantity * unitPrice;

        clearItemDetailTxtFields();
        calcTotal();
        getAllCartData();
    } else {
        let newCartOb = Object.assign({}, cartTMObject);
        newCartOb.itemCode = itemCode;
        newCartOb.itemName = itemName;
        newCartOb.unitPrice = unitPrice;
        newCartOb.quantity = quantity;
        newCartOb.total = unitPrice*quantity;

        CartDB.push(newCartOb);
        clearItemDetailTxtFields();
        calcTotal();
        getAllCartData();
    }
}

function clearItemDetailTxtFields() {
    $('#lblItemName,#lblQtyOnHand,#lblItemUnitPrice').text("");
    $('#txtOrderQty,#cmbItemCodes').val("");
    loadAllItemCodes();
}

function calcTotal() {
    let total = 0.00;
    for (let cartRow of CartDB) {
        total+=cartRow.total;
    }
    $('#lblTotal').text(total);
    calculateSubTotal();
    calculateBalance();
}

//Place Order ////////////////////////////////////////////////////////////////////////////////////////////////////

//calculate balance////////////////////////////////////////
$('#txtCash').on("keyup",function (){
    calculateBalance();
});

function calculateBalance() {
    let subTotal = parseFloat($('#lblSubTotal').text());
    let cash = parseFloat($('#txtCash').val());

    if (subTotal < cash) {
        let balance = cash - subTotal;
        $('#lblBalance').text(balance);
    }
}

//calculate sub total //////////////////////////////////////
$('#txtDiscount').on("keyup",function () {
    calculateSubTotal();
});

function calculateSubTotal() {
    let total = parseFloat($('#lblTotal').text());
    if (!$('#txtDiscount').val()== "" ) {
        let discountPercentage = parseInt($('#txtDiscount').val());

        let discount = total*discountPercentage/100;
        let subTotal = total - discount
        $('#lblSubTotal').text(subTotal);
        calculateBalance();
    } else {
        $('#lblSubTotal').text(total);
    }
}
