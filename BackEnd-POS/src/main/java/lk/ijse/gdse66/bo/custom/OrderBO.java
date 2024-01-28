package lk.ijse.gdse66.bo.custom;

import lk.ijse.gdse66.bo.SuperBO;
import lk.ijse.gdse66.dto.OrderDTO;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public interface OrderBO extends SuperBO {
    boolean purchaseOrder(OrderDTO dto, Connection connection) throws SQLException, ClassNotFoundException;

    ArrayList<OrderDTO> getAllOrders(Connection connection) throws SQLException, ClassNotFoundException;

    String generateNewOrder(Connection connection) throws SQLException, ClassNotFoundException;

    boolean mangeItems(int qty, String code, Connection connection) throws SQLException, ClassNotFoundException;
}
