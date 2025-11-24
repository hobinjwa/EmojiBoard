"""
Django settings for emojiboard project.

이 파일은 Django 프로젝트의 모든 설정을 담고 있습니다.
데이터베이스, 보안, 설치된 앱 등을 여기서 관리합니다.
"""

from pathlib import Path
import os

# 프로젝트의 기본 경로 설정
BASE_DIR = Path(__file__).resolve().parent.parent

# 보안 키 (실제 배포 시 환경 변수로 관리해야 합니다)
SECRET_KEY = 'django-insecure-emoji-board-secret-key-change-in-production'

# 디버그 모드 (개발 중에는 True, 배포 시에는 False로 변경)
DEBUG = True

# 허용된 호스트 (실제 배포 시 도메인을 추가해야 합니다)
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# 설치된 앱 목록
INSTALLED_APPS = [
    'django.contrib.admin',      # 관리자 페이지
    'django.contrib.auth',       # 사용자 인증 시스템
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    
    # 서드파티 앱 (외부에서 가져온 앱)
    'rest_framework',            # Django REST Framework
    'corsheaders',               # CORS 설정 (프론트엔드와 통신하기 위해 필요)
    'api',                       # 우리가 만든 API 앱
]

# 미들웨어 (요청과 응답 사이에서 작동하는 코드)
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # CORS 미들웨어 (가장 위에 있어야 함)
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# URL 설정 파일 위치
ROOT_URLCONF = 'emojiboard.urls'

# 템플릿 설정
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

# WSGI 애플리케이션 (서버 실행 시 사용)
WSGI_APPLICATION = 'emojiboard.wsgi.application'

# 데이터베이스 설정 (SQLite 사용)
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',  # 데이터베이스 파일 위치
    }
}

# 비밀번호 검증 설정
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# 언어 및 시간대 설정
LANGUAGE_CODE = 'ko-kr'
TIME_ZONE = 'Asia/Seoul'
USE_I18N = True
USE_TZ = True

# 정적 파일 설정 (CSS, JavaScript, 이미지 등)
STATIC_URL = 'static/'

# 기본 기본 키 필드 타입
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# REST Framework 설정 (간단하게 - 인증 없이 모든 사용자 허용)
REST_FRAMEWORK = {
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',  # 모든 사용자 허용
    ],
}

# CORS 설정 (프론트엔드와 통신하기 위해 필요)
# 개발 중에는 모든 출처를 허용 (배포 시에는 특정 도메인만 허용해야 함)
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",  # React 개발 서버 기본 포트
    "http://127.0.0.1:3000",
]

# 또는 개발 중에는 모든 출처 허용 (비추천, 보안상 위험)
CORS_ALLOW_ALL_ORIGINS = True  # 개발 중에만 사용

