import axios from "axios";
import axiosRetry from "axios-retry";

export async function getUploadName(name: string) {
  const { data } = await axios.post(
    "/api/datasets/new",
    { name: name },
    { withCredentials: true }
  );

  return data.uploadName;
}

export async function getUploadId(url: string): Promise<string> {
  const { data } = await axios.post(url, null, {
    params: {
      action: "mpu-create",
    },
  });

  console.log(`upload id ${data.uploadId}`);
  return data.uploadId;
}

export function uploadPart(
  partsize: number,
  url: string,
  uploadId: string,
  index: number,
  file: any
) {
  return new Promise<any>((resolve, reject) => {
    if (!file) {
      return reject("No file");
    }

    let start = partsize * index;

    let end;

    if (start + partsize > file.length) {
      end = file.length;
    } else {
      end = start + partsize;
    }

    let part = file.slice(start, end);
    let reader = new FileReader();
    reader.readAsArrayBuffer(part);

    reader.onload = async (e) => {
      try {
        axiosRetry(axios, { retries: 3 });
        if (!reader.result) {
          return;
        }

        let p = reader.result;
        const { data } = await axios.put(url, p, {
          params: {
            action: "mpu-uploadpart",
            uploadId: uploadId,
            partNumber: index + 1,
          },
        });

        return resolve(data);
      } catch (err) {
        return reject(err);
      }
    };
  });
}

export async function finishUpload(
  url: string,
  uploadId: string,
  uploadedParts: any[]
): Promise<boolean> {
  const { data, status } = await axios.post(
    url,
    { parts: uploadedParts },
    {
      params: {
        action: "mpu-complete",
        uploadId: uploadId,
      },
    }
  );

  if (status === 200) {
    return true;
  }

  return false;
}

export async function submitAndTrain(file: any, name: string) {
  // await submitFile(file);
  await trainModel(name);
}

export async function trainModel(name: string) {
  const res = await fetch("/api/train", {
    method: "POST",
    body: JSON.stringify({ modelName: name }),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 200) {
    alert("Creating model failed. Check console for details.");
  }

  let data = await res.json();
  console.log(data);
  //   setIsUploading(false);
  //   return router.push(`/app/models/${data.id}`);
  return data.id;
}
