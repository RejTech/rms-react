import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Ad from './pages/Ad.jsx'
import Community from './pages/Community.jsx'
import Live from './pages/Live.jsx'
import Video from './pages/Video.jsx'
import Changelog from './pages/Changelog.jsx'
import License from './pages/License.jsx'
import { useState } from 'react'
import LiquidGlass from 'liquid-glass-react'
import './App.css'

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="main-nav">
      <div className="nav-container">
        <Link className="nav-brand" to="/">
          <img alt="" height="25" src="/assets/images/rms-logo.svg" width="25" />
          锐机综合站
        </Link>
        <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className="menu-icon"></span>
        </button>
        <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} to="/" onClick={() => setIsMenuOpen(false)}>主页</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/community' ? 'active' : ''}`} to="/community" onClick={() => setIsMenuOpen(false)}>社交媒体</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/live' ? 'active' : ''}`} to="/live" onClick={() => setIsMenuOpen(false)}>直播</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/video' ? 'active' : ''}`} to="/video" onClick={() => setIsMenuOpen(false)}>视频</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about" onClick={() => setIsMenuOpen(false)}>关于</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/changelog' ? 'active' : ''}`} to="/changelog" onClick={() => setIsMenuOpen(false)}>更新</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <Link className={`nav-link ${location.pathname === '/license' ? 'active' : ''}`} to="/license" onClick={() => setIsMenuOpen(false)}>许可</Link>
              </LiquidGlass>
            </li>
            <li className="nav-item">
              <LiquidGlass 
                cornerRadius={9999}
                padding="6px 10px"
                elasticity={0.6}
                blurAmount={0.1}
              >
                <a className="nav-link" href="https://rfs.rjtec.site" onClick={() => setIsMenuOpen(false)}>文件站</a>
              </LiquidGlass>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <header className="header">
          <Navigation />
        </header>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ad" element={<Ad />} />
            <Route path="/community" element={<Community />} />
            <Route path="/live" element={<Live />} />
            <Route path="/video" element={<Video />} />
            <Route path="/changelog" element={<Changelog />} />
            <Route path="/license" element={<License />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-logos">
              <img src="/assets/images/DAEcn.png" alt="DAE" style={{ height: '24px' }} />
            </div>
            <p>版本号-α.26.0124.1<br/>Github项目</p>
            <p><a href="https://github.com/RejTech/rejmainsite">前往Github源码区</a></p>
            <p><a href="#">Apache2.0许可证 ——版权所有 锐机科技2025</a></p>
          </div>
        </footer>
      </div>
    </Router>
  )
}

export default App