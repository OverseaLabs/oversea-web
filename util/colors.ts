export function getTextColor(status: string): string {
  switch (status) {
    case "Finished":
      return "text-green-500";
    case "Training":
      return "text-yellow-500";
    case "Queued":
      return "text-blue-500";
    case "Cancelled":
      return "text-red-500";
  }

  return "text-gray-500";
}

export function getBadgeColor(status: string): string {
  switch (status) {
    case "Finished":
      return "bg-green-100";
    case "Training":
      return "bg-yellow-100";
    case "Queued":
      return "bg-blue-100";
    case "Cancelled":
      return "bg-red-100";
  }

  return "bg-gray-100";
}
