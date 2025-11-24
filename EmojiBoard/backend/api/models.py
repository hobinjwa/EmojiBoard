"""
데이터베이스 모델 정의

모델은 데이터베이스의 테이블 구조를 정의합니다.
예: Post 모델 = 게시물 테이블
"""

from django.db import models

# 게시물 모델
class Post(models.Model):
    username = models.CharField(max_length=100)  # 작성자 이름
    emojis = models.JSONField(default=list)  # 이모티콘 배열 (예: ["😊", "🥰"])
    views = models.IntegerField(default=0)  # 조회수
    comment_count = models.IntegerField(default=0)  # 댓글 수
    created_at = models.DateTimeField(auto_now_add=True)  # 작성 시간

    class Meta:
        ordering = ['-created_at']  # 최신순 정렬

    def __str__(self):
        return f"{self.username}: {''.join(self.emojis)}"

# 댓글 모델
class Comment(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    username = models.CharField(max_length=100)
    emoji = models.CharField(max_length=10)  # 댓글 이모티콘
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['created_at']  # 오래된 순 정렬

    def __str__(self):
        return f"{self.username}: {self.emoji}"

