import React from 'react';

var VideoPlayer = (props) => {
  let title = 'Yellow Claw presents The OG Trap Set Part 1';
  let description = 'Welcome to our first OG trap mix. A distinguished selection of our favourite songs from the early days of trap. All these records helped us destroy clubs around the world and we will never forget that. Sending our love to all these producers for being awesome and pushing the sound!';
  let id = '_Aw0aSzJAcg';
  return (
    <div className="video-player">
      <h3>{title}</h3>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe className="embed-responsive-item" src={"https://www.youtube.com/embed/" + id} allowFullScreen></iframe>
      </div>
      <div className="video-player-details">
        {/* <div>{description}</div> */}
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
