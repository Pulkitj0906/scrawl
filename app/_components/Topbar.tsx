'use client'
import React from "react";
import { FaMicrophoneAlt, FaMousePointer, FaRegCircle, FaRegSquare } from "react-icons/fa";
import { FaHighlighter, FaPencil, FaVideo } from "react-icons/fa6";
import useMode from "../_hooks/useMods";
import { IoRemoveOutline } from "react-icons/io5";
import { PiEraserFill } from "react-icons/pi";


const Topbar = () => {
  const {mode,setmode}=useMode()
  return (
    <div
      className="
        bg-[#DED9E2]
        drop-shadow-xl
        hover:drop-shadow-2xl
        shadow-2xl
        px-10
        absolute 
        top-0 
        right-[50%] 
        translate-x-[50%]
        h-12
        rounded-b-3xl
        flex
        justify-center
        items-center
        z-20
        gap-2
        "
    >
        <div onClick={()=>setmode('pointer')} className={`h-8 w-8 rounded-full flex items-center justify-center ${mode==='pointer' ? 'custom1':'custom'}`}><FaMousePointer /></div>
        <div onClick={()=>setmode('line')} className={`h-8 w-8 rounded-full flex items-center justify-center ${mode==='line' ? 'custom1':'custom'}`}><IoRemoveOutline /></div>
        <div onClick={()=>setmode('square')} className={`h-8 w-8 rounded-full flex items-center justify-center ${mode==='square' ? 'custom1':'custom'}`}><FaRegSquare /></div>
        <div onClick={()=>setmode('circle')} className={`h-8 w-8 rounded-full flex items-center justify-center ${mode==='circle' ? 'custom1':'custom'}`}><FaRegCircle /></div>
        <div onClick={()=>setmode('pencil')} className={`h-8 w-8 rounded-full  flex items-center justify-center ${mode==='pencil' ? 'custom1':'custom'}`}> <FaPencil /></div>
        <div onClick={()=>setmode('highlighter')} className={`h-8 w-8 rounded-full  flex items-center justify-center ${mode==='highlighter' ? 'custom1':'custom'}`}> <FaHighlighter /></div>
        <div onClick={()=>setmode('eraser')} className={`h-8 w-8 rounded-full  flex items-center justify-center ${mode==='eraser' ? 'custom1':'custom'}`}> <PiEraserFill /></div>
    </div>
  );
};

export default Topbar;
