package lk.ijse.gdse66.servlet;

import lk.ijse.gdse66.bo.BOFactory;
import lk.ijse.gdse66.bo.custom.OrderBO;
import lk.ijse.gdse66.bo.custom.QueryBO;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(urlPatterns = "/order")
public class OrdersServlet extends HttpServlet {
    private final QueryBO queryBO = (QueryBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOM);
    private final OrderBO orderBO = (OrderBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.ORDERS);

}
