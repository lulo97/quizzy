import { CATEGORIES, flattenText } from "../../components/create-quiz/Utils";
import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Category } from "../../interfaces/CreateQuizInterfaces";
import Dropdown from "../../components/ui/MyDropdown";

const style = {
  //Flex-row for 3 column
  MENU_ITEMS: "flex flex-row items-start justify-center gap-1 w-full p-1",
  //w-fit for fit 3 column
  MENU: "absolute z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
}

interface CategoryMenuItemsProps {
  items: Category[];
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>,
}

const CategoryMenuItems: React.FC<CategoryMenuItemsProps> = ({ 
  items, 
  show, 
  setShow,
  }) => (
  <div className="py-1" role="none">
    {items.map((item, index) => (
      <Link
        key={index}
        href={`/category/${flattenText(item.value)}`}
        className="hover:bg-gray-100 rounded-md text-gray-700 block px-4 py-2 text-sm whitespace-nowrap"
        onClick={(ele) => setShow(!show)}
      >
        {item.label}
      </Link>
    ))}
  </div>
);

const CategoryDropdown: React.FC = () => {
  const columns = 3;
  const itemsPerColumn = Math.ceil(CATEGORIES.length / columns);

  const columnsArray = new Array(columns)
    .fill(null)
    .map((_, columnIndex) =>
      CATEGORIES.slice(
        columnIndex * itemsPerColumn,
        (columnIndex + 1) * itemsPerColumn
      )
    );

  const [show, setShow] = useState<boolean>(false);

  return (
    <Dropdown 
      buttonLabel="Category"
      style={style}
      show={show}
      setShow={setShow}
    >
      {columnsArray.map((column, columnIndex) => (
        <CategoryMenuItems 
        key={columnIndex} 
        items={column} 
        show={show} 
        setShow={setShow} 
        />
      ))}
    </Dropdown>
  );
};

export default CategoryDropdown;
