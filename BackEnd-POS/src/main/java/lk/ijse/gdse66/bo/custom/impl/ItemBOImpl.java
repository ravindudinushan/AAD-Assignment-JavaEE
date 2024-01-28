package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.ItemBO;
import lk.ijse.gdse66.dao.DAOFactory;
import lk.ijse.gdse66.dao.custom.ItemDAO;
import lk.ijse.gdse66.dto.ItemDTO;
import lk.ijse.gdse66.entity.Item;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class ItemBOImpl implements ItemBO {
    private final ItemDAO itemDAO = (ItemDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ITEM);

    @Override
    public ArrayList<ItemDTO> getAllItems(Connection connection) throws SQLException, ClassNotFoundException {
        ArrayList<Item> allI = itemDAO.getAll(connection);
        ArrayList<ItemDTO> allItem = new ArrayList<>();

        for (Item item : allI) {
            allItem.add(new ItemDTO(item.getCode(), item.getName(), item.getQty(), item.getUnitPrice()));
        }
        return allItem;
    }

    @Override
    public boolean deleteItem(String code, Connection connection) throws SQLException, ClassNotFoundException {
        return itemDAO.delete(code, connection);
    }

    @Override
    public boolean saveItem(ItemDTO dto, Connection connection) throws SQLException, ClassNotFoundException {
        return itemDAO.save(new Item(dto.getCode(), dto.getName(), dto.getQty(), dto.getUnitPrice()), connection);
    }

    @Override
    public boolean updateItem(ItemDTO dto, Connection connection) throws SQLException, ClassNotFoundException {
        return itemDAO.update(new Item(dto.getCode(), dto.getName(), dto.getQty(), dto.getUnitPrice()), connection);
    }

    @Override
    public String generateNewItemCode(Connection connection) throws SQLException, ClassNotFoundException {
        return itemDAO.generateNewID(connection);
    }

    @Override
    public ArrayList<ItemDTO> itemSearchId(String id, Connection connection) throws SQLException, ClassNotFoundException {
        ArrayList<Item> all = itemDAO.searchId(id, connection);
        ArrayList<ItemDTO> allItem = new ArrayList<>();
        for (Item item : all) {
            allItem.add(new ItemDTO(item.getCode(), item.getName(), item.getQty(), item.getUnitPrice()));
        }
        return allItem;
    }
}
