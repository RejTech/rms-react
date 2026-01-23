import React from 'react'

function Live() {
  return (
    <div className="live">
      <div className="p-5 bg-body-tertiary rounded-3">
        <div className="container py-5">
          <img alt="" height="100" src="/src/assets/images/rms-logo.svg" width="100" />
          <h1 className="display-5">锐机直播</h1>
          <p className="fs-4">这里为你提供与Bilibili同步的直播</p>
        </div>
      </div>
      <div className="container">
        <iframe width="100%" height="450" src="https://www.bilibili.com/blackboard/live/live-mobile-playerV3.html?roomId=26504347&danmaku=1"></iframe>
      </div>
    </div>
  )
}

export default Live