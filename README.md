# 🔐 Net_Robotics
이 프로젝트는 Pentesting playground 플랫폼을 위한 시나리오로, 망분리 환경에 기반한 웹 취약점부터 내부망 침투까지 chaining 형식으로 구성되어있습니다. 
이 문서는 프로젝트의 설치 방법, 기여자 정보, 기술 스택, 협업 방식, 개발 기간, 시스템 아키텍처, ERD, 그리고 시나리오를 설명합니다.

---

## 🛠️ Technology Stack
- **Frontend**: JSP, CSS, JavaScript  
- **Backend**: Spring Boot, JWT  
- **Infra**: Docker, Docker Compose  
- **DB**: MySQL  
- **ETC**: Tomcat

---

## 📑 목차
1. 서버 설치 방법
2. 기여자 표  
3. 협업 방식  
4. 개발 기간  
5. 공격 흐름도  
6. ERD
7. 시나리오 Write up

---

## 서버 설치 방법

```bash
# 저장소 클론
git clone https://github.com/WHS-PentestingPlayground/Net_Robotics-infra.git

# 전체 서비스 시작
docker-compose up -d --build

# 전체 서비스 중지
docker-compose down

# 로그 확인
docker-compose logs -f [service-name]

# 특정 모듈만 빌드
docker-compose build [service-name]
```

## 👏 기여자 표

<h3>Project Team</h3>

<table>
  <thead>
    <tr>
      <th>Profile</th>
      <th>Role</th>
      <th>Contribution</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td align="center">
        <a href="https://github.com/kkaturi14">
          <img src="https://github.com/kkaturi14.png" width="60"/><br/>
          minkyungkwak
        </a>
      </td>
      <td align="center">Project Member</td>
      <td align="center">시나리오 문서 작성</td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/yelin1197">
          <img src="https://github.com/yelin1197.png" width="60"/><br/>
          yelin1197
        </a>
      </td>
      <td align="center">Project Member</td>
      <td align="center">도커 구성 및 암호화 기능 개발</td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/legendwon">
          <img src="https://github.com/legendwon.png" width="60"/><br/>
          legendwon
        </a>
      </td>
      <td align="center">Project Manager</td>
      <td align="center">PM 총괄, 시나리오 문서 작성</td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/Ranunculus2165">
          <img src="https://github.com/Ranunculus2165.png" width="60"/><br/>
          woo.__.bee
        </a>
      </td>
      <td align="center">Project Member</td>
      <td align="center">게시판 기능 개발</td>
    </tr>
  </tbody>
</table>


---

## 🔥 협업 방식

| 🖥️ 플랫폼 | 🛠️ 사용 방식 |
|-----------|--------------|
| ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) | 매주 목요일, 토요일 2시 회의 |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) | PR을 통해 변경사항 및 테스트 과정 확인 |
| ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) | 시나리오 구성, API, 회의 기록 문서화 |

---

## 📆 개발 기간
- 2025.05.01 ~ 2025.05.03 : 팀 규칙 및 코딩 컨벤션 의논, 시나리오 컨셉 회의</br>
- 2025.05.03 ~ 2025.05.10 : 시나리오 취약점 및 망분리 환경 공부</br>
- 2025.05.10 ~ 2025.05.18 : 프로젝트 개발 환경 세팅</br>
- 2025.05.18 ~ 2025.05.31 : 시나리오 기획, 기능명세서, ERD 제작</br>
- 2025.05.31 ~ 2025.06.09 : 게시판 구현 및 도커화</br>
- 2025.06.09 ~ 2025.06.22 : 취약점(File Upload, HTTP 터널링, 내부망 침투, AES 암호화 등)구현 및 난이도조정</br>

---

## 공격 흐름도

<img width="1398" height="665" alt="스크린샷 2025-07-30 181647" src="https://github.com/user-attachments/assets/69fa0ce0-49e1-4b7c-9af2-1849aad91ee6" />


---

## 📝 ERD

<img width="1191" height="533" alt="스크린샷 2025-07-30 181937" src="https://github.com/user-attachments/assets/90e38a0a-1e0d-4ce4-b803-dc8cb0adeed5" />


---

## 시나리오 Write up
<img width="1700" height="2200" alt="tunneling DB…FLAG_writeup-02" src="https://github.com/user-attachments/assets/89cdabd7-d554-40ea-b3ad-229b7dfae342" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/f3583c9a-3d6b-4072-96ed-3ad7be0abadf" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/fa5f2ddd-7a05-47be-9505-fe23f59202ed" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/893f51a3-4472-4454-83fd-894cb6458956" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/ea1f3864-7fb2-4a6e-b3b5-cba1cacbef66" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/5d0aad42-13cf-4e24-a138-3c3b71c2d531" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/0929fe1e-6a8e-4c24-a6a6-17a622fd46fd" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/2fd90878-5710-4086-b932-7f7c9bf3e1cd" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/c7b859e1-160c-42f7-924c-7a28ba81c7ff" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/4d850b44-3cd6-4b00-b151-9f61c719b3a5" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/69db5bbe-550c-4bd6-ae8d-db50c38727d6" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/61fc1812-d7a8-42a2-857e-525c73546275" />

<img width="1700" height="2200" alt="Image" src="https://github.com/user-attachments/assets/2a4d001a-c51c-4c64-ab27-6ab5afc50f5d" />

