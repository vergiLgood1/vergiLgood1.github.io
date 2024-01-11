import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { Typewriter } from 'react-simple-typewriter';
import Countdown from 'react-countdown';
import ReactPlayer from 'react-player';
import video from './assets/video2.mp4';
import audio from './song/song.mp3';
import BirthdayCake from './birthdayCake.js'; // Import the BirthdayCake component

const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCountdown, setShowCountdown] = useState(true);
  const [showVideo, setShowVideo] = useState(false);
  const [playAudio, setPlayAudio] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      console.log('Confetti is active!');
    }
  }, [showConfetti]);

  function timeLeft() {
    const newYearDate = new Date('January 12, 2024 00:00:00').getTime();
    const dateNow = new Date().getTime();
    const remainingTime = newYearDate - dateNow;
    return remainingTime;
  }

  const CountdownRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span></span>;
    } else {
      return (
        <div className="flex items-center justify-center space-x-10 ">
          <div className="flex flex-col items-center">
            <div className="text-6xl font-extralight">{days}</div>
            <div className="text-2xl my-4">DAYS</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-extralight">{hours}</div>
            <div className="text-2xl my-4">HOURS</div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-extralight">{minutes}</div>
            <div className="text-2xl my-4">MINUTES</div>

          </div>
          <div className="flex flex-col items-center">
            <div className="text-6xl font-extralight">{seconds}</div>
            <div className="text-2xl my-4">SECONDS</div>

          </div>
        </div>
      );
    }
  };

  const AudioPlayer = () => {
    return (
      <audio
        src={audio}
        autoPlay={playAudio}
        loop={true}
        onEnded={() => {
          setPlayAudio(false);
        }}
      />
    );
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-8 bg-rose-300">
      {showConfetti && (
        <Confetti
          numberOfPieces={100}
          recycle={true}
          width={window.innerWidth}
          height={window.innerHeight}
          gravity={0.02}
        />
      )}

{showCountdown && (
        <div className="flex flex-col items-center text-center">
          <p className="text-2xl text-white-50 mb-4">Your special day is coming up, babe😍!</p>
          <div className="z-50 text-white-50 font-thin text-8xl">
            <Countdown
              date={Date.now() + timeLeft()}
              renderer={CountdownRenderer}
              onComplete={() => {
                setShowCountdown(false);
                setShowVideo(true);
                setPlayAudio(true);
                
              }}
            />
          </div>
        </div>
      )}

      {showVideo && (
        <div>
<ReactPlayer
  url={video}
  playing={true}
  controls={true}
  width="100%"
  height="100%"
  onPlay={() => {
    
  }}
  onEnded={() => {
    setShowVideo(false);
    setVideoEnded(true);
    setShowConfetti(true);
    
  }}
/>
        </div>
      )}

      {playAudio && <AudioPlayer />}

      {videoEnded && <BirthdayCake />}
    </div>
  );
};

export default App;