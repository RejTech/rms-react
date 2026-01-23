import React from 'react'

function Community() {
  return (
    <div className="community">
      <div className="p-5 bg-body-tertiary rounded-3">
        <div className="container py-5">
          <h1 className="display-5">锐机社交媒体账号</h1>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          {/* Bilibili 卡片 */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img height="40" src="/assets/images/bilibili.png" width="40" className="me-3" style={{ borderRadius: '10px' }} />
                    <h5 className="card-title">Bilibili</h5>
                  </div>
                  <a className="btn btn-primary" href="https://space.bilibili.com/1162853749">立即前往</a>
                </div>
              </div>
            </div>
          </div>
          {/* Douyin 卡片 */}
          <div className="col">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <img height="40" src="/assets/images/dy.jpeg" width="40" className="me-3" style={{ borderRadius: '10px', objectFit: 'cover', objectPosition: 'center' }} />
                    <h5 className="card-title">Douyin</h5>
                  </div>
                  <a className="btn btn-primary" href="https://www.douyin.com/user/MS4wLjABAAAAqmDDA-v1xWHl-rQptifCBioq8eR6UeFsuq8fMHo-qXY">立即前往</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Community