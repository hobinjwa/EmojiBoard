"""
emojiboard 프로젝트의 URL 설정

이 파일은 어떤 URL이 어떤 기능을 실행할지 결정합니다.
예: /api/posts → 게시물 목록 보기
"""

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    # 관리자 페이지 (/admin/)
    path('admin/', admin.site.urls),
    
    # API 관련 URL은 api 앱의 urls.py에서 처리
    path('api/', include('api.urls')),
]

