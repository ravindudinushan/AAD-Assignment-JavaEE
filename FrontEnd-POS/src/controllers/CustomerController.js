let baseUrl = "http://localhost:8080/app/";
loadAllCustomer();

$("#btnCustomerSave").attr('disabled', true);
$("#btnCustomerUpdate").attr('disabled', true);
$("#btnCustomerDelete").attr('disabled', true);

function generateCustomerID() {
    $("#txtCustomerId").val("C00-001");
    $.ajax({
        url: baseUrl + "customer?option=CustomerIdGenerate",
        method: "GET",
        contentType: "application/json",
        dataType: "json",
        success: function (resp) {
            let id = resp.id;
            let tempId = parseInt(id.split("-")[1]);
            tempId = tempId + 1;
            if (tempId <= 9) {
                $("#txtCustomerId").val("C00-00" + tempId);
            } else if (tempId <= 99) {
                $("#txtCustomerId").val("C00-0" + tempId);
            } else {
                $("#txtCustomerId").val("C00-" + tempId);
            }
        },
        error: function (ob, statusText, error) {

        }
    });
}

/**
 * Button Save Customer
 * */

$("#btnCustomerSave").click(function () {

    let formData = $("#customerForm").serialize();
    console.log(formData);
    $.ajax({
        url: baseUrl + "customer", method: "post",
        data: formData,
        success: function (res) {
            saveAlert("Customer");
            loadAllCustomer();
        }, error: function (error) {
            console.log(error.responseText);
            unSuccessUpdateAlert("Customer", JSON.parse(error.responseText).message);
        }
    });
});


/**
 * clear input fields Values
 * */
function setTextFieldValue(id, name, address, salary) {
    $("#txtCustomerId").val(id);
    $("#txtCustomerName").val(name);
    $("#txtCustomerAddress").val(address);
    $("#txtCustomerSalary").val(salary);
    $("#txtCustomerName").focus();
    checkValidity(customerValidations);
    $("#btnCustomerSave").attr('disabled', true);
    $("#btnCustomerUpdate").attr('disabled', true);
    $("#btnCustomerDelete").attr('disabled', true);
}

/**
 * load all customers
 * */
function loadAllCustomer() {
    $("#tbody-customer").empty();
    $.ajax({
        url: baseUrl + "customer?option=loadAllCustomer", method: "GET", dataType: "json", success: function (res) {
            console.log(res);

            for (let i of res.data) {
                let id = i.id;
                let name = i.name;
                let address = i.address;
                let salary = i.salary;

                let row = "<tr><td>" + id + "</td><td>" + name + "</td><td>" + address + "</td><td>" + salary + "</td></tr>";
                $("#tbody-customer").append(row);
            }
            bindClickEvents();
            generateCustomerID();
            setTextFieldValue("", "", "", "");
            console.log(res.message);
        }, error: function (error) {
            let message = JSON.parse(error.responseText).message;
            console.log(message);
        }

    });
}

/**
 * Table Click and Load textFields
 * */
function bindClickEvents() {
    console.log("click");
    $("#tbody-customer>tr").on("click", function () {
        let id = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let address = $(this).children().eq(2).text();
        let salary = $(this).children().eq(3).text();
        console.log(id, name, address, salary);

        $("#txtCustomerId").val(id);
        $("#txtCustomerName").val(name);
        $("#txtCustomerAddress").val(address);
        $("#txtCustomerSalary").val(salary);

        $("#btnCustomerDelete").attr('disabled', false);
        $("#btnCustomerUpdate").attr('disabled', false);
    });
    $("#btnCustomerSave").attr('disabled', true);
}


/**
 * Search id
 * */
$("#searchCusId").on("keypress", function (event) {
    if (event.which === 13) {
        event.preventDefault();
        var search = $("#searchCusId").val();
        $("#tbody-customer").empty();
        $.ajax({
            url: baseUrl + "customer?id=" + search + "&option=searchCusId",
            method: "GET",
            contentType: "application/json",
            dataType: "json",
            success: function (res) {
                console.log(res);
                let row = "<tr><td>" + res.id + "</td><td>" + res.name + "</td><td>" + res.address + "</td><td>" + res.salary + "</td></tr>";
                $("#tbody-customer").append(row);
                bindClickEvents();
                $("#searchCusId").val("");
            },
            error: function (error) {
                loadAllCustomer();
                let message = JSON.parse(error.responseText).message;
                emptyMassage(message);
            }
        })
    }

});

/**
 * Customer Update
 * */

$("#btnCustomerUpdate").click(function () {

    let cusId = $("#txtCustomerId").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalary").val();

    const customerOb = {
        id: cusId, name: cusName, address: cusAddress, salary: cusSalary
    };

    $.ajax({
        url: baseUrl + "customer",
        method: "put",
        contentType: "application/json",
        data: JSON.stringify(customerOb),
        success: function (res) {
            saveUpdateAlert("Customer", res.message);
            loadAllCustomer();
        },
        error: function (error) {
            console.log(error.responseText);
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Customer", message);
        }
    });
});

/**
 * Customer Delete
 * */

$("#btnCustomerDelete").click(function () {

    let cusId = $("#txtCustomerId").val();
    let cusName = $("#txtCustomerName").val();
    let cusAddress = $("#txtCustomerAddress").val();
    let cusSalary = $("#txtCustomerSalary").val();

    const customerOb = {
        id: cusId, name: cusName, address: cusAddress, salary: cusSalary
    };

    $.ajax({
        url: baseUrl + "customer",
        method: "delete",
        contentType: "application/json",
        data: JSON.stringify(customerOb),
        success: function (res) {
            deleteAlert("Customer");
            loadAllCustomer();
        },
        error: function (error) {
            let message = JSON.parse(error.responseText).message;
            unSuccessUpdateAlert("Customer", message);
        }
    });
});

/**
 * Auto Forces Input Fields Save
 * */
$("#txtCustomerId").focus();
const regExCusID = /^(C00-)[0-9]{3,4}$/;
const regExCusName = /^[A-z ]{3,20}$/;
const regExCusAddress = /^[A-z0-9/ ]{4,30}$/;
const regExSalary = /^[0-9]{1,}[.]?[0-9]{1,2}$/;

let customerValidations = [];
customerValidations.push({
    reg: regExCusID, field: $('#txtCustomerId'), error: 'Customer ID Pattern is Wrong : C00-001'
});
customerValidations.push({
    reg: regExCusName, field: $('#txtCustomerName'), error: 'Customer Name Pattern is Wrong : A-z 3-20'
});
customerValidations.push({
    reg: regExCusAddress, field: $('#txtCustomerAddress'), error: 'Customer Address Pattern is Wrong : A-z 0-9 ,/'
});
customerValidations.push({
    reg: regExSalary, field: $('#txtCustomerSalary'), error: 'Customer Salary Pattern is Wrong : 0-9{1,}.0-9{1,2}'
});

//disable tab key of all four text fields using grouping selector in CSS
$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keydown', function (event) {
    if (event.key === "Tab") {
        event.preventDefault();
    }
});

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('keyup', function (event) {
    checkValidity(customerValidations);
});

$("#txtCustomerId,#txtCustomerName,#txtCustomerAddress,#txtCustomerSalary").on('blur', function (event) {
    checkValidity(customerValidations);
});

$("#txtCustomerId").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusID, $("#txtCustomerId"))) {
        $("#txtCustomerName").focus();
    } else {
        focusText($("#txtCustomerId"));
    }
});

$("#txtCustomerName").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusName, $("#txtCustomerName"))) {
        focusText($("#txtCustomerAddress"));
    }
});

$("#txtCustomerAddress").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExCusAddress, $("#txtCustomerAddress"))) {
        focusText($("#txtCustomerSalary"));
    }
});

$("#txtCustomerSalary").on('keydown', function (event) {
    if (event.key === "Enter" && check(regExSalary, $("#txtCustomerSalary"))) {
        if (event.which === 13) {
            $('#btnCustomerSave').focus();
        }
    }
    $("#btnCustomerSave").attr('disabled', false);
});

function setButtonState(value) {
    if (value > 0) {
        $("#btnCustomerSave").attr('disabled', true);
        $("#btnCustomerUpdate").attr('disabled', true);
        $("#btnCustomerDelete").attr('disabled', true);
    } else {
        $("#btnCustomerSave").attr('disabled', false);
        $("#btnCustomerUpdate").attr('disabled', false);
        $("#btnCustomerDelete").attr('disabled', false);
    }
}