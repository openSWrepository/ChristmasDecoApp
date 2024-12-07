package _1.logic.Entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class TreeResponse extends APIResponse {
    private String treeOwnerNickname;
    private int treeIdx;

    public TreeResponse(boolean isSuccess, int code, String message, String treeOwnerNickname, int treeIdx, Object result){
        super(isSuccess, code, message, result);
        this.treeOwnerNickname = treeOwnerNickname;
        this.treeIdx = treeIdx;
    }
}
