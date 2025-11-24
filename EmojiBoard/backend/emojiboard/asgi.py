"""
ASGI config for emojiboard project.

ASGI는 비동기 웹 서버와 Django 애플리케이션을 연결하는 인터페이스입니다.
WebSocket 등 비동기 기능이 필요할 때 사용합니다.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emojiboard.settings')

application = get_asgi_application()

