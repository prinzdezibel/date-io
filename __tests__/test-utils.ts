import { IUtils } from "../packages/core/IUtils";
import LuxonUtils from "../packages/luxon/src";
import DateFnsUtils from "../packages/date-fns/src";
import MomentUtils from "../packages/moment/src";
import DayJSUtils from "../packages/dayjs/src";
import JsJodaUtilsConstructor from "../packages/js-joda/src";
import { Locale as JsJodaLocale } from "@js-joda/locale_en-us";
import { LocalDateTime } from "@js-joda/core";

// Time when the first commit to date-io was created
export const TEST_TIMESTAMP = "2018-10-30T11:44:00.000Z";
export type TestLib = "Luxon" | "Moment" | "DateFns" | "Dayjs" | "JsJoda";

// Run js-joda tests with LocalDateTime date type.
const Constructor = JsJodaUtilsConstructor(LocalDateTime);

const allUtils = [
  ["Luxon", new LuxonUtils()],
  ["DateFns", new DateFnsUtils()],
  ["Moment", new MomentUtils()],
  ["Dayjs", new DayJSUtils()],
  ["JsJoda", new Constructor({ locale: JsJodaLocale.US })]
] as const;

export const utilsTest = (
  name: string,
  innerFn: (date: any, utils: IUtils<any>, currentLib: TestLib) => void
) => {
  test.each(allUtils)(`%s -- ${name}`, (name, utils) =>
    innerFn(utils.date(TEST_TIMESTAMP), utils, name)
  );
};

export const formats: Record<string, Record<TestLib, string>> = {
  day: { Luxon: "dd", DateFns: "dd", Moment: "DD", Dayjs: "DD", JsJoda: "dd" },
  dateTime: {
    Luxon: "yyyy-MM-dd HH:mm",
    DateFns: "yyyy-MM-dd HH:mm",
    Moment: "YYYY-MM-DD HH:mm",
    Dayjs: "YYYY-MM-DD HH:mm",
    JsJoda: "yyyy-MM-dd HH:mm"
  }
};
