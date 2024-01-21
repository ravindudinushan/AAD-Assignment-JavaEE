package lk.ijse.gdse66.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ItemDTO {
    String code;
    String name;
    int qty;
    double unitPrice;
}
