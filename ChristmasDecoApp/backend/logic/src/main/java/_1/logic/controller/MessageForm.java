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
public class MessageForm {
    private String nickname;

    @Lob
    private String message;

    public MessageForm(String nickname, String message){
        this.nickname = nickname;
        this.message = message;
    }
}
