import React from 'react';

var VideoPlayer = ({ currentVideoInfo }) => {

  const { videoTitle, videoId } = currentVideoInfo;

  return (
    <div className="video-player-container">
      <h3>{videoTitle}</h3>
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${videoId}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    </div>
  );
};

// PropTypes tell other developers what `props` a component expects
// Warnings will be shown in the console when the defined rules are violated
// VideoPlayer.propTypes = {
//   video: PropTypes.object
// };

// In the ES6 spec, files are "modules" and do not share a top-level scope
// `var` declarations will only exist globally where explicitly defined
export default VideoPlayer;
