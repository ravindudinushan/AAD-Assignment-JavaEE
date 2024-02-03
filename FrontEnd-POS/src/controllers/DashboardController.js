initiateUI();

function initiateUI() {
    clearAll();
    $("#home-page").css('display', 'block');
    setTheLastView();
}

function setTheLastView() {
    let view = localStorage.getItem("view");
    switch (view) {
        case "HOME":
            setView($("#home-page"));
            break;
        case "CUSTOMER":
            setView($("#customer-page"));
            break;
        case "ITEM":
            setView($("#item-page"));
            break;
        case "ORDERS":
            setView($("#order-page"));
            break;
        case "ORDER-DETAIL":
            setView($("#orderDetail-page"));
            break;
        default:
            setView($("#home-page"));
    }
}

function saveLastView(clickedID) {
    switch (clickedID) {
        case "home-page":
            localStorage.setItem("view", "HOME");
            break;
        case "customer-page":
            localStorage.setItem("view", "CUSTOMER");
            break;
        case "item-page":
            localStorage.setItem("view", "ITEM");
            break;
        case "order-page":
            localStorage.setItem("view", "ORDERS");
            break;
        case "orderDetail-page":
            localStorage.setItem("view", "ORDER-DETAIL");
            break;
    }
}

function setView(viewOb) {

    if (viewOb.get(0).id === "log-in-page" || viewOb.get(0).id === "sign-up-page"){
        clearAll();
        viewOb.css("display", "block");
        $("header").css('display', 'none');
    }else {
        clearAll();
        viewOb.css("display", "block");
        $("header").css('display', 'block');
        saveLastView(viewOb.get(0).id);
    }
}

function clearAll() {
    $("#home-page,#customer-page,#item-page,#order-page,#orderDetail-page").css('display','none');
}


$("#home-nav").click(function () {
    setView($("#home-page"));
});

$("#customer-nav").click(function () {
    setView($("#customer-page"));
});

$("#item-nav").click(function () {
    setView($("#item-page"));
});

$("#order-nav").click(function () {
    setView($("#order-page"));
});

$("#orderDetail-nav").click(function () {
    setView($("#orderDetail-page"));
});
