# 🚀 빠른 시작 가이드

## 완성된 프로젝트 구조
```
EmojiBoard/
├── backend/          # Django 서버
│   ├── api/         # API 앱
│   ├── emojiboard/  # 프로젝트 설정
│   └── manage.py
└── frontend/        # React 앱
    └── src/
```

## 실행 방법

### 1. 백엔드 실행 (터미널 1)
```bash
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### 2. 프론트엔드 실행 (터미널 2)
```bash
cd frontend
npm install
npm start
```

### 3. 브라우저에서 확인
- 프론트엔드: http://localhost:3000
- 백엔드 API: http://127.0.0.1:8000/api/posts/

## 주요 기능
✅ 닉네임 입력 후 입장
✅ 이모티콘으로 감정 게시 (최대 5개)
✅ 피드에서 다른 사람의 감정 보기
✅ 댓글 달기 (이모티콘)
✅ 통계 보기

## 문제 해결

### "ModuleNotFoundError: No module named 'django'"
→ 가상환경이 활성화되지 않았습니다. `venv\Scripts\activate` 실행

### "CORS error"
→ 백엔드가 실행 중인지 확인하세요. settings.py에서 CORS_ALLOW_ALL_ORIGINS = True로 설정되어 있습니다.

### "npm start 오류"
→ `npm install`을 먼저 실행하세요.

