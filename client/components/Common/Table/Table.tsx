import { TableInterface } from "../../../../shared/modal/Common/interface";
import Arrow from "../Icon/Arrow";
import { ARROW_DIRECTION } from "../../../../shared/common/constant";
import { useState } from "react";

const Table = (props: TableInterface) => {
  const { HeaderChildren, BodyChildren, quantity, perPage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const page = Math.ceil(quantity / perPage);
  const isLastPage = currentPage === page;
  const isFirstPage = currentPage === 1;

  const leftArrowClick = () => {
    if (isFirstPage) return;
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const rightArrowClick = () => {
    if (isLastPage) return;
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const renderBodyChildrenByPage = () => {
    if (Array.isArray(BodyChildren)) {
      const start = (currentPage - 1) * perPage;
      const end = start + perPage;
      return BodyChildren.slice(start, end);
    }

    return BodyChildren;
  };

  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          {HeaderChildren}
        </thead>
        <tbody>{renderBodyChildrenByPage()}</tbody>
      </table>
      <div className="flex justify-evenly items-center bg-slate-50">
        <Arrow
          onClick={leftArrowClick}
          className="left_arrow p-2 text-gray-300 rounded-full hover:scale-75 hover:cursor-pointer"
          direction={ARROW_DIRECTION.LETF}
        />
        <p className="page_content text-xs text-gray-300">
          {currentPage} / {page}
        </p>
        <Arrow
          onClick={rightArrowClick}
          className="left_arrow p-2 text-gray-300 rounded-full hover:scale-75 hover:cursor-pointer"
          direction={ARROW_DIRECTION.RIGHT}
        />
      </div>
    </div>
  );
};

export default Table;
