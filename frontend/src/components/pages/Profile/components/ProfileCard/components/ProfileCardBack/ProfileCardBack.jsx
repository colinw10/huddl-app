// ProfileCardBack.jsx - Private analytics dashboard (back of flip card)
// 🔵 PABLO - UI/Styling

import './ProfileCardBack.scss';
import ActivityVisualization from '../ActivityVisualization';
import PostTypeBreakdown from '../PostTypeBreakdown';
import QuickSettings from '../QuickSettings';

function ProfileCardBack({ 
  setIsFlipped, 
  posts, 
  viewMode, 
  setViewMode,
  waveData,
  mediumWaveData,
  lowWaveData,
  heatmapData,
  postTypeData,
  bestPostingTime,
  createWavePath,
  getActivityColor
}) {
  return (
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
      <ActivityVisualization
        viewMode={viewMode}
        setViewMode={setViewMode}
        posts={posts}
        waveData={waveData}
        mediumWaveData={mediumWaveData}
        lowWaveData={lowWaveData}
        heatmapData={heatmapData}
        bestPostingTime={bestPostingTime}
        createWavePath={createWavePath}
        getActivityColor={getActivityColor}
      />

      {/* Post Type Breakdown */}
      <PostTypeBreakdown postTypeData={postTypeData} />

      {/* Quick Settings */}
      <QuickSettings />
    </div>
  );
}

export default ProfileCardBack;
