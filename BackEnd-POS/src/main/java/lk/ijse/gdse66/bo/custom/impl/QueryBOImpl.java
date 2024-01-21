package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.QueryBO;

public class QueryBOImpl implements QueryBO {

    private final QueryDAO queryDAO = (QueryDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.CUSTOM);

}
