import React from 'react'
import { Link } from 'react-router-dom'

function Ad() {
  return (
    <div className="ad">
      <div className="container mt-3">
        <div className="row justify-content-end">
          <div className="col-auto">
            <a className="btn btn-secondary" href="#">Switch to English</a>
          </div>
        </div>
      </div>
      <Link className="btn btn-primary" to="/">返回</Link>
      <h1>学校全景导览</h1>
      <iframe src="https://www.720yun.com/vr/5d2jt5tvzy0" width="100%" height="500"></iframe>
      <a className="btn btn-primary" href="https://www.720yun.com/vr/5d2jt5tvzy0">跳转至720云</a>
    </div>
  )
}

export default Ad