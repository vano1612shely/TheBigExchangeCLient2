import { ComponentPropsWithoutRef, FC } from "react";
import clsx from "clsx";

interface StarsPickerProps extends ComponentPropsWithoutRef<"div"> {
  count: number;
  selected: number;
  pick: (id: number) => void;
}
const StarsPicker: FC<StarsPickerProps> = ({
  className,
  count,
  selected,
  pick,
  ...rest
}) => {
  const numbers = Array.from({ length: count }, (_, index) => index + 1);
  return (
    <div>
      {numbers.map((value, index) => {
        return (
          <button
            type="button"
            key={index}
            onClick={() => pick(index + 1)}
            className={clsx(
              "text-[20px]",
              value <= selected ? "text-[#ffb932]" : "text-white",
            )}
          >
            {value <= selected ? "★" : "☆"}
          </button>
        );
      })}
    </div>
  );
};
export default StarsPicker;
