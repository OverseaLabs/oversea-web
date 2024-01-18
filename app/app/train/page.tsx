"use client";

import LoadingContainer from "@/components/LoadingContainer";
import { useEffect } from "react";

export default function Train() {
  useEffect(() => {
    const doWork = async () => {
      const m: any = window.localStorage.getItem("modelStatus");
      const modelState = JSON.parse(m);
      if (!modelState) {
        alert("Model failed to train. No model state");
        window.location.href = "/app/models/newprimary";
        return;
      }

      const response = await fetch("/api/train", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          modelName: modelState.modelName,
          datasetUrl: modelState.datasetUrl,
          baseModel: modelState.baseModel,
          totalSteps: modelState.totalSteps,
        }),
      });

      const status = response.status;

      if (status !== 200) {
        const text = await response.text();
        alert(`An error has occured: ${text}`);
        window.location.href = "/app/models/newprimary";
        return;
      }

      const data = await response.json();
      console.log(data);

      window.location.href = `/app/models/${data.id}`;

      // send api request
    };
    doWork();
  }, []);

  return <LoadingContainer />;
}
