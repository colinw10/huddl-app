// 🔵 PABLO - UI/Styling | 🟡 NATALIA - User Data Logic
// ProfileCard.jsx - User profile card with flip animation
// Now a thin container that orchestrates subcomponents

import { useMemo, useState } from 'react';
import './ProfileCard.scss';
import ProfileCardFront from './components/ProfileCardFront';
import ProfileCardBack from './components/ProfileCardBack';

function ProfileCard({ isFlipped, setIsFlipped, posts, user }) {
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
    const thoughts = Math.floor(random() * 30) + 35;
    const media = Math.floor(random() * 25) + 20;
    const milestones = 100 - thoughts - media;
    
    return [
      { type: 'Thoughts', percentage: thoughts, color: 'rgba(30, 234, 76, 0.8)' },
      { type: 'Media', percentage: media, color: 'rgba(26, 115, 231, 0.8)' },
      { type: 'Milestones', percentage: milestones, color: 'rgba(234, 30, 162, 0.8)' }
    ];
  }, []);

  // Generate GitHub-style heatmap data
  const heatmapData = useMemo(() => {
    const random = seededRandom(12345);
    const weeks = 52;
    const daysPerWeek = 7;
    const data = [];
    
    for (let week = 0; week < weeks; week++) {
      const weekData = [];
      for (let day = 0; day < daysPerWeek; day++) {
        const level = Math.floor(random() * 4);
        weekData.push(level);
      }
      data.push(weekData);
    }
    
    return data;
  }, []);

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
    
    const random = seededRandom(99999);
    const peakHour = Math.floor(random() * 5) + 18;
    const period = peakHour >= 12 ? 'PM' : 'AM';
    const displayHour = peakHour > 12 ? peakHour - 12 : peakHour;
    
    return `${days[peakDay]} ${displayHour}${period}`;
  }, [heatmapData]);

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
  const waveData = useMemo(() => {
    const seed = 12345;
    let current = seed;
    const pseudoRandom = () => {
      current = (current * 1103515245 + 12345) & 0x7fffffff;
      return (current % 100) / 100;
    };
    return Array.from({ length: 52 }).map(() => 20 + pseudoRandom() * 60);
  }, []);

  const mediumWaveData = useMemo(() => {
    return waveData.map(value => value * 0.7);
  }, [waveData]);

  const lowWaveData = useMemo(() => {
    return waveData.map(value => value * 0.4);
  }, [waveData]);

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
        />
      </div>
    </div>
  );
}

export default ProfileCard;
