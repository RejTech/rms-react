import React from 'react'

function Changelog() {
  return (
    <div className="changelog">
      <div className="p-5 bg-body-tertiary rounded-3">
        <div className="container py-5">
          <h1 className="display-5">更新日志</h1>
        </div>
      </div>
      <div className="container">
        <h1>更新日志</h1>
        <hr />
        <h2>版本 γ.25.1129.1</h2>
        <p>
          发布于 2025年11月29日<br />
          - 正式版发布<br />
          - 修复了一些问题<br />
          - 优化了网站性能<br />
        </p>
        <hr />
        <h2>版本 β.25.1128.2</h2>
        <p>
          发布于 2025年11月28日<br />
          - 修复了一些问题<br />
          - 优化了网站性能<br />
        </p>
        <hr />
        <h2>版本 β.25.1128.1</h2>
        <p>
          发布于 2025年11月28日<br />
          - 测试版发布<br />
        </p>
        <hr />
        <h2>版本 α.25.1127.1</h2>
        <p>
          发布于 2025年11月27日<br />
          - 内测版发布<br />
        </p>
        <hr />
        <h1>更新日志至此结束</h1>
      </div>
    </div>
  )
}

export default Changelog