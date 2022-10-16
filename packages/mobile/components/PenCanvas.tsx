/* eslint-disable */
// @ts-nocheck
import React, {
  TouchEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Point = {
  x: number;
  y: number;
  lineWidth: number;
  color: string;
};

type Stroke = Point[];

const PenCanvas = () => {
  const [isMousedown, setIsMousedown] = useState(false);
  const [points, setPoints] = useState<Stroke>([]);
  const [strokeHistory, setStrokeHistory] = useState<Stroke[]>([]);
  const [color, setColor] = useState("green");

  const canvas = useRef<HTMLCanvasElement>(null);
  const cxt = useRef<CanvasRenderingContext2D>(null);

  useEffect(() => {
    if (canvas.current) {
      canvas.current.width = canvas.current.getClientRects()[0].width * 2;
      canvas.current.height = canvas.current.getClientRects()[0].height * 2;
      cxt.current = canvas.current.getContext("2d");
      cxt.current.strokeStyle = color;
    }
  }, []);

  const drawOnCanvas = useCallback(
    (_stroke?: Stroke) => {
      const stroke = _stroke ?? points;
      if (!canvas.current) return;
      const context = cxt.current;
      if (!context) return;

      if (stroke.length < 3) return;
      context.beginPath();
      const last = stroke.length - 1;

      const newX = (stroke[last].x + stroke[last - 1].x) / 2;
      const newY = (stroke[last].y + stroke[last - 1].y) / 2;
      const lastX = (stroke[last - 1].x + stroke[last - 2].x) / 2;
      const lastY = (stroke[last - 1].y + stroke[last - 2].y) / 2;

      context.lineWidth = stroke[last - 1].lineWidth;

      context.quadraticCurveTo(lastX, lastY, newX, newY);
      context.stroke();
      context.beginPath();
      context.moveTo(newX, newY);

      context.strokeStyle = color;
      context.lineCap = "round";
      context.lineJoin = "round";
    },
    [points, color]
  );

  const undoDraw = useCallback<TouchEventHandler<HTMLCanvasElement>>(() => {
    setStrokeHistory((prev) => {
      const newHistory = [...prev];
      newHistory.pop();
      return newHistory;
    });
    const context = canvas.current?.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    strokeHistory.forEach((stroke) => {
      drawOnCanvas(stroke);
    });
  }, [drawOnCanvas, strokeHistory]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsMousedown(true);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      e.preventDefault();
      setIsMousedown(false);
      setStrokeHistory((prev) => [...prev, points]);
      setPoints([]);
    },
    [points]
  );

  const handleTouchMove = useCallback(
    (e) => {
      const curScrollTop = canvas.current?.getClientRects()[0].top ?? 0;
      e.preventDefault();
      if (
        isMousedown &&
        !e?.nativeEvent?.touches &&
        e.nativeEvent.buttons !== 1
      ) {
        handleTouchEnd(e);
        return;
      }
      if (isMousedown) {
        let pressure = 0.1;
        let x: number;
        let y: number;
        if (e?.nativeEvent?.touches) {
          const { force } = e.nativeEvent.touches[0];
          if (force === 0) return;
          if (force > 0) {
            pressure = force;
          }
          x = e.touches[0].clientX * 2;
          y = (e.touches[0].clientY - curScrollTop) * 2;
        } else {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          x = e.clientX * 2;
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          y = (e.clientY - curScrollTop) * 2;
          pressure = 1;
        }

        const newPoint = {
          x,
          y,
          lineWidth: Math.log(pressure + 1) * 20,
          color,
        };

        setPoints((prev) => [...prev, newPoint]);

        drawOnCanvas();
      }
    },
    [color, drawOnCanvas, handleTouchEnd, isMousedown]
  );

  return (
    <div>
      <style>{`
      body { background-color: #FDFFED }
      `}</style>
      <canvas
        ref={canvas}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        onMouseUp={handleTouchEnd}
        style={{
          background:
            "repeating-linear-gradient(#FDFFED, #FDFFED 25px, #E9EBDA 26px, #E9EBDA 27px)",
          width: "50vw",
          height: "100%",
          touchAction: "none",
        }}
      >
        Sorry, your browser is too old for this demo.
      </canvas>
    </div>
  );
};

export default PenCanvas;
