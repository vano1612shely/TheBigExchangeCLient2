"use client";

import Error from "next/error";
import React, { useEffect } from "react";

// Render the default Next.js 404 page when a route
// is requested that doesn't match the middleware and
// therefore doesn't have a locale associated with it.

export default function NotFound() {
  useEffect(() => {
    window.location.reload();
  }, []);
}
