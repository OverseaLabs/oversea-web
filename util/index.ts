export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export const kebabCase = (str: string) =>
  str
    .replace(/([a-z])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
