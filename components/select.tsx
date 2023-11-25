import React, { useState, useEffect, useRef } from "react";
import type { MouseEventHandler } from "react";
import Image from "next/image";
import { URL } from "@/services/api/interceptors";
type Option = {
  title: string;
  value: string;
  type: "fiat" | "crypto";
  icon_link?: string;
};
type OptionProps = {
  option: Option;
  onClick: (value: Option) => void;
};
const OptionEl = (props: OptionProps) => {
  const { option, onClick } = props;
  const optionRef = useRef<HTMLLIElement>(null);

  const handleClick =
    (clickedValue: Option): MouseEventHandler<HTMLLIElement> =>
    () => {
      onClick(clickedValue);
    };

  useEffect(() => {
    const optionR = optionRef.current;
    if (!optionR) return;
    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (document.activeElement === optionR && event.key === "Enter") {
        onClick(option);
      }
    };

    optionR.addEventListener("keydown", handleEnterKeyDown);
    return () => {
      optionR.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, [option, onClick]);

  return (
    <li
      className='w-full h-[70px] flex items-center rounded-[10px] bg-[#222425] border border-[#222425] mb-[5px] px-[30px] hover:border-[#ffb932] hover:bg-[#2f2f2f]'
      value={option.value}
      onClick={handleClick(option)}
      tabIndex={0}
      data-testid={`select-option-${option.value}`}
      ref={optionRef}
    >
      {option.icon_link ? (
        <Image
          src={URL + "/" + option.icon_link}
          alt={option.value}
          width={30}
          height={30}
          className='mr-[5px]'
        />
      ) : (
        ""
      )}
      {option.title}
    </li>
  );
};

type SelectProps = {
  selected: Option | null;
  options: Option[];
  placeholder?: string;
  mode?: "rows" | "cells";
  status?: "default" | "invalid";
  onChange?: (value: Option) => void;
  onClose?: () => void;
};

const Select = (props: SelectProps) => {
  const {
    mode = "rows",
    options,
    placeholder,
    status = "default",
    selected,
    onChange,
    onClose,
  } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const [selectedItem, setSelectedItem] = useState<Option | null>(null);
  const placeholderRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const { target } = event;
      if (target instanceof Node && !rootRef.current?.contains(target)) {
        isOpen && onClose?.();
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [onClose]);
  useEffect(() => {
    setSelectedItem(selected);
  }, [options]);
  useEffect(() => {
    const placeholderEl = placeholderRef.current;
    if (!placeholderEl) return;

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        setIsOpen((prev) => !prev);
      }
    };
    placeholderEl.addEventListener("keydown", handleEnterKeyDown);

    return () => {
      placeholderEl.removeEventListener("keydown", handleEnterKeyDown);
    };
  }, []);

  const handleOptionClick = (value: Option) => {
    setIsOpen(false);
    onChange?.(value);
    options.map((option) => {
      if (option.value == value.value) {
        setSelectedItem(option);
      }
    });
  };
  const handlePlaceHolderClick: MouseEventHandler<HTMLDivElement> = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div
      className='w-full h-[70px]  text-white font-raleway relative'
      ref={rootRef}
      data-is-active={isOpen}
      data-mode={mode}
      data-testid='selectWrapper'
    >
      <div
        className='w-full h-full flex items-center bg-[#222425] border border-[#222425] px-[30px] rounded-[10px] ease-linear duration-200 hover:border-[#ffb932] hover:bg-[#2f2f2f]'
        data-status={status}
        data-selected={!!selected?.value}
        onClick={handlePlaceHolderClick}
        role='button'
        tabIndex={0}
        ref={placeholderRef}
      >
        {selectedItem ? (
          selectedItem.icon_link ? (
            <>
              <Image
                src={URL + "/" + selectedItem.icon_link}
                alt={selectedItem.value}
                width={30}
                height={30}
                className='mr-[5px]'
              />
              {selectedItem.title}
            </>
          ) : (
            selectedItem.title
          )
        ) : (
          selected?.title || placeholder
        )}
      </div>
      {isOpen && (
        <ul
          className='absolute top-[75px] left-0 w-full max-h-[300px] z-10 overflow-y-auto bg-[#1a1c1e]'
          data-testid='selectDropdown'
        >
          {options.map((option) => (
            <OptionEl
              key={option.value}
              option={option}
              onClick={handleOptionClick}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
