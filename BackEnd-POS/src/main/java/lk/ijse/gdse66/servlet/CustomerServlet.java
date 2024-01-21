package lk.ijse.gdse66.servlet;

import lk.ijse.gdse66.bo.BOFactory;
import lk.ijse.gdse66.bo.custom.CustomerBO;
import lk.ijse.gdse66.bo.custom.QueryBO;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(urlPatterns = "/customer")
public class CustomerServlet extends HttpServlet {
    private final CustomerBO customerBO = (CustomerBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOMER);
    private final QueryBO queryBO = (QueryBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOM);
}

