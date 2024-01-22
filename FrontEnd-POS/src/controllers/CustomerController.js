function customerInitialize() {
    getAllCustomers();
}
getAllCustomers();

$('#btnCustomerSave').click(function () {
    if (checkAllCustomers()) {
        saveCustomer();
    } else {
        alert("Please check the input fields");
    }
});

$("#btnCustomerUpdate").click(function () {
    let id = $("#txtCustomerID").val();
    if (checkAllCustomers()) {
        updateCustomer(id);
    } else {
        alert("Please check the input fields!");
    }
});

$("#btnCustomerDelete").click(function () {
    let id = $("#txtCustomerID").val();

    let consent = confirm("Do you want to delete ?");
    if (consent) {
                let response = deleteCustomer(id);
                if (response) {
                    clearCustomerInputFields()
                    getAllCustomers();
                    alert("Customer Deleted");
                } else {
                    alert("Customer Not Removed. Invalid Customer");
                }
            } else {
                alert("Customer data is safe!");
            }
        });

$("#btnCustomerClear").click(function () {
    clearCustomerInputFields()
});

$("#btnCustomerSearch").click(function () {
    if ($("#txtCustomerSearch").val() != "") {
        let option = $("#cmbCustomerSearch").val();

        $("#btnCustomerDelete").prop("disabled", false);
        $("#btnCustomerUpdate").prop("disabled", false);

        if (option == "ID"){
            let customerByID = searchCustomerByID($("#txtCustomerSearch").val());
            if (customerByID != null){
                setCustomerTextFieldValues(customerByID.id, customerByID.name, customerByID.address, customerByID.salary);
            } else {
                alert("Invalid ID");
            }
        } else if (option == "Name") {
            let customerByName = searchCustomerByName($("#txtCustomerSearch").val());
            if (customerByName != null){
                setCustomerTextFieldValues(customerByName.id, customerByName.name, customerByName.address, customerByName.salary);
            } else {
                alert("Invalid Name");
            }
        }

    } else {
        alert("Please input ID or Name")
    }

});

function saveCustomer() {
    let customerID = $("#txtCustomerID").val();

    if (searchCustomer(customerID.trim()) == undefined) {

        let customerName = $("#txtCustomerName").val();
        let customerAddress = $("#txtCustomerAddress").val();
        let customerSalary = $("#txtCustomerSalary").val();

        let newCustomer = Object.assign({}, customer);

        newCustomer.id = customerID;
        newCustomer.name = customerName;
        newCustomer.address = customerAddress;
        newCustomer.salary = customerSalary;

        customerDB.push(newCustomer);
        clearCustomerInputFields()
        getAllCustomers();

        alert("Customer saved successfully!");

    } else {
        alert("Customer already exits !");
    }
}

function updateCustomer(id) {
    if (searchCustomer(id) == undefined) {
        alert("Invalid ID..please check the ID");
    } else {
        let consentItem = confirm("Do you want to update this Item.?");
        if (consentItem) {
                    let customer = searchCustomer(id);

                    let customerName = $("#txtCustomerName").val();
                    let customerAddress = $("#txtCustomerAddress").val();
                    let customerSalary = $("#txtCustomerSalary").val();

                    customer.name = customerName;
                    customer.address = customerAddress;
                    customer.salary = customerSalary;

                    getAllCustomers();
                    clearCustomerInputFields()
                    alert("Customer updated successfully!");
                } else {
                    alert("Customer data is safe!");
                }
    }
}

function deleteCustomer(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            customerDB.splice(i, 1);
            return true;
        }
    }
    return false
}

function searchCustomer(id) {
    return customerDB.find(function (customer) {
        return customer.id == id;
    });
}

function bindEvents() {
    $('#tbody-customer>tr').click(function () {

        let row = $(this);

        let customerID = row.children().eq(0).text();
        let customerName = row.children().eq(1).text();
        let address = row.children().eq(2).text();
        let salary = row.children().eq(3).text();

        setCustomerTextFieldValues(customerID, customerName, address, salary);
        $("#btnCustomerDelete").prop('disabled', false);
    });
}

function getAllCustomers(){
    $('#tbody-customer').empty();
    for (let i=0; i<customerDB.length; i++){
        let row= `<tr>
                <th>${customerDB[i].id}</th>
                <td>${customerDB[i].name}</td>
                <td>${customerDB[i].address}</td>
                <td>${customerDB[i].salary}</td>
            </tr>`;

        $('#tbody-customer').append(row);
        bindEvents();
    }
    bindEvents();
}

function searchCustomerByID(id) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {

            let selectCustomer = Object.assign({}, customer);
            selectCustomer.id = customerDB[i].id;
            selectCustomer.name = customerDB[i].name
            selectCustomer.address = customerDB[i].address
            selectCustomer.salary = customerDB[i].salary

            return selectCustomer;
        }
    }
    return null;
}

function searchCustomerByName(name) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].name == name) {

            let selectCustomer = Object.assign({}, customer);
            selectCustomer.id = customerDB[i].id;
            selectCustomer.name = customerDB[i].name
            selectCustomer.address = customerDB[i].address
            selectCustomer.salary = customerDB[i].salary

            return selectCustomer;
        }
    }
    return null;
}

function setCustomerTextFieldValues(id, name, address, salary){
    $('#txtCustomerID').val(id);
    $('#txtCustomerName').val(name);
    $('#txtCustomerAddress').val(address);
    $('#txtCustomerSalary').val(salary);
}