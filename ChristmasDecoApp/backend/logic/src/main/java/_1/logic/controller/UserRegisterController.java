package _1.logic.controller;


import _1.logic.Entity.APIResponse;
import _1.logic.Entity.Tree;
import _1.logic.Entity.User;
import _1.logic.configuration.SessionConst;
import _1.logic.service.TreeService;
import _1.logic.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/registerAPI")
public class UserRegisterController {

    @Autowired
    private UserService userService;

    @Autowired
    private TreeService treeService;

    protected TreeForm treeForm;

    // 회원가입 - Post
    @PostMapping("/new")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if(userService.NicknameExist(user.getNickname())){
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new APIResponse(false, 409, "이미 존재하는 닉네임입니다.", user.getNickname()));
        }

        User new_user = new User(user.getNickname(), user.getPassword());
        Tree new_tree = new Tree(new_user, null);

        try{
            userService.save(new_user);
            treeService.save(new_tree);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new APIResponse(true, 201, "회원가입에 성공했습니다.", new_user.getId()));
        }
        catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new APIResponse(false, 400, "회원가입에 실패했습니다.", null));
        }

    }

    @PostMapping("/update-nickname")
    public ResponseEntity<?> updateNickname(@RequestBody User user, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
        }

        String currentNickname = (String) session.getAttribute(SessionConst.LOGIN_NICKNAME);

        // 새 닉네임 중복 확인
        if (userService.NicknameExist(user.getNickname())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(new APIResponse(false, 409, "이미 존재하는 닉네임입니다.", user.getNickname()));
        }

        // 기존 사용자 정보 가져오기
        User existingUser = userService.getUser(currentNickname);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new APIResponse(false, 404, "사용자를 찾을 수 없습니다.", null));
        }

        // 닉네임 변경
        existingUser.setNickname(user.getNickname());

        try {
            userService.save(existingUser); // 변경사항 저장
            // 세션 정보 업데이트
            session.setAttribute(SessionConst.LOGIN_NICKNAME, user.getNickname());
            return ResponseEntity.ok(new APIResponse(true, 200, "닉네임 변경에 성공했습니다.", existingUser));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new APIResponse(false, 500, "닉네임 변경에 실패했습니다.", null));
        }
    }

    @PostMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> requestBody, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
        }

        String currentNickname = (String) session.getAttribute(SessionConst.LOGIN_NICKNAME);
        String newPassword = requestBody.get("Password");

        if (newPassword == null || newPassword.trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new APIResponse(false, 400, "새 비밀번호가 유효하지 않습니다.", null));
        }

        // 기존 사용자 정보 가져오기
        User existingUser = userService.getUser(currentNickname);
        if (existingUser == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new APIResponse(false, 404, "사용자를 찾을 수 없습니다.", null));
        }

        // 비밀번호 변경
        existingUser.setPassword(newPassword);

        try {
            userService.save(existingUser); // 변경사항 저장
            return ResponseEntity.ok(new APIResponse(true, 200, "비밀번호 변경에 성공했습니다.", null));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(new APIResponse(false, 500, "비밀번호 변경에 실패했습니다.", null));
        }
    }


}
