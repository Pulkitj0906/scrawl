'use client'
import { useCallback, useEffect, useRef, useState } from "react";
import useMode from "../_hooks/useMods";

const Pencil = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPointerDown, setIsPointerDown] = useState(false);
  const [From, setFrom] = useState<{ x: number; y: number }>();
  const [points, setPoints] = useState<
    { id: number; xFrom: number; yFrom: number; xTo: number; yTo: number }[]
  >([]);
  const [Temppoints, setTempPoints] = useState<
    {  xFrom: number; yFrom: number; xTo: number; yTo: number }[]
  >([]);
  const [To, setTo] = useState<{ x: number; y: number }>();
  const { mode } = useMode();
  const [nextPointId, setNextPointId] = useState(0);

  const handlePointerDown: React.PointerEventHandler<HTMLCanvasElement> = (
    e
  ) => {
    if (mode != "pointer" && mode!=='eraser') {
      setIsPointerDown(true);
      setFrom({ x: e.clientX, y: e.clientY });
    }
  };

  const handlePointerUp: React.PointerEventHandler<HTMLCanvasElement> = (e) => {
    if (mode != "pointer" && mode!=='eraser') {
      setIsPointerDown(false);
      setTo({ x: e.clientX, y: e.clientY });
      setTempPoints([])
      if (From) {
        const newPoint = {
          id: nextPointId,
          xFrom: From.x,
          yFrom: From.y,
          xTo: e.clientX,
          yTo: e.clientY,
        };
        setPoints((prevPoints) => [...prevPoints, newPoint]);
        setNextPointId(nextPointId + 1);
      }
    }
  };

  const handlePointerMove: React.PointerEventHandler<HTMLCanvasElement> = (
    e
  ) => {
    if (isPointerDown) {
      setTo({ x: e.clientX, y: e.clientY });
      if(mode=='line'){setTempPoints((prev) => [
        { xFrom: From!.x, yFrom: From!.y, xTo: e.clientX, yTo: e.clientY }
    ]);}
      if (From && (mode == "pencil" || mode == "highlighter")) {
        const newPoint = {
          id: nextPointId,
          xFrom: From.x,
          yFrom: From.y,
          xTo: e.clientX,
          yTo: e.clientY,
        };
        setPoints((prevPoints) => [...prevPoints, newPoint]);
        if (mode == "highlighter") {
          setTimeout(() => {
            setPoints((prevPoints) =>
              prevPoints.filter((point) => point.id !== nextPointId)
            );
          }, 700);
        }
        setNextPointId(nextPointId + 1);
        setFrom({ x: e.clientX, y: e.clientY });
      }
    }
  };
  
  const handleCanvasClick: React.MouseEventHandler<HTMLCanvasElement> = (
    e
  ) => {
    const canvas = canvasRef.current;
    if (canvas && mode=='pointer') {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX;
      const clickY = e.clientY;
      points.forEach((point) => {
        const { xFrom, yFrom, xTo, yTo } = point;
        let LHS=(clickX-xFrom)/(xTo-xFrom)
        let RHS=(clickY-yFrom)/(yTo-yFrom)
        if (
          Math.abs(LHS-RHS)<0.1
        ) {
          console.log("Clicked on point:", point);
        }
      });   
    }else if(canvas && mode=='eraser'){
      points.forEach((point) => {
        console.log(point)
        const { xFrom, yFrom, xTo, yTo } = point;
        let LHS=(e.clientX-xFrom)/(xTo-xFrom)
        let RHS=(e.clientY-yFrom)/(yTo-yFrom)
        if (
          Math.abs(LHS-RHS)<0.1 && (((xFrom<e.clientX && e.clientX<xTo))|| ((xFrom>e.clientX && e.clientX>xTo)))
        ) {
          console.log('point to remove',point)
          setPoints((prevPoints) =>
              prevPoints.filter((layer) => layer.id !== point.id)
            );
        }
      })
    }
  }

  let c: CanvasRenderingContext2D | null = null;

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.height = window.innerHeight;
      canvasRef.current.width = window.innerWidth;
      c = canvasRef.current.getContext("2d");

      if (c && From && To) {
        points.forEach(({ xFrom, yFrom, xTo, yTo }) => {
          c!.beginPath();
          c!.lineWidth = 2;
          c!.moveTo(xFrom, yFrom);
          c!.lineTo(xTo, yTo);
          c!.stroke();
        });
        
        Temppoints.forEach(({ xFrom, yFrom, xTo, yTo }) => {
          c!.beginPath();
          c!.lineWidth = 1;
          c!.moveTo(xFrom, yFrom);
          c!.lineTo(xTo, yTo);
          c!.stroke();
        });
      }
    }
    console.log("rendered");
  }, [Temppoints,points]);

  return (
    <>
      <canvas
        ref={canvasRef}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerMove={handlePointerMove}
        onClick={handleCanvasClick}
        className="absolute h-full w-full hover:cursor-crosshair"
      ></canvas>
      <p>No.of Layers: {points.length}</p>
      <p>No.of Temp Layers: {Temppoints.length}</p>
    </>
  );
};

export default Pencil;
