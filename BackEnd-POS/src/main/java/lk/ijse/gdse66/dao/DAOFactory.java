package lk.ijse.gdse66.dao;

import lk.ijse.gdse66.dao.custom.impl.CustomerDAOImpl;
import lk.ijse.gdse66.dao.custom.impl.ItemDAOImpl;
import lk.ijse.gdse66.dao.custom.impl.OrderDAOImpl;
import lk.ijse.gdse66.dao.custom.impl.QueryDAOImpl;

public class DAOFactory {
    private static DAOFactory daoFactory;

    private DAOFactory() {
    }

    public static DAOFactory getDaoFactory() {
        return daoFactory == null ? daoFactory = new DAOFactory() : daoFactory;
    }

    public SuperDAO getDAO(DAOTypes types) {
        switch (types) {
            case CUSTOMER:
                return new CustomerDAOImpl();
            case CUSTOM:
                return new QueryDAOImpl();
            case ITEM:
                return new ItemDAOImpl();
            case ORDER:
                return new OrderDAOImpl();
            default:
                return null;
        }
    }

    public enum DAOTypes {
        CUSTOMER, CUSTOM, ITEM, ORDER
    }
}
