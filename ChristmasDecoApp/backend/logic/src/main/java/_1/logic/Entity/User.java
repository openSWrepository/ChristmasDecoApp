package _1.logic.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "user_list")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("userIdx")
    private int id;

    private String nickname;
    private String password;

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Tree tree;


    protected User(){}

    public User(String nickname, String password){
        this.nickname = nickname;
        this.password = password;
    }

}
