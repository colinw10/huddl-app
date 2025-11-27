import React, { useMemo, useState } from 'react';
import './ProfileCard.css';

function ProfileCard({ isFlipped, setIsFlipped, posts }) {
  const [viewMode, setViewMode] = useState('wave'); // 'wave' or 'heatmap'

  // Seeded random number generator for consistent data
  const seededRandom = (seed) => {
    let value = seed;
    return () => {
      value = (value * 9301 + 49297) % 233280;
      return value / 233280;
    };
  };

  // Post type breakdown data
  const postTypeData = useMemo(() => {
    const random = seededRandom(54321);
    const thoughts = Math.floor(random() * 30) + 35; // 35-65%
    const media = Math.floor(random() * 25) + 20;    // 20-45%
    const milestones = 100 - thoughts - media;       // remainder
    
    return [
      { type: 'Thoughts', percentage: thoughts, color: 'rgba(30, 234, 76, 0.8)' },
      { type: 'Media', percentage: media, color: 'rgba(26, 115, 231, 0.8)' },
      { type: 'Milestones', percentage: milestones, color: 'rgba(234, 30, 162, 0.8)' }
    ];
  }, []);

  // Generate GitHub-style heatmap data
  const heatmapData = useMemo(() => {
    const random = seededRandom(12345); // Fixed seed for consistency
    const weeks = 52; // Full year of weeks
    const daysPerWeek = 7;
    const data = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < daysPerWeek; day++) {
        // Generate random activity level (0-3)
        const level = Math.floor(random() * 4);
        weekData.push(level);
      }
      data.push(weekData);
    }
    
    return data;
  }, []);

  // Best posting time analysis from heatmap data
  const bestPostingTime = useMemo(() => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let maxActivity = 0;
    let peakDay = 0;
    
    // Aggregate activity by day of week
    const dayTotals = [0, 0, 0, 0, 0, 0, 0];
    heatmapData.forEach(week => {
      week.forEach((level, dayIndex) => {
        dayTotals[dayIndex] += level;
      });
    });
    
    // Find peak day
    dayTotals.forEach((total, index) => {
      if (total > maxActivity) {
        maxActivity = total;
        peakDay = index;
      }
    });
    
    // Generate peak hour (seeded for consistency)
    const random = seededRandom(99999);
    const peakHour = Math.floor(random() * 5) + 18; // 6PM-10PM range
    const period = peakHour >= 12 ? 'PM' : 'AM';
    const displayHour = peakHour > 12 ? peakHour - 12 : peakHour;
    
    return `${days[peakDay]} ${displayHour}${period}`;
  }, [heatmapData]);

  const getActivityColor = (level) => {
    const colors = [
      'rgba(255, 255, 255, 0.05)', // No activity - very subtle
      'rgba(30, 149, 234, 0.25)',    // Low - light green
      'rgba(30, 173, 234, 0.5)',     // Medium - medium green
      'rgba(30, 227, 234, 1)'        // High - full green glow
    ];
    return colors[level];
  };

  // Generate stable wave data points (base activity)
  const waveData = useMemo(() => {
    const seed = 12345;
    let current = seed;
    const pseudoRandom = () => {
      current = (current * 1103515245 + 12345) & 0x7fffffff;
      return (current % 100) / 100;
    };
    return Array.from({ length: 52 }).map(() => 20 + pseudoRandom() * 60);
  }, []);

  // Generate medium activity wave (70% of high activity)
  const mediumWaveData = useMemo(() => {
    return waveData.map(value => value * 0.7);
  }, [waveData]);

  // Generate low activity wave (40% of high activity)
  const lowWaveData = useMemo(() => {
    return waveData.map(value => value * 0.4);
  }, [waveData]);

  // Create wave path with peaks that get sharper based on activity level
  const createWavePath = (data) => {
    const width = 600;
    const height = 100;
    const points = data.length;
    const segmentWidth = width / (points - 1);
    
    let path = `M 0,${height - data[0]}`;
    
    for (let i = 1; i < points; i++) {
      const x = i * segmentWidth;
      const y = height - data[i];
      const prevX = (i - 1) * segmentWidth;
      const prevY = height - data[i - 1];
      
      // Calculate activity level (0-1 based on height)
      const activityLevel = data[i] / 80; // Normalize to 0-1
      
      // Higher activity = sharper peaks (lower control point distance)
      // Low activity: 0.4 (smooth), High activity: 0.01 (very sharp)
      const sharpness = 0.4 - (activityLevel * 0.39);
      
      const cp1x = prevX + segmentWidth * sharpness;
      const cp1y = prevY;
      const cp2x = prevX + segmentWidth * (1 - sharpness);
      const cp2y = y;
      
      path += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
    }
    
    path += ` L ${width},${height} L 0,${height} Z`;
    return path;
  };

  return (
    <div className="profile-flip-container">
      <div className={`profile-flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Side - Public Profile */}
        <div className="profile-card-front">
          <div className="profile-header river-header">
            <div className="profile-header-bg">
              {/* Background image placeholder */}
            </div>
            
            {/* Overlapping avatar container */}
            <div className="avatar-wrapper">
              <div className="profile-avatar">
                <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
              </div>
            </div>
          </div>

          {/* Two-Column Profile Meta */}
          <div className="profile-meta river-meta">
            {/* LEFT COLUMN */}
            <div className="profile-left-column">
              <div className="profile-name-section">
                <h1 className="profile-display-name">Pvblo Cordero</h1>
                <span className="profile-handle">@pabloPistola</span>
                <div className="profile-location">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <span>Brooklyn, NY</span>
                </div>
              </div>

              {/* Bio Section */}
              <div className="profile-bio">
                <p> A Sentient Android| 
                Being Human
                   </p>
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="profile-right-column">
              {/* Profile Details - Each on Own Row */}
              <div className="profile-details">
                <div className="profile-detail-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
                    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
                  </svg>
                  <a href="https://github.com/pablodcordero" target="_blank" rel="noopener noreferrer">github.com/Cordero080</a>
                </div>
                <div className="profile-detail-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
                  </svg>
                  <span>Joined November 2024</span>
                </div>
              </div>
              
              {/* Stats - Each on Own Row */}
              <div className="profile-stats">
                <div className="stat-item">
                  <span className="stat-count">-26</span>
                  <span className="stat-label">Following</span>
                </div>
                <div className="stat-item">
                  <span className="stat-count">0</span>
                  <span className="stat-label">Followers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-count">{posts.length}</span>
                  <span className="stat-label">Posts</span>
                </div>
                <div className="stat-item engagement-stat">
                  <span className="stat-count">⭐ 12%</span>
                  <span className="stat-label">Engagement</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Icons - Right Side */}
          <div className="profile-actions-pill">
            <button className="action-icon-btn share-btn" title="Share Profile">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </button>
            <button className="action-icon-btn more-btn" title="More Options">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="1"/>
                <circle cx="19" cy="12" r="1"/>
                <circle cx="5" cy="12" r="1"/>
              </svg>
            </button>
            <button className="action-icon-btn analytics-btn" onClick={() => setIsFlipped(true)} title="Analytics">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Back Side - Private Analytics */}
        <div className="profile-card-back">
          <div className="analytics-header">
            <h2 className="analytics-title">Your Analytics</h2>
            <button className="flip-trigger-back" onClick={() => setIsFlipped(false)} aria-label="Back to Profile">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"/>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/>
              </svg>
            </button>
          </div>

          <div className="analytics-grid">
            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">2.4K</span>
                <span className="analytics-label">Profile Views</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="12" y1="1" x2="12" y2="23"/>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">89%</span>
                <span className="analytics-label">Engagement Rate</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">156</span>
                <span className="analytics-label">Avg. Likes/Post</span>
              </div>
            </div>

            <div className="analytics-card">
              <div className="analytics-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 20V10"/>
                  <path d="M12 20V4"/>
                  <path d="M6 20v-6"/>
                </svg>
              </div>
              <div className="analytics-data">
                <span className="analytics-value">+23%</span>
                <span className="analytics-label">Growth This Week</span>
              </div>
            </div>
          </div>

          {/* Activity Visualization */}
          <div className="activity-wave">
            <div className="activity-header">
              <div className="activity-title-row">
                <h3 className="wave-title">Activity Overview</h3>
                <div className="activity-meta">
                  <span className="post-frequency">Avg. {(posts.length / 52).toFixed(1)} posts/week</span>
                  <span className="peak-time">🔥 Peak: {bestPostingTime}</span>
                </div>
              </div>
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${viewMode === 'wave' ? 'active' : ''}`}
                  onClick={() => setViewMode('wave')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 12h4l3-9 4 18 3-9h4"/>
                  </svg>
                  Wave
                </button>
                <button 
                  className={`toggle-btn ${viewMode === 'heatmap' ? 'active' : ''}`}
                  onClick={() => setViewMode('heatmap')}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7"/>
                    <rect x="14" y="3" width="7" height="7"/>
                    <rect x="3" y="14" width="7" height="7"/>
                    <rect x="14" y="14" width="7" height="7"/>
                  </svg>
                  Grid
                </button>
              </div>
            </div>
            
            {viewMode === 'wave' ? (
            <div className="wave-container">
              <svg className="wave-svg" viewBox="0 0 600 120" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(26, 231, 132, 0.5)" />
                    <stop offset="40%" stopColor="rgba(26, 115, 231, 0.35)" />
                    <stop offset="100%" stopColor="rgba(26, 115, 231, 0.1)" />
                  </linearGradient>
                  <linearGradient id="mediumWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(220, 8, 188, 0.4)" />
                    <stop offset="40%" stopColor="rgba(220, 8, 188, 0.25)" />
                    <stop offset="100%" stopColor="rgba(220, 8, 188, 0.08)" />
                  </linearGradient>
                  <linearGradient id="lowWaveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="rgba(255, 165, 0, 0.3)" />
                    <stop offset="40%" stopColor="rgba(255, 165, 0, 0.2)" />
                    <stop offset="100%" stopColor="rgba(255, 165, 0, 0.05)" />
                  </linearGradient>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(26, 115, 231, 0.6)" />
                    <stop offset="50%" stopColor="rgba(26, 231, 132, 0.9)" />
                    <stop offset="100%" stopColor="rgba(26, 115, 231, 0.6)" />
                  </linearGradient>
                  <linearGradient id="mediumLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(220, 8, 188, 0.5)" />
                    <stop offset="50%" stopColor="rgba(220, 8, 188, 0.8)" />
                    <stop offset="100%" stopColor="rgba(220, 8, 188, 0.5)" />
                  </linearGradient>
                  <linearGradient id="lowLineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 165, 0, 0.4)" />
                    <stop offset="50%" stopColor="rgba(255, 165, 0, 0.7)" />
                    <stop offset="100%" stopColor="rgba(255, 165, 0, 0.4)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Grid lines */}
                <g className="grid-lines">
                  {[25, 50, 75].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="600"
                      y2={y}
                      stroke="rgba(255, 255, 255, 0.05)"
                      strokeWidth="1"
                      strokeDasharray="4,4"
                    />
                  ))}
                </g>
                
                {/* Low activity wave (orange) */}
                <path
                  d={createWavePath(lowWaveData)}
                  fill="url(#lowWaveGradient)"
                  className="wave-fill"
                  opacity="0.6"
                />
                <path
                  d={createWavePath(lowWaveData).split('L')[0]}
                  fill="none"
                  stroke="url(#lowLineGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  className="wave-line"
                  opacity="0.7"
                />
                
                {/* Medium activity wave (pink) */}
                <path
                  d={createWavePath(mediumWaveData)}
                  fill="url(#mediumWaveGradient)"
                  className="wave-fill"
                  opacity="0.7"
                />
                <path
                  d={createWavePath(mediumWaveData).split('L')[0]}
                  fill="none"
                  stroke="url(#mediumLineGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  className="wave-line"
                  opacity="0.8"
                />
                
                {/* High activity wave (green/blue) */}
                <path
                  d={createWavePath(waveData)}
                  fill="url(#waveGradient)"
                  className="wave-fill"
                />
                <path
                  d={createWavePath(waveData).split('L')[0]}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#glow)"
                  className="wave-line"
                />
                
                
                {/* Peak markers */}
                {waveData.map((value, index) => {
                  if (value > 65) {
                    const x = (index * 600) / (waveData.length - 1);
                    const y = 100 - value;
                    return (
                      <g key={index}>
                        <circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="rgba(26, 231, 132, 0.3)"
                          className="peak-marker-bg"
                        />
                        <circle
                          cx={x}
                          cy={y}
                          r="2.5"
                          fill="rgba(26, 231, 132, 1)"
                          className="peak-marker"
                        >
                          <title>Peak activity: Week {index + 1}</title>
                        </circle>
                      </g>
                    );
                  }
                  return null;
                })}
              </svg>
              
              <div className="wave-timeline">
                <span>12 months ago</span>
                <span>6 months ago</span>
                <span>Today</span>
              </div>
              
              <div className="wave-legend">
                <div className="legend-item">
                  <div className="legend-line high"></div>
                  <span>High Activity</span>
                </div>
                <div className="legend-item">
                  <div className="legend-line medium"></div>
                  <span>Medium Activity</span>
                </div>
                <div className="legend-item">
                  <div className="legend-line low"></div>
                  <span>Low Activity</span>
                </div>
              </div>
            </div>
            ) : (
            <div className="heatmap-container">
              <div className="heatmap-grid">
                <div className="heatmap-days">
                  <span>Mon</span>
                  <span></span>
                  <span>Wed</span>
                  <span></span>
                  <span>Fri</span>
                  <span></span>
                  <span></span>
                </div>
                <div className="heatmap-scroll-wrapper">
                  <div className="heatmap-months">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                  <div className="heatmap-weeks">
                    {heatmapData.map((week, weekIndex) => (
                      <div key={weekIndex} className="heatmap-week">
                        {week.map((level, dayIndex) => (
                          <div
                            key={dayIndex}
                            className="heatmap-day"
                            style={{ 
                              background: getActivityColor(level),
                              border: level === 0 
                                ? '1px solid rgba(255, 255, 255, 0.1)' 
                                : 'none'
                            }}
                            title={`Activity level: ${level}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="heatmap-legend">
                <span className="legend-label">Less</span>
                <div className="legend-squares">
                  {[0, 1, 2, 3].map(level => (
                    <div
                      key={level}
                      className="legend-square"
                      style={{ background: getActivityColor(level) }}
                    />
                  ))}
                </div>
                <span className="legend-label">More</span>
              </div>
            </div>
            )}

            {/* Post Type Breakdown */}
            <div className="post-type-breakdown">
              <h4 className="breakdown-title">Content Mix</h4>
              <div className="breakdown-content">
                <svg width="120" height="120" viewBox="0 0 120 120" className="donut-chart">
                  <defs>
                    {postTypeData.map((item, index) => (
                      <filter key={index} id={`glow-${index}`}>
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    ))}
                  </defs>
                  {(() => {
                    let cumulativePercent = 0;
                    return postTypeData.map((item, index) => {
                      const startAngle = (cumulativePercent / 100) * 360 - 90;
                      const endAngle = ((cumulativePercent + item.percentage) / 100) * 360 - 90;
                      cumulativePercent += item.percentage;
                      
                      const startRad = (startAngle * Math.PI) / 180;
                      const endRad = (endAngle * Math.PI) / 180;
                      const outerRadius = 50;
                      const innerRadius = 35;
                      
                      const x1 = 60 + outerRadius * Math.cos(startRad);
                      const y1 = 60 + outerRadius * Math.sin(startRad);
                      const x2 = 60 + outerRadius * Math.cos(endRad);
                      const y2 = 60 + outerRadius * Math.sin(endRad);
                      const x3 = 60 + innerRadius * Math.cos(endRad);
                      const y3 = 60 + innerRadius * Math.sin(endRad);
                      const x4 = 60 + innerRadius * Math.cos(startRad);
                      const y4 = 60 + innerRadius * Math.sin(startRad);
                      
                      const largeArc = item.percentage > 50 ? 1 : 0;
                      
                      return (
                        <path
                          key={index}
                          d={`M ${x1} ${y1} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4} Z`}
                          fill={item.color}
                          filter={`url(#glow-${index})`}
                          className="donut-segment"
                        >
                          <title>{item.type}: {item.percentage}%</title>
                        </path>
                      );
                    });
                  })()}
                </svg>
                <div className="breakdown-legend">
                  {postTypeData.map((item, index) => (
                    <div key={index} className="breakdown-legend-item">
                      <div className="legend-color" style={{ background: item.color }}></div>
                      <div className="legend-text">
                        <span className="legend-type">{item.type}</span>
                        <span className="legend-percent">{item.percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="quick-settings">
            <h3 className="settings-title">Quick Settings</h3>
            <button className="setting-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <span>Privacy Settings</span>
            </button>
            <button className="setting-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6M5.64 5.64l4.24 4.24m4.24 4.24l4.24 4.24M1 12h6m6 0h6M5.64 18.36l4.24-4.24m4.24-4.24l4.24-4.24"/>
              </svg>
              <span>Appearance</span>
            </button>
            <button className="setting-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span>Notifications</span>
            </button>
            
            {/* Compact 3-column grid for secondary actions */}
            <div className="settings-grid">
              <button className="setting-btn setting-btn-compact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
                </svg>
                <span>Saved</span>
              </button>
              <button className="setting-btn setting-btn-compact">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                <span>Activity</span>
              </button>
              <button className="setting-btn setting-btn-compact throwback-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
                <span>🎸</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;
