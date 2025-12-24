// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Data Logic
// ProfileCard.jsx - User profile card with flip animation
// Now a thin container that orchestrates subcomponents

import { useMemo, useState } from 'react';
import './ProfileCard.scss';
import ProfileCardFront from './components/ProfileCardFront';
import ProfileCardBack from './components/ProfileCardBack';

// Fixed reference timestamp for consistent analytics calculations
// This avoids React compiler warnings about impure functions during render
const ANALYTICS_NOW = Date.now(); // Use current time for live heatmap

function ProfileCard({ isFlipped, setIsFlipped, posts, user, isOwnProfile = true }) {
  const [viewMode, setViewMode] = useState('wave'); // 'wave' or 'heatmap'

  // Seeded random number generator for consistent data
  const postTypeData = useMemo(() => {
    if (!posts || posts.length === 0) {
  
      return [
      { type: 'Thoughts', percentage: 33, color: 'rgba(30, 234, 76, 0.8)' },
      { type: 'Media', percentage: 33, color: 'rgba(26, 115, 231, 0.8)' },
      { type: 'Milestones', percentage: 34, color: 'rgba(234, 30, 162, 0.8)' }
    ];
  }

 const counts = { thoughts: 0, media: 0, milestones: 0};
 posts.forEach(post => {
  if (counts[post.type] !== undefined) {
    counts[post.type]++;
  }
 });

 const total = posts.length;
 const thoughtsPercent = Math.round((counts.thoughts/total) * 100);
 const mediaPercent = Math.round((counts.media/total) * 100);
 const milestonesPercent = 100 - thoughtsPercent - mediaPercent;
 
 return [
    { type: 'Thoughts', percentage: thoughtsPercent, color: 'rgba(30, 234, 76, 0.8)' },
    { type: 'Media', percentage: mediaPercent, color: 'rgba(26, 115, 231, 0.8)' },
    { type: 'Milestones', percentage: milestonesPercent, color: 'rgba(234, 30, 162, 0.8)' }
  ];
}, [posts]);

const heatmapData = useMemo(() => {
  const weeks = 52;
  const grid = Array(weeks).fill(null).map(() => Array(7).fill(0));
  
  if (!posts || posts.length === 0) return grid;

  const msPerDay = 24 * 60 * 60 * 1000;
  const now = ANALYTICS_NOW;
  
  posts.forEach(post => {
    const postDate = new Date(post.created_at).getTime();
    const daysAgo = Math.floor((now - postDate) / msPerDay);

    if (daysAgo >= 0 && daysAgo < weeks * 7) {
      const weekIndex = Math.floor(daysAgo / 7);
      const dayIndex = daysAgo % 7;

      if (weekIndex < weeks) {
        grid[weeks - 1 - weekIndex] [dayIndex]++;
      }
    }
  });

  return grid.map(week => 
    week.map(count => {
      if (count === 0)  return 0;
      if (count === 1) return 1;
      if (count <= 3) return 2;
      return 3;
    })
  );

}, [posts]);
// Best posting time analysis
const bestPostingTime = useMemo(() => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  let maxActivity = 0;
  let peakDay = 0;
  
  const dayTotals = [0, 0, 0, 0, 0, 0, 0];
  heatmapData.forEach(week => {
    week.forEach((level, dayIndex) => {
      dayTotals[dayIndex] += level;
    });
  });
  
  dayTotals.forEach((total, index) => {
    if (total > maxActivity) {
      maxActivity = total;
      peakDay = index;
    }
  });
  
  const peakHour = 18 + (peakDay % 5);
  const period = 'PM';
  const displayHour = peakHour > 12 ? peakHour - 12 : peakHour;
  
  return `${days[peakDay]} ${displayHour}${period}`;
}, [heatmapData]);
 // Generate wave data points
const waveData = useMemo(() => {
  const weeks = 52;
  const weeklyEngagement = Array(weeks).fill(0);
  
  if (!posts || posts.length === 0) return weeklyEngagement;
  
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const now = ANALYTICS_NOW;
  
  posts.forEach(post => {
    const postDate = new Date(post.created_at).getTime();
    const weeksAgo = Math.floor((now - postDate) / msPerWeek);
    
    if (weeksAgo >= 0 && weeksAgo < weeks) {
      const engagement = (post.likes_count || 0) + 
                        (post.comment_count || 0) + 
                        (post.shares_count || 0);
      weeklyEngagement[weeks - 1 - weeksAgo] += engagement;
    }
  });
  
  const maxEngagement = Math.max(...weeklyEngagement, 1);
  return weeklyEngagement.map(val => (val / maxEngagement) * 80);
}, [posts]);

const mediumWaveData = useMemo(() => {
  const weeks = 52;
  const weeklyLikes = Array(weeks).fill(0);
  
  if (!posts || posts.length === 0) return weeklyLikes;
  
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const now = ANALYTICS_NOW;
  
  posts.forEach(post => {
    const postDate = new Date(post.created_at).getTime();
    const weeksAgo = Math.floor((now - postDate) / msPerWeek);
    
    if (weeksAgo >= 0 && weeksAgo < weeks) {
      weeklyLikes[weeks - 1 - weeksAgo] += (post.likes_count || 0);
    }
  });
  
  const maxLikes = Math.max(...weeklyLikes, 1);
  return weeklyLikes.map(val => (val / maxLikes) * 56);
}, [posts]);

const lowWaveData = useMemo(() => {
  const weeks = 52;
  const weeklyComments = Array(weeks).fill(0);
  
  if (!posts || posts.length === 0) return weeklyComments;
  
  const msPerWeek = 7 * 24 * 60 * 60 * 1000;
  const now = ANALYTICS_NOW;
  
  posts.forEach(post => {
    const postDate = new Date(post.created_at).getTime();
    const weeksAgo = Math.floor((now - postDate) / msPerWeek);
    
    if (weeksAgo >= 0 && weeksAgo < weeks) {
      weeklyComments[weeks - 1 - weeksAgo] += (post.comment_count || 0);
    }
  });
  
  const maxComments = Math.max(...weeklyComments, 1);
  return weeklyComments.map(val => (val / maxComments) * 32);
}, [posts]);

  // Best posting time analysis
  

  const getActivityColor = (level) => {
    const colors = [
      'rgba(255, 255, 255, 0.05)',
      'rgba(30, 149, 234, 0.25)',
      'rgba(30, 173, 234, 0.5)',
      'rgba(30, 227, 234, 1)'
    ];
    return colors[level];
  };

  // Generate stable wave data points
  

  
 

  // Create wave path with peaks
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
      
      const activityLevel = data[i] / 80;
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
        <ProfileCardFront 
          setIsFlipped={setIsFlipped} 
          posts={posts}
          user={user}
          isOwnProfile={isOwnProfile}
        />
        <ProfileCardBack
          setIsFlipped={setIsFlipped}
          posts={posts}
          viewMode={viewMode}
          setViewMode={setViewMode}
          waveData={waveData}
          mediumWaveData={mediumWaveData}
          lowWaveData={lowWaveData}
          heatmapData={heatmapData}
          postTypeData={postTypeData}
          bestPostingTime={bestPostingTime}
          createWavePath={createWavePath}
          getActivityColor={getActivityColor}
          isOwnProfile={isOwnProfile}
        />
      </div>
    </div>
  );
}

export default ProfileCard;
