package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.CustomerBO;

public class CustomerBOImpl implements CustomerBO {
    private final CustomerDAO customerDAO = (CustomerDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);

}
