import { ImageResponse } from "next/og";
import React from "react";

export const runtime = "edge";
export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div className="text-[24px] w-[100%] h-[100%] bg-yellow-600 rounded-xl flex justify-center items-center text-white">
        LE
      </div>
    ),
    { ...size },
  );
}
