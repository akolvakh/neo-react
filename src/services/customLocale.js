import { registerLocale } from "react-datepicker";
import { enUS } from "date-fns/locale";

const customLocale = {
  ...enUS,
  localize: {
    ...enUS.localize,
    day: (n) => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"][n],
    month: (n) =>
      [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ][n],
  },
};

registerLocale("custom", customLocale);
export default customLocale;
