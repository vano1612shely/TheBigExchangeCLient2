"use client";

import Error from "next/error";
import React, { useEffect } from "react";
import { notFound } from "next/navigation";
export default function NotFound() {
  useEffect(() => {
    if (!window.location.href.endsWith("?reload=true")) {
      window.location.replace(`${window.location.href}?reload=true`);
    } else {
      notFound();
    }
  }, []);
}
