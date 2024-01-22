const ITEM_CODE_REGEX = /^(I00-)[0-9]{3}$/;
const ITEM_DESC_REGEX = /^[A-Za-z ]{5,}$/;
const ITEM_QTY_ON_HAND_REGEX = /^\d{1,4}$/;
const ITEM_UNIT_PRICE_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let i_vArray = new Array();
i_vArray.push({field: $("#txtItemCode"), regEX: ITEM_CODE_REGEX});
i_vArray.push({field: $("#txtItemName"), regEX: ITEM_DESC_REGEX});
i_vArray.push({field: $("#txtItemQtyOnHand"), regEX: ITEM_QTY_ON_HAND_REGEX});
i_vArray.push({field: $("#txtItemPrice"), regEX: ITEM_UNIT_PRICE_REGEX});

function clearItemInputFields() {
    $("#txtItemCode,#txtItemName,#txtItemQtyOnHand,#txtItemPrice,#txtItemSearch").val("");
    $("#txtItemCode,#txtItemName,#txtItemQtyOnHand,#txtItemPrice").css("border", "1px solid #ced4da");
    $("#txtCustomerID").focus();
    setBtn();
}

setBtn();

$("#txtItemCode,#txtItemName,#txtItemQtyOnHand,#txtItemPrice").on("keydown keyup", function (e) {
    let indexNo = i_vArray.indexOf(i_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab"){
        e.preventDefault();
    }

    checkValidations(i_vArray[indexNo]);

    setBtn();

    if (e.key == "Enter"){

        if (e.target.id != i_vArray[i_vArray.length - 1].field.attr("id")) {

            if (checkValidations(i_vArray[indexNo])) {
                i_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkValidations(i_vArray[indexNo])) {
                saveItem();
            }
        }
    }
});

function checkAll() {
    for (let i = 0; i < i_vArray.length; i++) {
        if (!checkValidations(i_vArray[i])) return false;
    }
    return true
}

function checkValidations(object) {
    if (object.regEX.test(object.field.val())) {
        setBorder(true, object);
        return true;
    }
    setBorder(false, object);
    return false;
}

function setBorder(bol, ob) {
    if (!bol) {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid red");
        } else {
            ob.field.css("border", "1px solid #ced4da");
        }
    } else {
        if (ob.field.val().length >= 1) {
            ob.field.css("border", "2px solid green");
        } else {
            ob.field.css("border", "1px solid #ced4da");

            //ob.field.css("border", "var(--bs-border-width) solid var(--bs-border-color)");
        }
    }
}

function setBtn() {
    $("#btnItemDelete").prop("disabled", true);
    $("#btnItemUpdate").prop("disabled", true);


    if (checkAll()){
        $("#btnItemSave").prop("disabled", false);
    } else {
        $("#btnItemSave").prop("disabled", true);
    }

    let id = $("#txtItemCode").val();
    if (searchItem(id) == undefined) {
        $("#btnItemDelete").prop("disabled", true);
        $("#btnItemUpdate").prop("disabled", true);
    } else {
        $("#btnItemDelete").prop("disabled", false);
        $("#btnItemUpdate").prop("disabled", false);
    }
}