/* eslint-disable @typescript-eslint/no-explicit-any */
function decodeBase64ToHex(input: string): string | null {
  try {
    // Decode the input string from Base64
    const decodedString = atob(input);

    // Convert the decoded string to a byte array
    const byteArray = new Uint8Array(decodedString.length);
    for (let i = 0; i < decodedString.length; i++) {
      byteArray[i] = decodedString.charCodeAt(i);
    }

    // Convert the byte array to a hexadecimal string
    const hexString =
      "0x" +
      Array.from(byteArray)
        .map((byte) => {
          return ("0" + (byte & 0xff).toString(16)).slice(-2);
        })
        .join("");

    return hexString;
  } catch (error) {
    // If an error occurs, it means the string cannot be decoded from Base64
    console.error("Decoding error:", error);
    return null;
  }
}

const isValidBase64 = (str: string): boolean => {
  const regex =
    // eslint-disable-next-line no-useless-escape
    /^(?:[A-Za-z0-9+\/]{4})*?(?:[A-Za-z0-9+\/]{2}==|[A-Za-z0-9+\/]{3}=)?$/;
  return regex.test(str);
};

const isValidBase64Url = (str: string): boolean => {
  const regex = /^[A-Za-z0-9\-_]+$/;
  return regex.test(str);
};

function transformObject<T>(obj: any): T {
  const result: any = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (
      (typeof value === "string" || key === "base64Field") &&
      isValidBase64(value)
    ) {
      result[key] = decodeBase64ToHex(value);
    } else if (typeof value === "bigint") {
      result[key] = BigInt(value);
    } else if (typeof value === "object" && value !== null) {
      result[key] = transformObject(value);
    } else {
      result[key] = value;
    }
  });

  return result as T;
}

export { decodeBase64ToHex, transformObject, isValidBase64, isValidBase64Url };
