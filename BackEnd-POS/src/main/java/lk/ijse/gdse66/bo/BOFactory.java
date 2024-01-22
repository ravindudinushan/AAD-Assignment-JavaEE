package lk.ijse.gdse66.bo;

import lk.ijse.gdse66.bo.custom.impl.CustomerBOImpl;
import lk.ijse.gdse66.bo.custom.impl.ItemBOImpl;
import lk.ijse.gdse66.bo.custom.impl.OrderBOImpl;
import lk.ijse.gdse66.bo.custom.impl.QueryBOImpl;

public class BOFactory {
    private static BOFactory boFactory;

    private BOFactory() {
    }

    public static BOFactory getBoFactory() {
        return boFactory == null ? boFactory = new BOFactory() : boFactory;
    }

    public SuperBO getBO(BOTypes types) {
        switch (types) {
            case CUSTOMER:
                return new CustomerBOImpl();
            case CUSTOM:
                return new QueryBOImpl();
            case ITEM:
                return new ItemBOImpl();
            case ORDER:
                return new OrderBOImpl();
            default:
                return null;
        }
    }

    public enum BOTypes {
        CUSTOMER, CUSTOM, ITEM, ORDER
    }
}
