'use client';
import { useEffect, useRef, useState } from 'react';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as cam from '@mediapipe/camera_utils';

export default function PalmReader() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [analysis, setAnalysis] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    let hands;
    async function setup() {
      const handsModule = await import('@mediapipe/hands');
      hands = new handsModule.Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      });

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.8,
        minTrackingConfidence: 0.8,
      });

      hands.onResults((results) => {
        if (!canvasRef.current || !videoRef.current) return;

        const canvasCtx = canvasRef.current.getContext('2d');
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        canvasCtx.drawImage(
          results.image,
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );

        if (results.multiHandLandmarks?.length > 0) {
          for (const landmarks of results.multiHandLandmarks) {
            drawConnectors(canvasCtx, landmarks, handsModule.HAND_CONNECTIONS, { color: '#00FF00', lineWidth: 5 });
            drawLandmarks(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 });
          }
        }
        canvasCtx.restore();
      });

      if (videoRef.current) {
        const camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            await hands.send({ image: videoRef.current });
          },
          width: 640,
          height: 480,
        });
        camera.start();
      }
    }
    setup();
  }, []);

  const sendImageToBackend = async () => {
    setProcessing(true);
    const canvas = canvasRef.current;
    const imageBlob = await new Promise((resolve) =>
      canvas.toBlob(resolve, 'image/png')
    );
    const formData = new FormData();
    formData.append('file', imageBlob, 'palm.png');

    const res = await fetch('/api/palm-test', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    setAnalysis(data.analysis);
    setProcessing(false);
  };

  return (
    <div className="space-y-4 py-32">
      <video ref={videoRef} style={{ display: 'none' }} width="640" height="480" playsInline />
      <canvas ref={canvasRef} width="640" height="480" className="border" />
      <button
        onClick={sendImageToBackend}
        className="px-4 py-2 bg-blue-500 text-white rounded"
        disabled={processing}
      >
        {processing ? 'Analyzing...' : 'Analyze Palm'}
      </button>
      {analysis && <div className="mt-4 p-4 border bg-gray-100">{analysis}</div>}
    </div>
  );
}
