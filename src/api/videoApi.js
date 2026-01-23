const BASE_URL = 'https://uapis.cn/api/v1/social/bilibili';

const CACHE_DURATION = 5 * 60 * 1000;

const cache = new Map();

function getCacheKey(endpoint, params) {
  return `${endpoint}:${JSON.stringify(params)}`;
}

function isCacheValid(cacheEntry) {
  return Date.now() - cacheEntry.timestamp < CACHE_DURATION;
}

async function fetchWithRetry(url, options = {}, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}

async function getUserVideos(mid, page = 1, pageSize = 20, keywords = '', orderby = 'pubdate') {
  const cacheKey = getCacheKey('/archives', { mid, page, pageSize, keywords, orderby });
  const cached = cache.get(cacheKey);

  if (cached && isCacheValid(cached)) {
    return cached.data;
  }

  try {
    const params = new URLSearchParams({
      mid: mid,
      ps: pageSize,
      pn: page
    });

    if (keywords) {
      params.append('keywords', keywords);
    }

    if (orderby) {
      params.append('orderby', orderby);
    }

    const response = await fetchWithRetry(`${BASE_URL}/archives?${params.toString()}`);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.error || '获取视频失败');
    }

    const videos = data.videos.map(video => ({
      aid: video.aid,
      bvid: video.bvid,
      title: video.title,
      cover: video.cover,
      duration: video.duration,
      playCount: video.play_count,
      publishTime: video.publish_time,
      createTime: video.create_time,
      state: video.state,
      isUgcPay: video.is_ugc_pay,
      isInteractive: video.is_interactive
    }));

    const result = {
      videos,
      page: data.page,
      pageSize: data.size,
      total: data.total,
      hasMore: page * pageSize < data.total
    };

    cache.set(cacheKey, { data: result, timestamp: Date.now() });
    return result;
  } catch (error) {
    console.error('获取用户视频失败:', error);
    throw error;
  }
}

function clearCache() {
  cache.clear();
}

function getCacheStats() {
  return {
    size: cache.size,
    entries: Array.from(cache.entries()).map(([key, value]) => ({
      key,
      age: Date.now() - value.timestamp,
      isValid: isCacheValid(value)
    }))
  };
}

export default {
  getUserVideos,
  clearCache,
  getCacheStats
};