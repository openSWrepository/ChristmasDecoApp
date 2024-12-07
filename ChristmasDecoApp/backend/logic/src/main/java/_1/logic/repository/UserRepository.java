package _1.logic.repository;

import _1.logic.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {

    User findByNicknameAndPassword(String nickname, String password);

    User findByNickname(String nickname);

    boolean existsByNickname(String nickname);

}
