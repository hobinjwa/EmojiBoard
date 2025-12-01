# EmojiBoard 프로젝트

EmojiBoard는 이모티콘만으로 감정을 빠르게 표현하고 공유하는 웹 애플리케이션입니다. 백엔드는 Django + Django REST Framework로 REST API를 제공하고, 프론트엔드는 React로 인터랙티브한 UI와 실시간 감정 시각화를 제공합니다. 이 저장소는 로컬 개발 환경에서 즉시 실행 가능한 최소 설정으로 구성되어 있습니다.

## 📚 프로젝트 개요

간단히 말해, 사용자는 닉네임을 입력하고 최대 5개의 이모지를 선택하여 감정을 게시할 수 있으며, 다른 사용자의 게시물에 이모지 댓글을 남길 수 있습니다. 백엔드는 게시물(Post)과 댓글(Comment)을 관리하고 통계 API를 제공하며, 프론트엔드는 `axios`로 API와 통신합니다.

## 🏗️ 프로젝트 구조

```
EmojiBoard/
├── backend/              # Django 백엔드 서버 (manage.py, requirements.txt 포함)
│   ├── emojiboard/      # Django 프로젝트 설정 (settings, urls)
│   └── api/             # REST API 앱 (models, views, serializers, migrations)
├── frontend/            # React 프론트엔드 (src, public, package.json)
└── README.md
```

**권장(간단) 구조 요약**
- 루트에 `backend/` 와 `frontend/`가 명확히 존재하도록 유지합니다.
- `backend/api/migrations/`는 버전관리 대상이며, `venv/`와 `node_modules/`는 `.gitignore`에 포함되어야 합니다.
- 프론트엔드의 API 엔드포인트(`API_URL`)는 환경변수(`.env`)로 분리하면 로컬/배포 전환이 쉬워집니다.

## 🛠️ 기술 스택

- **백엔드**: Django, Django REST Framework
- **데이터베이스**: SQLite
- **프론트엔드**: React.js, Tailwind CSS
- **인증**: JWT (JSON Web Token)

## 📖 초보자를 위한 설명

### 1. Django란?

Django는 Python으로 작성된 웹 프레임워크입니다.
서버에서 데이터를 관리하고, API를 제공하는 역할을 합니다.

### 2. REST API란?

REST API는 클라이언트(프론트엔드)와 서버(백엔드)가 데이터를 주고받는 방식입니다.
예를 들어:

- GET /api/posts → 게시물 목록 가져오기
- POST /api/posts → 새 게시물 작성하기

### 3. React란?

React는 사용자 인터페이스(UI)를 만드는 JavaScript 라이브러리입니다.
화면에 보이는 버튼, 입력창, 카드 등을 만듭니다.

## 🚀 시작하기 (초보자용)

### 1단계: 백엔드 설정 (처음 한 번만)

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
python manage.py migrate
```

### 2단계: 백엔드 실행

```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

서버가 http://127.0.0.1:8000 에서 실행됩니다.

### 3단계: 프론트엔드 실행 (새 터미널)

```bash
cd frontend
npm install
npm start
```

브라우저에서 http://localhost:3000 이 자동으로 열립니다.

## 📝 간단한 설명

### Django (백엔드)

- 서버 역할을 합니다
- 데이터를 저장하고 관리합니다
- API를 제공합니다

### React (프론트엔드)

- 사용자가 보는 화면을 만듭니다
- Django API와 통신합니다

## 👥 팀원

- 20618 좌호빈 (Backend & Server)
- 20620 황상현 (Frontend & UI)
