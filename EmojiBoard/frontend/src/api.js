/**
 * API 통신을 담당하는 간단한 파일
 * Django 백엔드와 통신합니다.
 */

import axios from 'axios';

// API 기본 URL (Django 서버 주소)
const API_URL = 'http://127.0.0.1:8000/api';

// 게시물 목록 가져오기
export const getPosts = async () => {
  const response = await axios.get(`${API_URL}/posts/`);
  return response.data;
};

// 게시물 작성하기
export const createPost = async (username, emojis) => {
  const response = await axios.post(`${API_URL}/posts/`, {
    username,
    emojis
  });
  return response.data;
};

// 댓글 추가하기
export const addComment = async (postId, username, emoji) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/add_comment/`, {
    username,
    emoji
  });
  return response.data;
};

// 조회수 증가
export const incrementViews = async (postId) => {
  const response = await axios.post(`${API_URL}/posts/${postId}/increment_views/`);
  return response.data;
};

// 통계 가져오기
export const getStats = async () => {
  const response = await axios.get(`${API_URL}/posts/stats/`);
  return response.data;
};

