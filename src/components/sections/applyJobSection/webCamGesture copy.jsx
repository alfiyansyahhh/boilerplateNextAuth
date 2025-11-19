'use client';

import { useRef, useState } from 'react';
import Webcam from 'react-webcam';

export default function WebCamGesture() {
  const webcamRef = useRef < Webcam > null;
  const [capturedImage, setCapturedImage] = (useState < string) | (null > null);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: 'user', // depan
  };

  const takePicture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) setCapturedImage(imageSrc);
    }
  };

  const saveImage = () => {
    if (!capturedImage) return;
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = 'capture.png';
    a.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>React Webcam Capture</h1>

      {/* Live camera preview */}
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat='image/png'
        videoConstraints={videoConstraints}
        style={{ borderRadius: 8 }}
      />

      <div style={{ marginTop: 15 }}>
        <button
          onClick={takePicture}
          style={{
            padding: '10px 20px',
            fontSize: 18,
            cursor: 'pointer',
            marginRight: 10,
          }}
        >
          📸 Take Picture
        </button>

        {capturedImage && (
          <button
            onClick={saveImage}
            style={{
              padding: '10px 20px',
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            💾 Save Image
          </button>
        )}
      </div>

      {/* Preview captured image */}
      {capturedImage && (
        <div style={{ marginTop: 20 }}>
          <h3>Preview:</h3>
          <img
            src={capturedImage}
            alt='captured'
            width={300}
            style={{ borderRadius: 8 }}
          />
        </div>
      )}
    </div>
  );
}
