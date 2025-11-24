"""
Serializer: 데이터를 JSON 형식으로 변환하는 도구

Django 모델 데이터를 프론트엔드가 이해할 수 있는 JSON 형식으로 변환합니다.
"""

from rest_framework import serializers
from .models import Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id', 'username', 'emoji', 'created_at']

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)  # 댓글 목록 포함
    
    class Meta:
        model = Post
        fields = ['id', 'username', 'emojis', 'views', 'comment_count', 'created_at', 'comments']

