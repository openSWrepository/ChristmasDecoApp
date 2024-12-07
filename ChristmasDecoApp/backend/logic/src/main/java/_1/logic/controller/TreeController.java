package _1.logic.controller;

import _1.logic.Entity.*;
import _1.logic.configuration.SessionConst;
import _1.logic.service.MessageService;
import _1.logic.service.TreeService;
import _1.logic.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/trees")
public class TreeController {

    @Autowired
    private UserService userService;
    @Autowired
    private TreeService treeService;
    @Autowired
    private MessageService messageService;

    protected User user;
    protected TreeForm treeForm;
    protected MessageForm messageForm;

    // 트리 저장 - Post
    @PostMapping("/save-tree")
    public ResponseEntity<?> saveTree(@RequestBody TreeForm treeForm, HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if(session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
        }

        User login_user = userService.getUser((String) SessionConst.LOGIN_NICKNAME);
        Tree new_tree = new Tree(login_user, treeForm.getDecoration());

        try{
            treeService.save(new_tree);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new TreeResponse(true, 201, "트리 저장에 성공했습니다.", login_user.getNickname(), treeForm.getTreeIdx(), new_tree));
        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
                    .body(new APIResponse(false, 500, "트리 저장에 실패했습니다.", null));
        }
    }

//    // 트리 업데이트 - Post
//    @PostMapping("/update-tree")
//    public ResponseEntity<?> updateTree(@RequestBody TreeForm treeForm, HttpServletRequest request) {
//        HttpSession session = request.getSession(false);
//        if(session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null){
//            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
//                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
//        }
//
//        String loginNickname = (String) session.getAttribute(SessionConst.LOGIN_NICKNAME);
//        Tree existingTree = treeService.findTree(loginNickname); // 이미 저장된 트리 가져오기
//
//        if (existingTree == null) {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND)
//                    .body(new APIResponse(false, 404, "트리를 찾을 수 없습니다.", null));
//        }
//
//        // 필드 변경
//        existingTree.setDecoration(treeForm.getDecoration());
//
//        // 변경 감지에 의해 트랜잭션 커밋 시 자동 반영됨
//        try {
//            return ResponseEntity.ok(new TreeResponse(true, 200, "트리 업데이트에 성공했습니다.", loginNickname,existingTree));
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.BAD_GATEWAY)
//                    .body(new APIResponse(false, 500, "트리 업데이트에 실패했습니다.", null));
//        }
//    }

    // 트리 불러오기 - Get
    @GetMapping
    public ResponseEntity<?> getTree(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
        }

        user = userService.getUser((String) session.getAttribute(SessionConst.LOGIN_NICKNAME));
        Tree existingTree = treeService.findTree(user.getNickname());

        treeForm = new TreeForm(existingTree.getTreeid(), existingTree.getDecoration());

        return ResponseEntity.status(HttpStatus.OK)
                .body(new TreeResponse(true, 200, "트리를 불러오는데 성공했습니다.", user.getNickname(), treeForm.getTreeIdx(), treeForm));
    }

    @PostMapping("/{treeOwnerNickname}/decoration")
    public ResponseEntity<?> addMessage(
            @PathVariable String treeOwnerNickname,
            @RequestBody MessageForm messageForm,
            HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session == null || session.getAttribute(SessionConst.LOGIN_NICKNAME) == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new APIResponse(false, 401, "로그인 상태가 아닙니다.", null));
        }

        // 로그인된 사용자 정보 가져오기
        String loginNickname = (String) session.getAttribute(SessionConst.LOGIN_NICKNAME);
        User loginUser = userService.getUser(loginNickname);

        // treeOwnerNickname에 해당하는 Tree 조회
        Tree tree = treeService.findTree(treeOwnerNickname);
        if (tree == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new APIResponse(false, 404, "트리를 찾을 수 없습니다.", null));
        }

        // 요청 본문에서 받은 메시지 데이터로 Message 객체 생성
        Message newMessage = new Message(
                messageForm.getNickname(), // 메시지 작성자
                messageForm.getMessage(), // 메시지 내용
                tree // 트리와 연관 설정
        );

        try {
            messageService.save(newMessage); // 메시지 저장
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new APIResponse(true, 201, "메세지를 저장하는데 성공했습니다.", newMessage));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new APIResponse(false, 500, "메세지 저장에 실패했습니다.", null));
        }
    }

}
