import { Dispatch, ReactNode, SetStateAction, useEffect, useRef } from "react";
import { Button } from "../ui/button";

interface DropdownProps {
  buttonLabel: string,
  style: {
    MENU_ITEMS: string;
    MENU: string;
  },
  show: boolean,
  setShow: Dispatch<SetStateAction<boolean>>,
  children: ReactNode,
}

const DROPDOWN_ICON =
  "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z";

const BUTTON_STYLE =
  "w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 h-full flex justify-between";

const Dropdown: React.FC<DropdownProps> = ({ 
    buttonLabel, 
    style, 
    show,
    setShow,
    children,
  }) => {

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      // Move the setShow call to the next tick using setTimeout
      setTimeout(() => {
        setShow(false);
      }, 0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block text-left w-fit" ref={dropdownRef}>
      <div className="w-40">
        {/*show, setShow need for open/close dropdown after click this button*/}
        <Button
          type="button"
          className={BUTTON_STYLE}
          aria-expanded="true"
          aria-haspopup="true"
          onClick={(ele) => setShow(!show)}
        >
          {buttonLabel}
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d={DROPDOWN_ICON} />
          </svg>
        </Button>
      </div>

      {show && (
        <div
          className={style && style.MENU}
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className={style && style.MENU_ITEMS}>
              {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
