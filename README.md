# 🎄 크리스마스 트리 공간 꾸미기 웹사이트 제작

## 📁 프로젝트 소개

소중한 사람들을 초대해 나만의 온라인 공간을 꾸미고, 그동안 전하고 싶었던 마음을 편지로 작성하여 특별한 추억을 공유할 수 있는 서비스입니다.

설레는 마음으로 크리스마스를 기다리며 웹 공간을 꾸며보세요!

---

## 👥 팀원

---
<p align="center">
  <a href="https://github.com/StarChoiMarine" style="display: grid; " >
    <img src="https://github.com/user-attachments/assets/8e7f5396-2a04-4bf9-ae19-293051c96b06" alt="Choi" width="150" height="150" />
  </a>
  <a href="https://github.com/Aeri0730">
    <img src="https://github.com/user-attachments/assets/9338fa55-59d2-4229-b243-a7be93f239f4" alt="Aeri" width="150" height="150" />
  </a>
  <a href="https://github.com/Kokoaca">
    <img src="https://github.com/user-attachments/assets/6adf6024-07a1-4066-afdf-c5dea6ff6f98" alt="Kokoaca" width="150" height="150" />
  </a>
  <a href="https://github.com/uijin00">
    <img src="https://github.com/user-attachments/assets/857fb21a-ec8a-4812-a9b7-0b3b15b70187" alt="Uijin" width="150" height="150" />
  </a>
  <a href="https://github.com/Chang-Daegyu">
    <img src="https://github.com/user-attachments/assets/2499957a-f556-46a5-827d-6832bcb0e4af" alt="Daegyu" width="150" height="150" />
  </a>
</p>


---

## 🔴 핵심 기능

###개발 스택
- Typescript
- Spring
- Node.js
- Nginx
- spring boot

- docker
- kubernetes

### 크리스마스 공간 꾸미기

- 크리스마스 트리를 드래그하여 자유롭게 위치 설정
- 배경사진 자유롭게 변경
- LP기능을 통해 배경음악 기능

### 편지 쓰기 기능

- URL을 통해 초대받은 이용자가 편지를 작성
- 편지가 작성되면 화면에 편지 버튼이 생기고 버튼을 누르면 내용 확인 가능

---



## 💫 추후 개발 기능

- 서버 배포 단계에서 발생하는 서버 에러 해결
- 다양한 장식품 추가
- 초대 기능 구체화

---

## 👉🏿 시스템 실행 방법

### 1. docker-compose 실행

1. 프로젝트 클론
    
    ```bash
    git clone https://github.com/openSWrepository/ChristmasDecoApp.git
    ```
    
2. 루트 디렉토리에서 docker-compose 빌드
---
![image](https://github.com/user-attachments/assets/72735d13-e361-44f3-b84f-b2474557085d)
---

      ```bash
      docker-compose up --build
      ```

3. 로컬 호스트 3000번 포트 접속
    ```bash
    http://localhost:3000/
    ```


