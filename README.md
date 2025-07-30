# 🔐 tunneling..DB…FLAG?

목표:  DB서버내 FLAG를 털어라!

---

## 🛠️ Technology Stack
- **Frontend**: JSP, CSS, JavaScript  
- **Backend**: Spring Boot, JWT  
- **Infra**: Docker, Docker Compose  
- **DB**: MySQL  
- **ETC**: NGINX, Tomcat

---

## 📑 목차
1. 주요 명령어  
2. 기여자표  
3. 협업 방식  
4. 개발 기간  
5. 공격 흐름도  
6. ERD  

---

## 주요 명령어

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

---

## 👏 기여자 표

| Profile | Role | Expertise |
|---------|------|-----------|
| (작성 예정) | (작성 예정) | (작성 예정) |

---

## 🔥 협업 방식

| 🖥️ 플랫폼 | 🛠️ 사용 방식 |
|-----------|--------------|
| ![Discord](https://img.shields.io/badge/Discord-5865F2?style=for-the-badge&logo=discord&logoColor=white) | 매주 목요일, 토요일 2시 회의 |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white) | PR을 통해 변경사항 및 테스트 과정 확인 |
| ![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white) | 시나리오 구성, API, 회의 기록 문서화 |

---

## 📆 개발 기간

| 날짜 | 내용 |
|------|------|
| (작성 예정) | (작성 예정) |

---

## 공격 흐름도

<img width="1398" height="665" alt="스크린샷 2025-07-30 181647" src="https://github.com/user-attachments/assets/69fa0ce0-49e1-4b7c-9af2-1849aad91ee6" />


---

## 📝 ERD

<img width="1191" height="533" alt="스크린샷 2025-07-30 181937" src="https://github.com/user-attachments/assets/90e38a0a-1e0d-4ce4-b803-dc8cb0adeed5" />


---

## Write-up
### 침투 흐름 요약
1. Web 서버에서 File Upload 취약점을 통해 webshell을 업로드하고, RCE 권한을 획득한다.
2. tunnel.jsp 파일을 업로드하여 HTTP Tunneling 환경을 구축한다.
3. SOCKS 프록시(SOCKS5) 연결을 통해 공격자 PC에서 내부망에 접근한다.
4. Webshell로 탈취한 SSH 개인키를 이용하여 내부 API 서버에 접속하고, DB에 접근한다.
5. DB에서 AES로 암호화된 Flag 파일을 확보한 후 복호화하여 최종적으로 Flag를 획득한다.

자세한 설명은 아래의 첨부 파일을 확인하시면 됩니다.

[tunneling..DB…FLAG_writeup.pdf](https://github.com/user-attachments/files/21506919/tunneling.DB.FLAG_writeup.pdf)

