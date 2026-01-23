import React, { useState, useEffect } from 'react';
import TextReveal from '../components/TextReveal';
import videoApi from '../api/videoApi';

const Video = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalVideos, setTotalVideos] = useState(0);
  const [keywords, setKeywords] = useState('');
  const [orderby, setOrderby] = useState('pubdate');
  const mid = '1162853749';
  const pageSize = 20;

  useEffect(() => {
    const fetchVideos = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await videoApi.getUserVideos(mid, currentPage, pageSize, keywords, orderby);
        
        setVideos(result.videos);
        setHasMore(result.hasMore);
        setTotalVideos(result.total);
      } catch (err) {
        console.error('获取视频失败:', err);
        setError(err.message || '获取视频失败');
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [mid, currentPage, keywords, orderby]);

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const goToNextPage = () => {
    if (hasMore) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const handleOrderbyChange = (e) => {
    setOrderby(e.target.value);
    setCurrentPage(1);
  };

  const formatDuration = (seconds) => {
    if (!seconds) return '00:00';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 10000) {
      return `${(num / 10000).toFixed(1)}万`;
    }
    return num.toString();
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return '';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="container-fluid mt-4">
      <div className="p-5 bg-body-tertiary rounded-3">
        <h1 className="display-5 fw-bold">视频中心</h1>
        <p className="fs-4">查看最新投稿视频</p>
        {totalVideos > 0 && (
          <p className="fs-5">共 {totalVideos} 个视频 · 当前显示第 {currentPage} 页</p>
        )}
      </div>
      
      <div className="mt-4">
        <div className="row mb-4">
          <div className="col-md-6">
            <form onSubmit={handleSearch} className="d-flex gap-2">
              <input
                type="text"
                className="form-control"
                placeholder="搜索关键词..."
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
              <button type="submit" className="btn btn-primary">搜索</button>
            </form>
          </div>
          <div className="col-md-6">
            <select
              className="form-select"
              value={orderby}
              onChange={handleOrderbyChange}
            >
              <option value="pubdate">最新发布</option>
              <option value="views">最多播放</option>
            </select>
          </div>
        </div>
      </div>

      <div className="mt-4">
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">加载中...</span>
            </div>
            <p className="mt-3">加载视频中...</p>
          </div>
        ) : error ? (
          <div className="text-center py-5">
            <div className="alert alert-danger" role="alert">
              <h4 className="alert-heading">加载失败</h4>
              <p>{error}</p>
              <hr />
              <p className="mb-0">请稍后重试或联系管理员</p>
            </div>
          </div>
        ) : videos.length === 0 ? (
          <div className="text-center py-5">
            <p>暂无视频投稿</p>
          </div>
        ) : (
          <div>
            <div className="row">
              {videos.map(video => (
                <TextReveal key={video.aid || video.bvid} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card h-100 shadow-sm">
                    {video.cover && (
                      <a 
                        href={`https://www.bilibili.com/video/${video.bvid || 'av' + video.aid}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-decoration-none"
                      >
                        <div className="position-relative">
                          <img 
                            src={video.cover} 
                            className="card-img-top" 
                            alt={video.title}
                            style={{ height: '180px', objectFit: 'cover' }}
                          />
                          <span className="position-absolute bottom-0 end-0 bg-dark bg-opacity-75 text-white px-2 py-1 rounded-top-left m-0">
                            {formatDuration(video.duration)}
                          </span>
                          {video.isUgcPay === 1 && (
                            <span className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1">
                              付费
                            </span>
                          )}
                          {video.isInteractive === 1 && (
                            <span className="position-absolute top-0 start-0 bg-info text-white px-2 py-1">
                              互动
                            </span>
                          )}
                        </div>
                      </a>
                    )}
                    <div className="card-body">
                      <h5 className="card-title mb-3">
                        <a 
                          href={`https://www.bilibili.com/video/${video.bvid || 'av' + video.aid}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-decoration-none text-dark"
                        >
                          {video.title}
                        </a>
                      </h5>
                      <table className="table table-sm table-bordered">
                        <tbody>
                          <tr>
                            <td className="text-muted">播放量</td>
                            <td>{formatNumber(video.playCount)}</td>
                          </tr>
                          {video.publishTime && (
                            <tr>
                              <td className="text-muted">发布时间</td>
                              <td>{formatTimestamp(video.publishTime)}</td>
                            </tr>
                          )}
                          {video.duration && (
                            <tr>
                              <td className="text-muted">时长</td>
                              <td>{formatDuration(video.duration)}</td>
                            </tr>
                          )}
                          {video.isUgcPay === 1 && (
                            <tr>
                              <td className="text-muted">类型</td>
                              <td><span className="badge bg-warning text-dark">付费视频</span></td>
                            </tr>
                          )}
                          {video.isInteractive === 1 && (
                            <tr>
                              <td className="text-muted">类型</td>
                              <td><span className="badge bg-info">互动视频</span></td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </TextReveal>
              ))}
            </div>
            
            <div className="d-flex justify-content-center mt-4 gap-2">
              <button 
                className="btn btn-primary" 
                onClick={goToPrevPage} 
                disabled={currentPage === 1 || loading}
              >
                上一页
              </button>
              <span className="btn btn-outline-primary disabled">
                第 {currentPage} 页
              </span>
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
};

export default Video;