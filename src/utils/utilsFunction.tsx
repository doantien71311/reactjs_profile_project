export function splitStringToArray(inputString: string): string[] {
  const result: string[] = inputString.split("");
  return result;
}

export function numberToStringMoney(input?: number): string {
  if (!input) return "";
  const result: string = input!.toLocaleString("vi-VN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return result + "đ";
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
