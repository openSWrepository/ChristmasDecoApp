package _1.logic.controller;

import _1.logic.Entity.APIResponse;
import _1.logic.Entity.Tree;
import _1.logic.Entity.TreeResponse;
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

@RestController
@RequestMapping("/loginAPI")
public class UserLoginController {

    @Autowired
    private UserService userService;

    @Autowired
    private TreeService treeService;

    protected TreeForm treeForm;

    // 로그인 요청 처리
    // 사용자 입력 정보(nickname, password) 검증 후 세션에 사용자 정보 저장
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user, HttpServletRequest request) {
        if (userService.ExistingUser(user.getNickname(), user.getPassword()) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "존재하지 않는 유저입니다.", null));
        }


        // 세션 생성 및 속성 저장
        HttpSession session = request.getSession();
        session.setAttribute(SessionConst.LOGIN_NICKNAME, user.getNickname());

        User getUser = userService.getUser(user.getNickname());
        Tree existingTree = treeService.findTree(user.getNickname());
        treeForm = new TreeForm(existingTree.getTreeid(), existingTree.getDecoration());

        return ResponseEntity.ok(new APIResponse(true, 200, "로그인에 성공했습니다.", getUser.getId()));
    }

    // 로그인 상태 확인
    // 세션에서 사용자 정보 확인 후 로그인 상태 반환
    @GetMapping("/status")
    public ResponseEntity<?> checkLoginStatus(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 세션이 없으면 null 반환
        if (session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
        }

        String nickname = (String) session.getAttribute(SessionConst.LOGIN_NICKNAME);

        return ResponseEntity.status(HttpStatus.OK)
                .body(new APIResponse(true, 200, "로그인 상태입니다.", userService.NicknameExist(nickname)));
    }

    // 로그아웃 요청 처리
    // 세션 무효화하여 로그인 정보 삭제
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false); // 세션이 없으면 null 반환
        if (session != null) {
            session.invalidate(); // 세션 무효화
        }

        return ResponseEntity.status(HttpStatus.OK)
                .body(new APIResponse(true, 200, "로그아웃", null));
    }
}