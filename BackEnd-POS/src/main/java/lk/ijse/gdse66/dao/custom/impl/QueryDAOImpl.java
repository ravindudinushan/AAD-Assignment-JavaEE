package lk.ijse.gdse66.dao.custom.impl;

import lk.ijse.gdse66.dao.custom.QueryDAO;
import lk.ijse.gdse66.util.CrudUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;

public class QueryDAOImpl implements QueryDAO {
    @Override
    public int getSumOrders(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet result = CrudUtil.execute(connection, "SELECT COUNT(orderId) FROM `orders`");
        if (result.next()) {
            return result.getInt(1);
        } else {
            return 0;
        }
    }

    @Override
    public int getItem(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet result = CrudUtil.execute(connection, "SELECT COUNT(code) FROM item");
        if (result.next()) {
            return result.getInt(1);
        } else {
            return 0;
        }
    }

    @Override
    public int getCustomer(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet result = CrudUtil.execute(connection, "SELECT COUNT(id) FROM customer");
        if (result.next()) {
            return result.getInt(1);
        } else {
            return 0;
        }
    }
}
