import React, { useState, useEffect } from 'react';
import TextReveal from '../components/TextReveal';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const uid = '858657049'; // 用户UID，后续可以由用户输入
  const limit = 10; // 每页显示的视频数量

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://uapis.cn/api/v1/social/bilibili/archives?uid=${uid}&limit=${limit}&page=${currentPage}`);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        
        const data = await response.json();
        
        // 打印API返回的数据结构，用于调试
        console.log('API Response:', data);
        
        if (data.videos) {
          // 打印第一个视频的封面信息，用于调试
          if (data.videos.length > 0) {
            console.log('First video cover:', data.videos[0].cover);
            console.log('First video data:', data.videos[0]);
          }
          // 处理视频数据，只保留有效的封面
          const processedVideos = data.videos.map(video => ({
            ...video,
            // 确保cover字段存在且是有效的URL
            cover: video.cover && typeof video.cover === 'string' && video.cover.trim() ? video.cover : null
          }));
          setVideos(processedVideos);
          // 检查是否还有更多视频
          setHasMore(processedVideos.length === limit);
        } else if (data.error) {
          throw new Error(data.error || 'Failed to fetch videos');
        } else if (data.message) {
          throw new Error(data.message || 'Failed to fetch videos');
        } else {
          throw new Error('Failed to fetch videos');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [uid, currentPage]);

  // 上一页
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  // 下一页
  const goToNextPage = () => {
    if (hasMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };
  
  return (
    <div className="container-fluid mt-4">
      <div className="p-5 bg-body-tertiary rounded-3">
        <h1 className="display-5 fw-bold">视频中心</h1>
        <p className="fs-4">查看最新投稿视频</p>
        {videos.length > 0 && (
          <p className="fs-5">显示 {videos.length} 项</p>
        )}
      </div>
      
      <div className="mt-4">
        {loading ? (
          <div className="text-center py-5">
            <p>加载视频中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <p className="text-danger">加载失败: {error}</p>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-5">
            <p>暂无视频投稿</p>
          </div>
        ) : (
          <div>
            <div className="row">
              {videos.map(video => (
                <TextReveal key={video.aid} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100">
                    {video.cover && typeof video.cover === 'string' && video.cover.trim() ? (
                      <a href={`https://www.bilibili.com/video/av${video.aid}`} target="_blank" rel="noopener noreferrer">
                        <img 
                          src={video.cover} 
                          className="card-img-top" 
                          alt={video.title}
                          style={{ height: '180px', objectFit: 'cover' }}
                        />
                      </a>
                    ) : null}
                    <div className="card-body">
                      <h5 className="card-title">
                        <a href={`https://www.bilibili.com/video/av${video.aid}`} target="_blank" rel="noopener noreferrer">
                          {video.title}
                        </a>
                      </h5>
                      <div className="d-flex justify-content-between align-items-center mt-2">
                        <span className="text-muted">
                          {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                        </span>
                        <span className="text-muted">
                          {video.play_count} 观看
                        </span>
                      </div>
                    </div>
                  </div>
                </TextReveal>
              ))}
            </div>
            
            {/* 分页按钮 */}
            <div className="d-flex justify-content-between mt-4">
              <button 
                className="btn btn-primary" 
                onClick={goToPrevPage} 
                disabled={currentPage === 1 || loading}
              >
                上一页
              </button>
              <button 
                className="btn btn-primary" 
                onClick={goToNextPage} 
                disabled={!hasMore || loading}
              >
                下一页
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Video;