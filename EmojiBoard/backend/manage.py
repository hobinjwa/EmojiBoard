#!/usr/bin/env python
"""
Django's command-line utility for administrative tasks.

이 파일은 Django 프로젝트를 관리하는 명령어 도구입니다.
예: python manage.py runserver (서버 실행)
    python manage.py makemigrations (데이터베이스 변경사항 생성)
    python manage.py migrate (데이터베이스 변경사항 적용)
"""

import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'emojiboard.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Django를 설치하지 않았습니다. "
            "가상환경이 활성화되어 있고 requirements.txt의 패키지가 설치되었는지 확인하세요."
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

