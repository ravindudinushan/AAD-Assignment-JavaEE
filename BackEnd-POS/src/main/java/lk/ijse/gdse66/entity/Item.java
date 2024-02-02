package lk.ijse.gdse66.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Item {
    private String code;
    private String description;
    private int qty;
    private double unitPrice;
}
