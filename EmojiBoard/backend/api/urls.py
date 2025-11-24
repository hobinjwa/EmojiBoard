"""
API URL 설정

어떤 URL이 어떤 기능을 실행할지 정의합니다.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet

router = DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
]

