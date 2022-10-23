import { useEffect, useRef } from 'react';
import './Chart.scss';

const Chart = ({ data }: { data: any }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!data) { return; }
    const renderChart = () => {
      if (!canvasRef.current) { return; }

      const canvas = canvasRef.current as HTMLCanvasElement;

      const ctx = canvas.getContext('2d');

      if (!ctx) { return; }

      const size = canvas.closest('div')?.getBoundingClientRect();

      const { width = 0, height = 0} = size ?? {};

      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.canvas.width  = width ?? 0;
      ctx.canvas.height = height ?? 0;

      ctx.clearRect(0, 0, width, height);

      const points = [...data, ...data.slice(-1)];

      const { min, max } = points.reduce((memo, point) => {
        let min = !memo.min || point < memo.min ? point : memo.min;
        let max = !memo.max || point > memo.max ? point : memo.max;
        return { min, max };
      }, { min: null, max: null });

      const slice = points.length < 2 ?
        width :
        width / (points.length - 1);

      const getX = (index: number) =>
        index * slice;
      const getY = (point: number) => {
        if (min === max) { return height / 2};
        return (1 - ((point - min) / (max - min))) * height;
      }

      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      points.forEach((point, index) => {
        const x = getX(index);
        const y = getY(point);
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, 2 * Math.PI);
        ctx.fill();
      });

      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      points.forEach((point, index) => {
        const x = getX(index);
        const y = getY(point);
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.stroke();
    };

    setTimeout(renderChart, 1);
  }, [canvasRef, data])

  return (
    <div className="chart">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default Chart;
