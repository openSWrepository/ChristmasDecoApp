package _1.logic.service;

import _1.logic.Entity.Tree;
import _1.logic.repository.TreeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TreeService {

    @Autowired
    private TreeRepository treeRepository;

    public void save(Tree tree){
        treeRepository.save(tree);
    }

    public Tree findTree(String nickname){
        return treeRepository.findByNickname(nickname);
    }
}
