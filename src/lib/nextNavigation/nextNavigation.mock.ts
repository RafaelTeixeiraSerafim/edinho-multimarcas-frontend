import { fn } from "@storybook/test";
import * as navigation from "./nextNavigation";
import { ReadonlyURLSearchParams } from "next/navigation";

export const useRouter = fn(navigation.useRouter).mockName("useRouter");
export const usePathname = fn(navigation.usePathname).mockName("usePathname");
export const useSearchParams = fn(navigation.useSearchParams)
  .mockName("useSearchParams")
  .mockImplementation(
    () => ({ get: (key: string) => null } as unknown as ReadonlyURLSearchParams)
  );

console.log("loading nextNavigation.mock.ts")