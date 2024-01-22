const CUS_ID_REGEX = /^(C00-)[0-9]{3}$/;
const CUS_NAME_REGEX = /^[A-Za-z ]{5,}$/;
const CUS_ADDRESS_REGEX = /^[A-Za-z0-9 ]{5,}$/;
const CUS_SALARY_REGEX = /^[0-9]{2,}([.][0-9]{2})?$/;

let c_vArray = new Array();
c_vArray.push({field: $("#txtCustomerID"), regEX: CUS_ID_REGEX});
c_vArray.push({field: $("#txtCustomerName"), regEX: CUS_NAME_REGEX});
c_vArray.push({field: $("#txtCustomerAddress"), regEX: CUS_ADDRESS_REGEX});
c_vArray.push({field: $("#txtCustomerSalary"), regEX: CUS_SALARY_REGEX});

function clearCustomerInputFields() {
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary,#txtCustomerSearch").val("");
    $("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").css("border", "1px solid #ced4da");
    $("#txtCustomerID").focus();
    setCustomerBtn();
}

setCustomerBtn();

$("#txtCustomerID,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on("keydown keyup", function (e) {
    let indexNo = c_vArray.indexOf(c_vArray.find((c) => c.field.attr("id") == e.target.id));

    if (e.key == "Tab"){
        e.preventDefault();
    }

    checkCustomerValidations(c_vArray[indexNo]);

    setCustomerBtn();

    if (e.key == "Enter"){

        if (e.target.id != c_vArray[c_vArray.length - 1].field.attr("id")) {

            if (checkCustomerValidations(c_vArray[indexNo])) {
                c_vArray[indexNo + 1].field.focus();
            }
        } else {
            if (checkCustomerValidations(c_vArray[indexNo])) {
                saveCustomer();
            }
        }
    }
})

function checkAllCustomers() {
    for (let i = 0; i < c_vArray.length; i++) {
        if (!checkCustomerValidations(c_vArray[i])) return false;
    }
    return true
}

function checkCustomerValidations(object) {
    if (object.regEX.test(object.field.val())) {
        setCustomerBorder(true, object);
        return true;
    }
    setCustomerBorder(false, object);
    return false;
}

function setCustomerBorder(bol, ob) {
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

function setCustomerBtn() {
    $("#btnCustomerDelete").prop("disabled", true);
    $("#btnCustomerUpdate").prop("disabled", true);


    if (checkAllCustomers()){
        $("#btnCustomerSave").prop("disabled", false);
    } else {
        $("#btnCustomerSave").prop("disabled", true);
    }

    let id = $("#txtCustomerID").val();
    if (searchCustomer(id) == undefined) {
        $("#btnCustomerDelete").prop("disabled", true);
        $("#btnCustomerUpdate").prop("disabled", true);
    } else {
        $("#btnCustomerDelete").prop("disabled", false);
        $("#btnCustomerUpdate").prop("disabled", false);
    }
}