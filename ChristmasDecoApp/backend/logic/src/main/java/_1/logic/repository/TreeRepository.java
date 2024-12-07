package _1.logic.repository;

import _1.logic.Entity.Tree;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TreeRepository extends JpaRepository<Tree, Integer> {

    Tree findByNickname(String nickname);

    Tree findByTreeid(int idx);
}
