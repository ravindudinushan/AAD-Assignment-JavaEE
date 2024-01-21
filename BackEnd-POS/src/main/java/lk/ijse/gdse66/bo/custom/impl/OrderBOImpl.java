package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.OrderBO;

public class OrderBOImpl implements OrderBO {
    private final OrderDAO orderDAO = (OrderDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ORDERS);

}
