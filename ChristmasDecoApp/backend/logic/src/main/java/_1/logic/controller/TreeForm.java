package _1.logic.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Builder;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class TreeForm {
    private int treeIdx;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Map<String, String>> decoration;

    public TreeForm(int id, List<Map<String, String>> decoration){
        this.treeIdx = id;
        this.decoration = decoration;
    }

}
