package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.ItemBO;

public class ItemBOImpl implements ItemBO {

    private final ItemDAO itemDAO = (ItemDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.ITEM);

}
