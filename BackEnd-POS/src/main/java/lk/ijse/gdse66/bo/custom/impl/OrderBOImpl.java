package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.OrderBO;
import lk.ijse.gdse66.dao.DAOFactory;
import lk.ijse.gdse66.dao.custom.OrderDAO;
import lk.ijse.gdse66.dto.OrderDTO;
import lk.ijse.gdse66.entity.Order;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class OrderBOImpl implements OrderBO {
    private final OrderDAO orderDAO = (OrderDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ORDERS);

    @Override
    public boolean purchaseOrder(OrderDTO dto, Connection connection) throws SQLException, ClassNotFoundException {
        return orderDAO.save(new Order(dto.getId(), dto.getDate(), dto.getCustomerId()), connection);
    }

    @Override
    public ArrayList<OrderDTO> getAllOrders(Connection connection) throws SQLException, ClassNotFoundException {
        ArrayList<Order> all = orderDAO.getAll(connection);

        ArrayList<OrderDTO> allOrders = new ArrayList<>();
        for (Order orders : all) {
            allOrders.add(new OrderDTO(orders.getOrderId(), orders.getOrderDate(), orders.getCusId()));
        }
        return allOrders;
    }

    @Override
    public String generateNewOrder(Connection connection) throws SQLException, ClassNotFoundException {
        return orderDAO.generateNewID(connection);
    }

    @Override
    public boolean mangeItems(int qty, String code, Connection connection) throws SQLException, ClassNotFoundException {
        return orderDAO.mangeItems(qty, code, connection);
    }
}
