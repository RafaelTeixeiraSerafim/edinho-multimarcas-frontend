import React from "react";

export default function BgAbstractVideo() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 h-full w-full object-cover"
    >
      <source src={"/videos/login-bg-video.webm"} type="video/webm" />
    </video>
  );
}
