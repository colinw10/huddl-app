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
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <defs>
              <linearGradient id="ensoGradient" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                <stop offset="15%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="50%" stopColor="currentColor" stopOpacity="1" />
                <stop offset="85%" stopColor="currentColor" stopOpacity="0.3" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </linearGradient>
            </defs>
            <circle className="enso-circle" cx="12" cy="12" r="9" stroke="url(#ensoGradient)" strokeWidth="2.5" strokeLinecap="round" />
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
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
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
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
