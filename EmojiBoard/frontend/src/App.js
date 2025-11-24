import React, { useState, useEffect } from 'react';
import { 
  Smile, BarChart2, List, PlusCircle, LogOut, Info,
  Eye, MessageCircle, Clock, Sparkles, TrendingUp, User as UserIcon, X
} from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { getPosts, createPost, addComment, incrementViews, getStats } from './api';

// 이모티콘 데이터
const EMOTIONS = [
  { id: 'happy', emoji: '😊', label: '행복', color: '#FFD93D' },
  { id: 'love', emoji: '🥰', label: '사랑', color: '#FF6B6B' },
  { id: 'funny', emoji: '🤣', label: '즐거움', color: '#4D96FF' },
  { id: 'star', emoji: '🤩', label: '반함', color: '#FFD700' },
  { id: 'moved', emoji: '🥹', label: '감동', color: '#74C0FC' },
  { id: 'wink', emoji: '😉', label: '윙크', color: '#FFD43B' },
  { id: 'sad', emoji: '😢', label: '슬픔', color: '#6BCB77' },
  { id: 'cry', emoji: '😭', label: '오열', color: '#5C7CFA' },
  { id: 'angry', emoji: '😡', label: '분노', color: '#FF4949' },
  { id: 'explode', emoji: '🤯', label: '폭발', color: '#FF6B6B' },
  { id: 'tired', emoji: '🫠', label: '피곤', color: '#8D9EFF' },
  { id: 'sleep', emoji: '😴', label: '졸림', color: '#748FFC' },
  { id: 'shock', emoji: '😱', label: '놀람', color: '#A0E4CB' },
  { id: 'confused', emoji: '😵‍💫', label: '어질', color: '#CC5DE8' },
  { id: 'ghost', emoji: '👻', label: '멘붕', color: '#E9ECEF' },
  { id: 'thinking', emoji: '🤔', label: '고민', color: '#F9D5A7' },
  { id: 'fire', emoji: '🔥', label: '열정', color: '#FF922B' },
  { id: 'sick', emoji: '😷', label: '아픔', color: '#CFF5E7' },
  { id: 'vomit', emoji: '🤮', label: '우웩', color: '#51CF66' },
  { id: 'cool', emoji: '😎', label: '자신감', color: '#59CE8F' },
  { id: 'money', emoji: '🤑', label: '플렉스', color: '#51CF66' },
  { id: 'crazy', emoji: '🤪', label: '광기', color: '#FF922B' },
  { id: 'party', emoji: '🥳', label: '축하', color: '#FFD369' },
  { id: 'clap', emoji: '👏', label: '박수', color: '#FFE8CC' },
  { id: 'angel', emoji: '😇', label: '천사', color: '#63E6BE' },
  { id: 'devil', emoji: '😈', label: '악마', color: '#9C36B5' },
  { id: 'skull', emoji: '💀', label: '나락', color: '#868E96' },
  { id: 'pray', emoji: '🙏', label: '부탁/감사', color: '#D8F5A2' },
  { id: 'ok', emoji: '👌', label: '오케이', color: '#FCC2D7' },
  { id: 'poop', emoji: '💩', label: '최악', color: '#AE3EC9' },
  { id: 'neutral', emoji: '😐', label: '무표정', color: '#EEEEEE' },
  { id: 'zip', emoji: '🤐', label: '할말하않', color: '#CED4DA' },
  { id: 'shh', emoji: '🤫', label: '쉿', color: '#ADB5BD' },
  { id: 'liar', emoji: '🤥', label: '거짓말', color: '#FAB005' },
  { id: 'sweat', emoji: '😅', label: '땀땀', color: '#4DABF7' },
  { id: 'hot', emoji: '🥵', label: '더움', color: '#FF6B6B' },
  { id: 'cold', emoji: '🥶', label: '추움', color: '#4DABF7' },
  { id: 'alien', emoji: '👽', label: '외계인', color: '#20C997' },
  { id: 'robot', emoji: '🤖', label: '로봇', color: '#868E96' },
  { id: 'check', emoji: '✅', label: '완료', color: '#69DB7C' },
  { id: 'hundred', emoji: '💯', label: '완벽', color: '#FF6B6B' },
  { id: 'heart', emoji: '❤️', label: '마음', color: '#FF8787' },
  { id: 'delicious', emoji: '😋', label: '맛있음', color: '#FF922B' },
  { id: 'relief', emoji: '😌', label: '편안', color: '#69DB7C' },
];

// 로그인 화면
const LoginScreen = ({ setUser }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('닉네임을 입력해주세요.');
      return;
    }
    setUser({ displayName: name });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F5F5F7] p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold tracking-tight text-[#1D1D1F] mb-4">
            Emoji<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">Board</span>.
          </h1>
          <p className="text-[#86868B] text-lg font-medium">당신의 감정을 가장 심플하게.</p>
        </div>

        <div className="bg-white p-10 rounded-[30px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100">
          <h2 className="text-2xl font-semibold text-[#1D1D1F] mb-8 text-center">시작하기</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="사용할 닉네임을 입력하세요"
              required
              className="w-full px-5 py-4 bg-[#F5F5F7] border-none rounded-2xl text-[17px] focus:ring-2 focus:ring-[#0071E3] focus:bg-white transition-all placeholder-gray-400 text-center"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {error && (
              <div className="p-3 bg-red-50 text-red-500 text-sm text-center rounded-xl">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full py-4 rounded-full font-semibold text-[17px] text-white bg-[#0071E3] hover:bg-[#0077ED] active:scale-[0.98] transition-all shadow-lg shadow-blue-500/20 mt-4"
            >
              입장하기
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-6">
            * 별도의 회원가입 없이 바로 이용 가능합니다.
          </p>
        </div>
        <div className="mt-10 text-center text-[#86868B] text-xs font-medium">
          <p>Designed by EmojiBoard Team</p>
          <p>20618 좌호빈, 20620 황상현</p>
        </div>
      </div>
    </div>
  );
};

// 댓글 섹션
const CommentSection = ({ postId, user, comments, onAddComment }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleAddComment = async (emoji) => {
    await onAddComment(postId, emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div className="mt-4 pt-4 border-t border-gray-100">
      <div className="space-y-3 mb-4 max-h-40 overflow-y-auto">
        {comments.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-2">첫 번째 댓글을 남겨보세요!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex items-center space-x-2">
              <span className="text-xs font-bold text-gray-600">{comment.username}</span>
              <span className="text-lg">{comment.emoji}</span>
            </div>
          ))
        )}
      </div>

      {showEmojiPicker ? (
        <div className="grid grid-cols-8 gap-2 bg-gray-50 p-3 rounded-xl mb-2 max-h-[200px] overflow-y-auto">
          {EMOTIONS.map((e) => (
            <button
              key={e.id}
              onClick={() => handleAddComment(e.emoji)}
              className="text-xl hover:scale-125 transition-transform"
            >
              {e.emoji}
            </button>
          ))}
          <button onClick={() => setShowEmojiPicker(false)} className="text-xs text-red-400 col-span-8 mt-2">
            취소
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowEmojiPicker(true)}
          className="w-full py-2 bg-gray-50 text-gray-500 rounded-lg text-sm hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
        >
          <MessageCircle className="w-4 h-4" />
          <span>이모티콘으로 답글 달기</span>
        </button>
      )}
    </div>
  );
};

// 피드 아이템
const FeedItem = ({ post, user, onExpand, onAddComment }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const date = new Date(post.created_at).toLocaleDateString();
  const emojis = post.emojis || [];
  const mainEmoji = emojis[0];
  const emotion = EMOTIONS.find(e => e.emoji === mainEmoji);

  const handleExpand = async () => {
    if (!isExpanded) {
      await onExpand(post.id);
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`group bg-white rounded-[24px] p-6 mb-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] border transition-all duration-300 ${isExpanded ? 'border-blue-200 ring-2 ring-blue-50' : 'border-gray-100/50'}`}>
      <div className="cursor-pointer" onClick={handleExpand}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5 overflow-hidden">
            <div className="flex items-center -space-x-4 hover:space-x-1 transition-all duration-300 py-2 pl-2">
              {emojis.map((e, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-16 h-16 flex items-center justify-center bg-[#F5F5F7] rounded-full text-4xl shadow-sm ring-4 ring-white z-10 transform transition-transform hover:scale-110 hover:z-20"
                >
                  {e}
                </div>
              ))}
            </div>
            <div>
              <p className="text-[#1D1D1F] font-semibold text-lg mb-1">{post.username || '익명 사용자'}</p>
              <div className="flex items-center space-x-2">
                <span
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium shadow-sm"
                  style={{
                    backgroundColor: emotion ? `${emotion.color}20` : '#eee',
                    color: emotion ? emotion.color : '#666'
                  }}
                >
                  {emojis.length > 1 ? `${emotion?.label} 외 ${emojis.length - 1}개` : emotion?.label || '감정'}
                </span>
              </div>
            </div>
          </div>
          <div className="text-right flex flex-col items-end space-y-1 pl-2">
            <p className="text-xs text-[#86868B] font-medium whitespace-nowrap">{date}</p>
            <div className="flex items-center space-x-3 text-[#86868B] text-xs">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{post.views || 0}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MessageCircle className="w-3 h-3" />
                <span>{post.comment_count || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isExpanded && (
        <div>
          <CommentSection
            postId={post.id}
            user={user}
            comments={post.comments || []}
            onAddComment={onAddComment}
          />
        </div>
      )}
    </div>
  );
};

// 통계 뷰
const StatsView = ({ posts }) => {
  const data = posts.map(post => {
    const emojis = post.emojis || [];
    return emojis.map(emoji => {
      const emotionData = EMOTIONS.find(e => e.emoji === emoji);
      return {
        name: emotionData ? emotionData.label : '기타',
        value: 1,
        color: emotionData ? emotionData.color : '#8884d8'
      };
    });
  }).flat().reduce((acc, item) => {
    const existing = acc.find(x => x.name === item.name);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push(item);
    }
    return acc;
  }, []).sort((a, b) => b.value - a.value);

  return (
    <div className="bg-white rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 p-8 h-full flex flex-col">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#1D1D1F]">감정 데이터</h2>
        <p className="text-[#86868B] text-sm mt-1">실시간 커뮤니티 감정 분포 분석</p>
      </div>
      <div className="flex-1 min-h-[300px] flex items-center justify-center">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-[#86868B] bg-[#F5F5F7] px-6 py-3 rounded-full text-sm font-medium">
            데이터가 충분하지 않습니다.
          </div>
        )}
      </div>
    </div>
  );
};

// 메인 앱
export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('feed');
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmojis, setSelectedEmojis] = useState([]);
  const [feedFilter, setFeedFilter] = useState('latest');

  // 게시물 불러오기
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await getPosts();
        setPosts(data);
      } catch (error) {
        console.error('게시물 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
    const interval = setInterval(loadPosts, 3000); // 3초마다 새로고침
    return () => clearInterval(interval);
  }, []);

  // 필터링
  const filteredPosts = [...posts].sort((a, b) => {
    if (feedFilter === 'latest') {
      return new Date(b.created_at) - new Date(a.created_at);
    } else if (feedFilter === 'popular') {
      const scoreA = (a.views || 0) + (a.comment_count || 0) * 2;
      const scoreB = (b.views || 0) + (b.comment_count || 0) * 2;
      return scoreB - scoreA;
    } else {
      return Math.random() - 0.5;
    }
  });

  // 이모티콘 토글
  const toggleEmoji = (emoji) => {
    if (selectedEmojis.includes(emoji)) {
      setSelectedEmojis(selectedEmojis.filter(e => e !== emoji));
    } else {
      if (selectedEmojis.length >= 5) {
        alert("최대 5개까지만 선택할 수 있습니다.");
        return;
      }
      setSelectedEmojis([...selectedEmojis, emoji]);
    }
  };

  // 게시물 작성
  const handlePost = async () => {
    if (selectedEmojis.length === 0 || !user) return;
    try {
      await createPost(user.displayName, selectedEmojis);
      setSelectedEmojis([]);
      setView('feed');
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('게시 실패:', error);
      alert("게시에 실패했습니다.");
    }
  };

  // 조회수 증가
  const handleExpand = async (postId) => {
    try {
      await incrementViews(postId);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('조회수 증가 실패:', error);
    }
  };

  // 댓글 추가
  const handleAddComment = async (postId, emoji) => {
    if (!user) return;
    try {
      await addComment(postId, user.displayName, emoji);
      const data = await getPosts();
      setPosts(data);
    } catch (error) {
      console.error('댓글 추가 실패:', error);
    }
  };

  if (!user) {
    return <LoginScreen setUser={setUser} />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-sans pb-24 md:pb-0">
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 h-[64px] flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setView('feed')}>
            <div className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center text-xl shadow-lg">
              <Smile className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-[#1D1D1F]">
              Emoji<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">Board</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-right bg-gray-100/50 px-3 py-1.5 rounded-full">
              <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <UserIcon className="w-3 h-3" />
              </div>
              <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                {user.displayName || '사용자'}
              </span>
            </div>
            <button
              onClick={() => setView('about')}
              className={`p-2 rounded-full transition-all ${view === 'about' ? 'bg-black text-white shadow-md' : 'text-[#86868B] hover:bg-gray-100'}`}
            >
              <Info className="w-5 h-5" />
            </button>
            <button
              onClick={() => setUser(null)}
              className="flex items-center space-x-1 px-3 py-1.5 text-red-500 hover:bg-red-50 rounded-full transition-all text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">로그아웃</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-[110px] pb-10">
        {view === 'feed' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-end px-2 gap-4">
              <div>
                <h2 className="text-3xl font-bold text-[#1D1D1F]">피드</h2>
                <p className="text-[#86868B] font-medium mt-1">실시간 감정 타임라인</p>
              </div>
              <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200/50">
                <button
                  onClick={() => setFeedFilter('latest')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${feedFilter === 'latest' ? 'bg-black text-white shadow-sm' : 'text-[#86868B] hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-1">
                    <Clock className="w-3 h-3" />
                    <span>최신</span>
                  </div>
                </button>
                <button
                  onClick={() => setFeedFilter('popular')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${feedFilter === 'popular' ? 'bg-black text-white shadow-sm' : 'text-[#86868B] hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>인기</span>
                  </div>
                </button>
                <button
                  onClick={() => setFeedFilter('recommended')}
                  className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${feedFilter === 'recommended' ? 'bg-black text-white shadow-sm' : 'text-[#86868B] hover:bg-gray-50'}`}
                >
                  <div className="flex items-center space-x-1">
                    <Sparkles className="w-3 h-3" />
                    <span>추천</span>
                  </div>
                </button>
              </div>
            </div>

            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block w-8 h-8 border-4 border-gray-200 border-t-[#0071E3] rounded-full animate-spin"></div>
              </div>
            ) : filteredPosts.length === 0 ? (
              <div className="text-center py-32 bg-white rounded-[30px] shadow-sm border border-gray-100">
                <p className="text-xl text-[#1D1D1F] font-semibold mb-2">게시물이 없습니다.</p>
                <p className="text-[#86868B] mb-6">가장 먼저 감정을 공유해보세요.</p>
                <button
                  onClick={() => setView('post')}
                  className="px-6 py-3 bg-[#0071E3] text-white rounded-full font-semibold hover:bg-[#0077ED] transition-all shadow-lg shadow-blue-500/30"
                >
                  첫 게시물 작성
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredPosts.map(post => (
                  <FeedItem
                    key={post.id}
                    post={post}
                    user={user}
                    onExpand={handleExpand}
                    onAddComment={handleAddComment}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {view === 'post' && (
          <div>
            <div className="bg-white rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 p-8 md:p-12 max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1D1D1F] mb-3">오늘 하루는 어땠나요?</h2>
                <p className="text-[#86868B] text-lg">최대 5개까지 감정을 섞어서 표현해보세요.</p>
              </div>

              <div className="flex justify-center mb-8 min-h-[80px]">
                {selectedEmojis.length > 0 ? (
                  <div className="flex space-x-2 p-4 bg-[#F5F5F7] rounded-2xl">
                    {selectedEmojis.map((emoji, idx) => (
                      <span key={idx} className="text-4xl">{emoji}</span>
                    ))}
                    <button onClick={() => setSelectedEmojis([])} className="ml-2 p-2 text-gray-400 hover:text-red-500">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 border-2 border-dashed border-gray-200 rounded-2xl px-8 w-full max-w-md">
                    <span className="text-sm">이모티콘을 탭하여 추가하세요</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-10">
                {EMOTIONS.map((emotion) => {
                  const isSelected = selectedEmojis.includes(emotion.emoji);
                  return (
                    <button
                      key={emotion.id}
                      onClick={() => toggleEmoji(emotion.emoji)}
                      className={`aspect-square rounded-[24px] flex flex-col items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-blue-50 ring-2 ring-[#0071E3] scale-95 shadow-inner'
                          : 'bg-[#F5F5F7] hover:bg-[#E8E8ED] hover:scale-105'
                      }`}
                    >
                      <span className="text-3xl md:text-4xl mb-2">{emotion.emoji}</span>
                      <span className={`text-[10px] md:text-xs font-semibold ${isSelected ? 'text-[#0071E3]' : 'text-[#86868B]'}`}>
                        {emotion.label}
                      </span>
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-3 h-3 bg-[#0071E3] rounded-full"></div>
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handlePost}
                  disabled={selectedEmojis.length === 0}
                  className={`w-full md:w-2/3 py-5 rounded-full font-bold text-lg transition-all duration-300 shadow-xl ${
                    selectedEmojis.length > 0
                      ? 'bg-[#0071E3] text-white hover:bg-[#0077ED] hover:scale-[1.02] shadow-blue-500/30'
                      : 'bg-[#E8E8ED] text-[#86868B] cursor-not-allowed'
                  }`}
                >
                  {selectedEmojis.length > 0 ? `${selectedEmojis.length}개의 감정 공유하기` : '이모티콘을 선택해주세요'}
                </button>
              </div>
            </div>
          </div>
        )}

        {view === 'stats' && (
          <div className="h-[70vh]">
            <StatsView posts={posts} />
          </div>
        )}

        {view === 'about' && (
          <div className="bg-white rounded-[30px] shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="bg-[#F5F5F7] p-10 text-center">
              <h2 className="text-3xl font-bold text-[#1D1D1F] mb-2">EmojiBoard</h2>
              <p className="text-[#86868B]">Project Information</p>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1 p-6 bg-[#F5F5F7] rounded-[24px]">
                  <h3 className="text-[#1D1D1F] font-semibold text-lg mb-4">Team</h3>
                  <ul className="space-y-3 text-[#424245]">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-[#0071E3] rounded-full mr-3"></span>
                      20618 좌호빈 (Backend & Server)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                      20620 황상현 (Frontend & UI)
                    </li>
                  </ul>
                </div>
                <div className="flex-1 p-6 bg-[#F5F5F7] rounded-[24px]">
                  <h3 className="text-[#1D1D1F] font-semibold text-lg mb-4">Philosophy</h3>
                  <p className="text-[#424245] leading-relaxed">
                    우리는 복잡한 텍스트 대신 <span className="font-bold text-[#1D1D1F]">직관적인 이모티콘</span>으로 소통합니다.
                    언어적 장벽과 오해 없이, 순수한 감정만을 공유하는 공간을 지향합니다.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50 md:hidden w-[90%] max-w-[320px]">
        <nav className="bg-white/80 backdrop-blur-xl rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-white/20 p-1.5 flex justify-between items-center">
          <button
            onClick={() => setView('feed')}
            className={`flex-1 py-3 rounded-full flex items-center justify-center transition-all ${
              view === 'feed' ? 'bg-black text-white shadow-md' : 'text-[#86868B] hover:bg-gray-100/50'
            }`}
          >
            <List className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('post')}
            className={`flex-1 py-3 rounded-full flex items-center justify-center transition-all mx-1 ${
              view === 'post' ? 'bg-black text-white shadow-md' : 'text-[#86868B] hover:bg-gray-100/50'
            }`}
          >
            <PlusCircle className="w-5 h-5" />
          </button>
          <button
            onClick={() => setView('stats')}
            className={`flex-1 py-3 rounded-full flex items-center justify-center transition-all ${
              view === 'stats' ? 'bg-black text-white shadow-md' : 'text-[#86868B] hover:bg-gray-100/50'
            }`}
          >
            <BarChart2 className="w-5 h-5" />
          </button>
        </nav>
      </div>

      <div className="hidden md:block fixed right-10 bottom-10">
        <button
          onClick={() => setView('post')}
          className="w-16 h-16 bg-[#1D1D1F] text-white rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.3)] flex items-center justify-center hover:scale-110 hover:bg-[#333] transition-all duration-300"
        >
          <PlusCircle className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
}

