import React, { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { lpPositionAtom } from "../backend/Tree";
import { Box, Text, IconButton } from "@chakra-ui/react";
import { MdPlayArrow as PlayIcon, MdPause as PauseIcon, MdSkipNext as NextIcon, MdSkipPrevious as PrevIcon } from "react-icons/md";
import defaultLPImage from "../assets/LP/LP1.png"; // 기본 LP 이미지
import backgroundMusic1 from "../assets/background-music.mp3/크리스마스니까.mp3"; // 음악 파일 import
import backgroundMusic2 from "../assets/background-music.mp3/첫 눈.mp3"; // 음악 파일 import
import backgroundMusic3 from "../assets/background-music.mp3/첫눈처럼 너에게 가겠다.mp3"; // 음악 파일 import

const LP_Player = ({ lpImage }: { lpImage: string }) => {
    const [position, setPosition] = useAtom(lpPositionAtom); // Atom으로 LP 위치 관리
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [dragging, setDragging] = useState(false);

    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
    const [rotationAngle, setRotationAngle] = useState(0);

    const tracks = [
        { title: "크리스마스니까", file: backgroundMusic1 },
        { title: "첫 눈", file: backgroundMusic2 },
        { title: "첫눈처럼 너에게 가겠다", file: backgroundMusic3 },
    ];

    useEffect(() => {
        const newAudio = new Audio(tracks[currentTrackIndex].file); // 현재 트랙에 대한 새로운 오디오 객체 생성
        setAudio(newAudio);

        if (isPlaying) newAudio.play(); // 재생 상태일 때 새로운 트랙이 설정되면 자동으로 재생
    

        return () => {
            newAudio.pause(); // 컴포넌트 언마운트 시 오디오 정지
            newAudio.src = ""; // 메모리 해제를 위해 오디오 소스를 빈 문자열로 설정
        };
    }, [currentTrackIndex]);

    useEffect(() => {
        let rotationInterval: NodeJS.Timeout | undefined;
        if (isPlaying) {
            rotationInterval = setInterval(() => {
                setRotationAngle((prevAngle) => prevAngle + 1); // LP 이미지 회전 각도 증가
            }, 30);
        } else {
            clearInterval(rotationInterval);
        }
        return () => clearInterval(rotationInterval);
    }, [isPlaying]);

    // 재생/일시정지 버튼 클릭 핸들러
    const handlePlayPause = () => {
        if (!audio) return;

        if (isPlaying) {
            audio.pause(); // 오디오 일시정지
        } else {
            audio.play(); // 오디오 재생
        }
        setIsPlaying(!isPlaying); // 재생 상태 토글
    };

    // 다음 트랙으로 이동 핸들러
    const handleNextTrack = () => {
        setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
        setIsPlaying(true); // 다음 트랙으로 이동할 때 자동으로 재생
    };

    // 이전 트랙으로 이동 핸들러
    const handlePrevTrack = () => {
        if (audio && audio.currentTime > 2) {
            // 현재 트랙이 2초 이상 재생되었을 경우, 같은 트랙 처음부터 재생
            audio.currentTime = 0;
            audio.play();
        } else {
            // 현재 트랙이 2초 이하 재생되었을 경우, 이전 트랙으로 이동
            setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
            setIsPlaying(true); // 이전 트랙으로 이동할 때 자동으로 재생
        }
    };

    // 드래그 시작 핸들러
    const handleMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragOffset({
            x: e.clientX - position.x, // 마우스 클릭 위치와 LP판 위치 차이를 저장
            y: e.clientY - position.y,
        });
        setDragging(true); // 드래그 상태 활성화
    };

    // 드래그 중일 때 LP판 위치 업데이트 핸들러
    const handleMouseMove = (e: MouseEvent) => {
        if (!dragging) return;
        setPosition({
            x: e.clientX - dragOffset.x, // 마우스 위치에서 오프셋을 뺀 x 좌표로 LP판 위치 설정
            y: e.clientY - dragOffset.y, // 마우스 위치에서 오프셋을 뺀 y 좌표로 LP판 위치 설정
        });
    };

    // 드래그 종료 핸들러
    const handleMouseUp = () => {
        setDragging(false); // 드래그 상태 비활성화
    };

    useEffect(() => {
        if (dragging) {
            window.addEventListener("mousemove", handleMouseMove); // 마우스 이동 이벤트 리스너 추가
            window.addEventListener("mouseup", handleMouseUp); // 마우스 버튼을 놓는 이벤트 리스너 추가
        } else {
            window.removeEventListener("mousemove", handleMouseMove); // 마우스 이동 이벤트 리스너 제거
            window.removeEventListener("mouseup", handleMouseUp); // 마우스 버튼을 놓는 이벤트 리스너 제거
        }
        return () => {
            window.removeEventListener("mousemove", handleMouseMove); // 컴포넌트 언마운트 시 마우스 이동 이벤트 리스너 제거
            window.removeEventListener("mouseup", handleMouseUp); // 컴포넌트 언마운트 시 마우스 버튼을 놓는 이벤트 리스너 제거
        };
    }, [dragging, dragOffset]);

    return (
        <Box
            position="absolute"
            top={`${position.y}px`} // LP판의 y 좌표 설정
            left={`${position.x}px`} // LP판의 x 좌표 설정
            width="200px" // LP판의 너비 설정
            height="200px" // LP판의 높이 설정
            borderRadius="50%" // LP판을 둥근 모양으로 설정
            bgColor="transparent" // 배경색 투명하게 설정
            boxShadow="lg" // 박스 그림자 추가
            onMouseDown={handleMouseDown} // 마우스 버튼을 눌렀을 때 드래그 시작 핸들러 호출
            cursor="grab" // 마우스 커서 모양을 '잡기' 형태로 설정
        >
            <img
                src={lpImage || defaultLPImage} // LP 이미지 설정 (lpImage가 없으면 기본 이미지 사용)
                style={{
                    width: "100%", // 이미지 너비 설정
                    height: "100%", // 이미지 높이 설정
                    objectFit: "contain", // 이미지 비율 유지하며 크기 조정
                    borderRadius: "50%", // 이미지의 모서리를 둥글게 설정
                    transform: `rotate(${rotationAngle}deg)`, // 이미지 회전 각도 설정
                    transition: "transform 0.1s linear", // 회전 애니메이션 적용
                }}
            />
            <Text
                position="absolute"
                top="50%" // LP판 중앙에 위치 설정
                left="50%" // LP판의 중앙에 위치 설정
                transform="translate(-50%, -50%)" // 수평 및 수직 중앙 정렬
                color="white"
                fontSize="xl" // 글자 크기 키움
                textAlign="center"
            >
                {tracks[currentTrackIndex].title} {/* 현재 재생 중인 트랙 제목 표시 */}
            </Text>
            <Box
                position="absolute"
                bottom="10%" // LP판 아래쪽에 위치 설정
                left="50%" // LP판의 중앙에 위치 설정
                transform="translateX(-50%)" // 수평 중앙 정렬
                textAlign="center" // 텍스트 중앙 정렬
            >
                <Box display="flex" justifyContent="center" alignItems="center">
                    <IconButton
                        aria-label="Previous Track"
                        icon={<PrevIcon />}
                        color="white"
                        onClick={handlePrevTrack} // 클릭 시 이전 트랙으로 이동
                        variant="ghost" // 테두리를 없애고 아이콘만 보이도록 설정
                        style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <IconButton
                        aria-label="Play/Pause"
                        icon={isPlaying ? <PauseIcon /> : <PlayIcon />}
                        color="white"
                        onClick={handlePlayPause} // 클릭 시 재생/일시정지 핸들러 호출
                        variant="ghost" // 테두리를 없애고 아이콘만 보이도록 설정
                        style={{ cursor: "pointer", marginRight: "10px" }}
                    />
                    <IconButton
                        aria-label="Next Track"
                        icon={<NextIcon />}
                        color="white"
                        onClick={handleNextTrack} // 클릭 시 다음 트랙으로 이동
                        variant="ghost" // 테두리를 없애고 아이콘만 보이도록 설정
                        style={{ cursor: "pointer" }}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default LP_Player;

