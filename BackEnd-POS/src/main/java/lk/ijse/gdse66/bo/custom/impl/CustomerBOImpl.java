package lk.ijse.gdse66.bo.custom.impl;

import lk.ijse.gdse66.bo.custom.CustomerBO;
import lk.ijse.gdse66.dao.DAOFactory;
import lk.ijse.gdse66.dao.custom.CustomerDAO;
import lk.ijse.gdse66.dto.CustomerDTO;
import lk.ijse.gdse66.entity.Customer;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.ArrayList;

public class CustomerBOImpl implements CustomerBO {
    private final CustomerDAO customerDAO = (CustomerDAO) DAOFactory.getDaoFactory().getDAO(DAOFactory.DAOTypes.CUSTOMER);// hide the object creation logic through the factory

    @Override
    public ArrayList<CustomerDTO> getAllCustomers(Connection connection) throws SQLException, ClassNotFoundException {
        ArrayList<Customer> all = customerDAO.getAll(connection);
        ArrayList<CustomerDTO> allCustomers = new ArrayList<>();
        for (Customer customer : all) {
            allCustomers.add(new CustomerDTO(customer.getId(), customer.getName(), customer.getAddress(), customer.getSalary()));
        }
        return allCustomers;
    }

    @Override
    public boolean saveCustomer(CustomerDTO dto, Connection connection) throws SQLException, ClassNotFoundException {
        return customerDAO.save(new Customer(dto.getId(), dto.getName(), dto.getAddress(), dto.getSalary()), connection);
    }

    @Override
    public boolean updateCustomer(CustomerDTO dto, Connection connection) throws SQLException, ClassNotFoundException {
        return customerDAO.update(new Customer(dto.getId(), dto.getName(), dto.getAddress(), dto.getSalary()), connection);
    }

    @Override
    public boolean deleteCustomer(String id, Connection connection) throws SQLException, ClassNotFoundException {
        return customerDAO.delete(id, connection);

    }

    @Override
    public String generateNewCustomerID(Connection connection) throws SQLException, ClassNotFoundException {
        return customerDAO.generateNewID(connection);
    }

    @Override
    public ArrayList<CustomerDTO> customerSearchId(String id, Connection connection) throws SQLException, ClassNotFoundException {
        ArrayList<Customer> all = customerDAO.searchId(id, connection);
        ArrayList<CustomerDTO> allCustomers = new ArrayList<>();
        for (Customer customer : all) {
            allCustomers.add(new CustomerDTO(customer.getId(), customer.getName(), customer.getAddress(), customer.getSalary()));
        }
        return allCustomers;
    }
}
