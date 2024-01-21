package lk.ijse.gdse66.servlet;

import lk.ijse.gdse66.bo.BOFactory;
import lk.ijse.gdse66.bo.custom.ItemBO;
import lk.ijse.gdse66.bo.custom.QueryBO;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;

@WebServlet(urlPatterns = "/item")
public class ItemServlet extends HttpServlet {

    private final QueryBO queryBO = (QueryBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.CUSTOM);
    private final ItemBO itemBO = (ItemBO) BOFactory.getBoFactory().getBO(BOFactory.BOTypes.ITEM);
}
