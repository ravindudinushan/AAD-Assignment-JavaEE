package lk.ijse.gdse66.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Item {
    private String code;
    private String name;
    private int qty;
    private double unitPrice;
}
