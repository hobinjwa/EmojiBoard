"""
WSGI config for emojiboard project.

WSGI는 웹 서버와 Django 애플리케이션을 연결하는 인터페이스입니다.
실제 배포 시 이 파일을 사용합니다.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emojiboard.settings')

application = get_wsgi_application()

