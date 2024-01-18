"use client";

import { useEffect } from "react";

export default function App() {
  useEffect(() => {
    window.location.href = "/app/models/newprimary";
  }, []);
  return <div></div>;
}
