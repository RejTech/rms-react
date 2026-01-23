import React, { useEffect, useRef, useState } from 'react';

function TextReveal({ children, className = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -20px 0px'
      }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);
  
  return (
    <div
      ref={elementRef}
      className={`text-reveal ${className} ${isVisible ? 'visible' : ''}`}
    >
      {children}
    </div>
  );
}

export default TextReveal;