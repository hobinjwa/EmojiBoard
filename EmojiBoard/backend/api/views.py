"""
API 뷰: 클라이언트의 요청을 처리하는 함수들

예: GET /api/posts → 게시물 목록 반환
    POST /api/posts → 새 게시물 생성
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer

@method_decorator(csrf_exempt, name='dispatch')
class PostViewSet(viewsets.ModelViewSet):
    """
    게시물 CRUD (생성, 읽기, 수정, 삭제)
    """
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['post'])
    def add_comment(self, request, pk=None):
        """댓글 추가"""
        post = self.get_object()
        comment = Comment.objects.create(
            post=post,
            username=request.data.get('username', '익명'),
            emoji=request.data.get('emoji', '😊')
        )
        post.comment_count += 1
        post.save()
        return Response(CommentSerializer(comment).data)

    @action(detail=True, methods=['post'])
    def increment_views(self, request, pk=None):
        """조회수 증가"""
        post = self.get_object()
        post.views += 1
        post.save()
        return Response({'views': post.views})

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """감정 통계"""
        posts = Post.objects.all()
        emotion_counts = {}
        
        for post in posts:
            for emoji in post.emojis:
                emotion_counts[emoji] = emotion_counts.get(emoji, 0) + 1
        
        # 통계 데이터 형식 변환 (라벨과 색상 포함)
        stats_data = []
        for emoji, count in emotion_counts.items():
            # 이모티콘에 맞는 라벨 찾기 (프론트엔드에서 처리하도록 간단하게)
            stats_data.append({
                'name': emoji,
                'value': count,
                'emoji': emoji
            })
        
        return Response(stats_data)

