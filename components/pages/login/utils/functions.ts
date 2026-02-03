import { User } from "@/storage/utils/interface";
import base64 from "react-native-base64";

export function fixTypesUser(
  key: string,
  value: string,
): string | number | boolean {
  const types: Record<string, number | boolean> = {
    userId: Number(value),
    exp: Number(value),
    iat: Number(value),
    validated: value === "true",
  };

  return types[key] ?? value;
}

export function transformStringTokenToDecriptedList(token: string): {
  listToken: string[];
  token: string;
} {
  const splitedToken = token.split(".")[1];
  const decoded = base64.decode(splitedToken);

  return {
    listToken: decoded.replace("{", "").replace("}", "").split(","),
    token: token,
  };
}

export function parseListUserTokenToJson(listToken: string[], token: string) {
  let json = {};
  for (const item of listToken) {
    const [key, value] = item.split(":");
    const fixKey = key.replaceAll('"', "").trim();
    const fixValue = value.replaceAll('"', "").trim();
    json = {
      ...json,
      [fixKey]: fixTypesUser(fixKey, fixValue),
    };
  }
  const finalJson = {
    ...json,
    token: token,
  };
  return finalJson as User;
}
