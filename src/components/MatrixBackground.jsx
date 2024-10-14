import React, { useEffect, useRef } from 'react';

const MatrixBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';

    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    // Load the Anonymous mask image
    const maskImage = new Image();
    maskImage.src = '/anonymous-mask.svg';
    maskImage.onload = () => {
      // Start the animation once the image is loaded
      animate();
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the mask
      const maskSize = Math.min(canvas.width, canvas.height) * 0.8;
      const maskX = (canvas.width - maskSize) / 2;
      const maskY = (canvas.height - maskSize) / 2;
      ctx.globalAlpha = 0.05; // Make the mask very faint
      ctx.drawImage(maskImage, maskX, maskY, maskSize, maskSize);
      ctx.globalAlpha = 1; // Reset alpha for the text

      ctx.fillStyle = '#0F0';
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }

      requestAnimationFrame(animate);
    };

    return () => {
      // Clean up
      cancelAnimationFrame(animate);
    };
  }, []);

  return <canvas ref={canvasRef} id="matrix" />;
};

export default MatrixBackground;