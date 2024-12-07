package _1.logic.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@Entity
@Table(name = "tree_list")
public class Tree {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("treeIdx")
    private int treeid;

    @JsonProperty("treeOwnerNickname")
    private String nickname;

    @Column(columnDefinition = "json")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<Map<String, String>> decoration;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;

    @OneToMany(mappedBy = "tree", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore // JSON 직렬화에서 제외
    private List<Message> messages;

    protected Tree(){}

    // 새 생성자 추가
    public Tree(User user, List<Map<String, String>> decoration) {
        this.user = user;
        this.nickname = user.getNickname(); // 사용자 닉네임 자동 설정
        this.decoration = decoration;
    }
}
