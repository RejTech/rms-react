import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Home() {
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false)
  const [isNoticeOpen, setIsNoticeOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    // 延迟2秒显示提示框，确保它在主页的其他内容加载完成后再显示
    const showTimer = setTimeout(() => {
      setIsNoticeOpen(true)
      setCountdown(5)
      
      // 启动倒计时
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval)
            closeNotice()
            return 0
          }
          return prevCountdown - 1
        })
      }, 1000)
      
      // 清理函数
      return () => clearInterval(countdownInterval)
    }, 2000)
    return () => clearTimeout(showTimer)
  }, [])

  const closeNotice = () => {
    setIsClosing(true)
    // 等待动画完成后再设置isNoticeOpen为false
    setTimeout(() => {
      setIsNoticeOpen(false)
    }, 300)
  }

  const goToOldVersion = () => {
    window.location.href = '/old'
  }

  return (
    <div className="home">
      {/* 版本提示框 */}
      {isNoticeOpen && (
        <div className={`notice-modal ${isClosing ? 'closing' : ''}`}>
          <div className={`notice-content ${isClosing ? 'closing' : ''}`}>
            <h2>版本提示</h2>
            <p>当前版本为Vite+React的第一个版本，我们仍在完善中。</p>
            
            {/* 倒计时条 */}
            <div style={{ marginTop: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ 
                height: '8px', 
                backgroundColor: '#e9ecef', 
                borderRadius: '4px', 
                overflow: 'hidden',
                marginBottom: '0.5rem'
              }}>
                <div style={{ 
                  height: '100%', 
                  backgroundColor: '#007bff', 
                  borderRadius: '4px',
                  width: `${(countdown / 5) * 100}%`,
                  transition: 'width 1s linear'
                }}></div>
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.875rem', color: '#6c757d' }}>
                弹窗将在 {countdown} 秒后自动关闭
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
              <button className="btn btn-primary" onClick={closeNotice}>
                我知道了
              </button>
              <button className="btn btn-secondary" onClick={goToOldVersion}>
                返回旧版
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 反馈弹窗 */}
      {isFeedbackOpen && (
        <div className="notice-modal">
          <div className="notice-content">
            <h2>提供反馈</h2>
            <form netlify>
              <div>
                <label className="form-label" htmlFor="email-input">电邮联系地址</label>
                <input type="email" name="email" className="form-control" id="email-input" />
                <div className="form-text" id="email-help">我们不会将你的电邮分享给他人，或做其他用处</div>
              </div>
              <div>
                <label className="form-label" htmlFor="建议">留下你的建议</label>
                <input type="text" name="建议" className="form-control" id="建议" />
              </div>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1.5rem' }}>
                <button className="btn btn-primary" type="submit">提交</button>
                <button className="btn btn-secondary" type="button" onClick={() => setIsFeedbackOpen(false)}>
                  取消
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      <div className="bg-light p-4">
        <h5 className="text-body-emphasis h4">使用RTOS(Based on TurboWarp)</h5>
        <a className="btn btn-primary" target="_blank" href="https://rfs.rjtec.site/autoredirect?link=rtos">立即查看</a>
        <a className="btn btn-primary" target="_blank" href="https://xw44n-my.sharepoint.com/:u:/g/personal/rej_xw44n_onmicrosoft_com/IQDLpCHmgwf8Q7uAt0PolXieAYph7YGvNiT_9QFJ5ODrUR0?e=8tg2kP">下载离线包</a>
      </div>
      <div className="bg-light p-4">
        <h5 className="text-body-emphasis h4">锐机LLM</h5><span className="badge bg-secondary">AD</span>
        <a className="btn btn-primary" target="_blank" href="/ad">立即试用开发版Beta</a>
      </div>
      <div className="p-5 bg-body-tertiary rounded-3">
        <div className="container py-5">
          <img alt="" height="150" src="/src/assets/images/rms-logo.svg" width="150" style={{ opacity: 0, animation: 'spinIn 1s ease-out forwards 1.2s, slowSpin 10s linear infinite 2.2s' }} />
          <h1 className="display-5">欢迎来到锐机综合站</h1>
          <p className="fs-4">这里为你提供综合性的锐机信息</p>
          <Link className="btn btn-primary" to="/changelog">更新日志(CHANGELOG)</Link>
          <button className="btn btn-primary" onClick={() => setIsFeedbackOpen(true)}>
            提供反馈
          </button>
        </div>
      </div>
    </div>
  )
}

export default Home