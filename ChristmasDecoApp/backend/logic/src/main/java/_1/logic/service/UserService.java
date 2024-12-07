package _1.logic.service;

import _1.logic.Entity.User;
import _1.logic.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // user 저장
    public void save(User user) {
        userRepository.save(user);
    }

    // nickname 존재 여부 확인
    public boolean NicknameExist(String nickname) {
        return userRepository.existsByNickname(nickname);
    }

    // nickname으로 User 정보 가져오기
    public User getUser(String nickname) {
        return userRepository.findByNickname(nickname);
    }

    // user 존재 여부 확인
    public User ExistingUser(String email, String password) {
        return userRepository.findByNicknameAndPassword(email, password);
    }

}
