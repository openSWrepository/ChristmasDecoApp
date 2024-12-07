// 숫자 배열 생성
export const range = (x: number, startAt: number) => [...Array(x).keys()].map(i => i + startAt); 

// 브랜드 색상 정의
export const brandColor = {
    christmasTree: "#027228", // 초록색
    santaSock: "#D20001",     // 빨간색
    fallingSnow: "#F9FAFF",   // 흰색
    nightSky: "#010317",      // 밤하늘
    dawnSky: "#1B1D31"        // 새벽 하늘
};

// 클립보드 복사 기능 추가
export const copyToClipboard = (text: string): void => {
    navigator.clipboard
        .writeText(text)
        .then(() => console.log("클립보드에 복사 성공:", text))
        .catch((err) => console.error("클립보드 복사 실패:", err));
};