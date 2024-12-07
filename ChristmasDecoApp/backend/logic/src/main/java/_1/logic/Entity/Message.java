package _1.logic.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "message_list")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("userIdx")
    private int id;

    private String nickname;

    @Lob
    private String message;

    @ManyToOne
    @JoinColumn(name = "tree_id", nullable = false)
    @JsonIgnore // JSON 직렬화에서 제외
    private Tree tree;

    protected Message() {}

    public Message(String nickname, String message, Tree tree) {
        this.nickname = nickname;
        this.message = message;
        this.tree = tree;
    }
}
