DROP DATABASE IF EXISTS java_ee_pos;
CREATE DATABASE IF NOT EXISTS java_ee_pos;
USE java_ee_pos;

DROP TABLE IF EXISTS customer;
CREATE TABLE IF NOT EXISTS customer
(
    id VARCHAR(8),
    name VARCHAR(30),
    address VARCHAR(30),
    salary double,
    CONSTRAINT PRIMARY KEY (id)
    );

DROP TABLE IF EXISTS item;
CREATE TABLE IF NOT EXISTS item
(
    code VARCHAR(8),
    description VARCHAR(50),
    qty INT(5) DEFAULT 0,
    unitPrice DECIMAL(10, 2) DEFAULT 0.00,
    CONSTRAINT PRIMARY KEY (code)
    );

DROP TABLE IF EXISTS `Orders`;
CREATE TABLE IF NOT EXISTS `Orders`
(
    orderId VARCHAR(8),
    orderDate DATE,
    cusId VARCHAR(8),
    CONSTRAINT PRIMARY KEY (orderId, cusId),
    CONSTRAINT FOREIGN KEY (cusId) REFERENCES customer (id) ON DELETE CASCADE ON UPDATE CASCADE
);

DROP TABLE IF EXISTS `OrderDetail`;
CREATE TABLE IF NOT EXISTS `OrderDetail`
(
    orderId VARCHAR(8),
    itemCode VARCHAR(8),
    qty INT(5) DEFAULT 0,
    total DECIMAL(10, 2) DEFAULT 0.00,

    CONSTRAINT PRIMARY KEY (orderId, itemCode),
    CONSTRAINT FOREIGN KEY (orderId) REFERENCES `Orders` (orderId) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT FOREIGN KEY (itemCode) REFERENCES item (code) ON DELETE CASCADE ON UPDATE CASCADE

);
INSERT INTO customer VALUES ('C00-001', 'Ravindu', 'Galle', 45000),
                            ('C00-002', 'Dinushan', 'Galle', 55000),
                            ('C00-003', 'Hasini', 'Thelikada', 45000),
                            ('C00-004', 'Piyumika', 'Colombo', 75000);

INSERT INTO Item VALUES ('I00-001', 'Soup', 100, 110.00),
                        ('I00-002', 'Keeri samba', 1000, 120.00),
                        ('I00-003', 'Ice-cream', 200, 150.00),
                        ('I00-004', 'Sugar', 500, 220.00);

SELECT orderId FROM `orders` ORDER BY orderId DESC LIMIT 1;