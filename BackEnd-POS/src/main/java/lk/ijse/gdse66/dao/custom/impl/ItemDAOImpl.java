package lk.ijse.gdse66.dao.custom.impl;

import lk.ijse.gdse66.dao.custom.ItemDAO;
import lk.ijse.gdse66.entity.Item;
import lk.ijse.gdse66.util.CrudUtil;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemDAOImpl implements ItemDAO {
    @Override
    public ArrayList<Item> getAll(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet result = CrudUtil.execute(connection, "SELECT * FROM item");
        ArrayList<Item> obList = new ArrayList<>();
        while (result.next()) {
            obList.add(new Item(result.getString(1), result.getString(2), result.getInt(3), result.getDouble(4)));
        }
        return obList;
    }

    @Override
    public boolean save(Item dto, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.execute(connection, "INSERT INTO item VALUES (?,?,?,?)", dto.getCode(), dto.getName(), dto.getQty(), dto.getUnitPrice());
    }

    @Override
    public boolean update(Item dto, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.execute(connection, "UPDATE item SET name= ? , qty=? , unitPrice=? WHERE code=?", dto.getName(), dto.getQty(), dto.getUnitPrice(), dto.getCode());
    }

    @Override
    public ArrayList<Item> searchId(String code, Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet result = CrudUtil.execute(connection, "SELECT * FROM item WHERE code=?", code);

        ArrayList<Item> allItems = new ArrayList<>();
        while (result.next()) {
            allItems.add(new Item(result.getString(1), result.getString(2), result.getInt(3), result.getDouble(4)));
        }
        return allItems;
    }

    @Override
    public boolean delete(String code, Connection connection) throws SQLException, ClassNotFoundException {
        return CrudUtil.execute(connection, "DELETE FROM item WHERE code=?", code);
    }

    @Override
    public String generateNewID(Connection connection) throws SQLException, ClassNotFoundException {
        ResultSet result = CrudUtil.execute(connection, "SELECT code FROM item ORDER BY code DESC LIMIT 1");
        if (result.next()) {
            return result.getString(1);
        } else {
            return null;
        }
    }
}
