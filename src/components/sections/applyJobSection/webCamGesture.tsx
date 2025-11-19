'use client';

import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';
import {
  HandLandmarker,
  FilesetResolver,
  HandLandmarkerResult,
} from '@mediapipe/tasks-vision';

type Landmark = { x: number; y: number; z?: number };

export default function WebCamGesture() {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(
    null
  );
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [gestureSequence, setGestureSequence] = useState<number[]>([]);

  const videoWidth = 640;
  const videoHeight = 480;

  const videoConstraints = {
    width: videoWidth,
    height: videoHeight,
    facingMode: 'user',
  };

  const HAND_CONNECTIONS: [number, number][] = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 5],
    [5, 6],
    [6, 7],
    [7, 8],
    [0, 9],
    [9, 10],
    [10, 11],
    [11, 12],
    [0, 13],
    [13, 14],
    [14, 15],
    [15, 16],
    [0, 17],
    [17, 18],
    [18, 19],
    [19, 20],
  ];

  // Initialize model
  useEffect(() => {
    const initModel = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
      );

      const model = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
        },
        runningMode: 'VIDEO',
        numHands: 1,
      });

      setHandLandmarker(model);
    };

    initModel();
  }, []);

  // Detect pose from landmarks
  const detectPose = (lm: Landmark[]): number => {
    if (!lm || lm.length < 21) return 0;
    const isRightHand = lm[17].x < lm[5].x;
    const fingers = {
      thumb: isRightHand ? lm[4].x > lm[3].x : lm[4].x < lm[3].x,
      index: lm[8].y < lm[6].y,
      middle: lm[12].y < lm[10].y,
      ring: lm[16].y < lm[14].y,
      pinky: lm[20].y < lm[18].y,
    };

    if (
      fingers.index &&
      !fingers.middle &&
      !fingers.ring &&
      !fingers.pinky &&
      !fingers.thumb
    )
      return 1;
    if (
      fingers.index &&
      fingers.middle &&
      !fingers.ring &&
      !fingers.pinky &&
      !fingers.thumb
    )
      return 2;
    if (
      fingers.index &&
      fingers.middle &&
      fingers.ring &&
      !fingers.pinky &&
      !fingers.thumb
    )
      return 3;
    return 0;
  };

  const drawHandInfo = (lm: Landmark[], pose: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!lm || lm.length === 0) return;

    HAND_CONNECTIONS.forEach(([startIdx, endIdx]) => {
      const start = lm[startIdx];
      const end = lm[endIdx];
      ctx.beginPath();
      ctx.moveTo(start.x * canvas.width, start.y * canvas.height);
      ctx.lineTo(end.x * canvas.width, end.y * canvas.height);
      ctx.strokeStyle = 'green';
      ctx.lineWidth = 2;
      ctx.stroke();
    });

    lm.forEach((point) => {
      ctx.beginPath();
      ctx.arc(
        point.x * canvas.width,
        point.y * canvas.height,
        5,
        0,
        2 * Math.PI
      );
      ctx.fillStyle = 'red';
      ctx.fill();
    });

    // Bounding box
    const xs = lm.map((p) => p.x * canvas.width);
    const ys = lm.map((p) => p.y * canvas.height);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const centerX = (Math.min(...xs) + Math.max(...xs)) / 2;
    const centerY = (minY + maxY) / 2;
    const boxWidth = 280;
    const boxHeight = maxY - minY + 40;
    const boxX = centerX - boxWidth / 2;
    const boxY = centerY - boxHeight / 2;

    const boxColor = pose > 0 ? '#008343' : '#E11428';
    ctx.beginPath();
    ctx.rect(boxX, boxY, boxWidth, boxHeight);
    ctx.strokeStyle = boxColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Pose text
    const fontSize = 14;
    ctx.font = `${fontSize}px Arial`;
    const text = pose > 0 ? `Pose: ${pose}` : 'Undetected';
    const textPadding = 6;
    const textWidth = ctx.measureText(text).width;
    const textHeight = fontSize;
    const bgX = boxX - 1;
    const bgY = boxY - textHeight - textPadding * 1.5 - 4;
    const bgWidth = textWidth + textPadding * 2;
    const bgHeight = textHeight + textPadding * 2;

    ctx.fillStyle = boxColor;
    ctx.fillRect(bgX, bgY, bgWidth, bgHeight);
    ctx.strokeStyle = boxColor;
    ctx.strokeRect(bgX, bgY, bgWidth, bgHeight);
    ctx.fillStyle = 'white';
    ctx.textBaseline = 'top';
    ctx.fillText(text, bgX + textPadding, bgY + textPadding);
  };

  useEffect(() => {
    if (!handLandmarker || !webcamRef.current?.video || capturedImage) return;

    let animationFrameId: number;

    const detectHands = async () => {
      const video = webcamRef.current?.video;
      if (!video || video.readyState < 2) {
        animationFrameId = requestAnimationFrame(detectHands);
        return;
      }

      const result: HandLandmarkerResult = handLandmarker.detectForVideo(
        video,
        performance.now()
      );

      if (result.landmarks && result.landmarks.length > 0) {
        const pose = detectPose(result.landmarks[0]);
        drawHandInfo(result.landmarks[0], pose);
        let newSequence = [...gestureSequence, pose];

        if (!isDetecting) {
          const lastStep = gestureSequence[gestureSequence.length - 1] || 0;
          if (pose === lastStep + 1) {
            setGestureSequence(newSequence);
            if (newSequence.join('') === '123') {
              startCountdown();
            }
          } else {
            newSequence = [1];
            setGestureSequence([1]);
          }
        }
      } else {
        canvasRef.current
          ?.getContext('2d')
          ?.clearRect(0, 0, videoWidth, videoHeight);
      }

      animationFrameId = requestAnimationFrame(detectHands);
    };

    detectHands();

    return () => cancelAnimationFrame(animationFrameId);
  }, [handLandmarker, isDetecting, gestureSequence, capturedImage]);

  const startCountdown = () => {
    setIsDetecting(true);
    let counter = 3;
    setCountdown(counter);
    const interval = setInterval(() => {
      counter -= 1;
      if (counter > 0) {
        setCountdown(counter);
      } else {
        clearInterval(interval);
        setCountdown(null);
        takePicture();
        setGestureSequence([]);
        setIsDetecting(false);
      }
    }, 1000);
  };

  const takePicture = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) setCapturedImage(imageSrc);
  };

  const retakePicture = () => {
    setCapturedImage(null);
    setGestureSequence([]);
  };

  const submitPicture = () => {
    if (!capturedImage) return;
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = 'gesture_capture.png';
    a.click();
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>WebCam Gesture Detection + Hand Skeleton</h1>

      <div style={{ position: 'relative', display: 'inline-block' }}>
        {!capturedImage && (
          <div className='relative inline-block'>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat='image/png'
              videoConstraints={videoConstraints}
              style={{ borderRadius: 8 }}
            />
            <canvas
              ref={canvasRef}
              width={videoWidth}
              height={videoHeight}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                borderRadius: 8,
                pointerEvents: 'none',
              }}
            />
            {countdown !== null && (
              <div
                className='absolute inset-0 flex flex-col items-center justify-center text-white text-3xl font-bold'
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.4)',
                  borderRadius: 8,
                }}
              >
                <div>Capturing photo in</div>
                <div>{countdown}</div>
              </div>
            )}
          </div>
        )}

        {capturedImage && (
          <img
            src={capturedImage}
            alt='captured'
            width={videoWidth}
            height={videoHeight}
            style={{ borderRadius: 8 }}
          />
        )}
      </div>

      <div style={{ marginTop: 15 }}>
        {capturedImage ? (
          <>
            <button
              onClick={retakePicture}
              style={{
                padding: '10px 20px',
                fontSize: 18,
                cursor: 'pointer',
                marginRight: 10,
              }}
            >
              🔄 Retake
            </button>
            <button
              onClick={submitPicture}
              style={{ padding: '10px 20px', fontSize: 18, cursor: 'pointer' }}
            >
              ✅ Submit
            </button>
          </>
        ) : (
          <button
            onClick={takePicture}
            style={{ padding: '10px 20px', fontSize: 18, cursor: 'pointer' }}
          >
            📸 Take Picture
          </button>
        )}
      </div>
    </div>
  );
}
