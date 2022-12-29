import { TableItemInterface } from "../../../../shared/modal/Common/interface";
import { TABLE_CELL_TYPE } from "../../../../shared/common/constant";
import Button from "../Button/Button";
import { handleCss } from "../../../../lib/helper";

const defaultTableCellCss = "py-4 px-6 text-center";

const TableItem = (props: TableItemInterface) => {
  const { text, type, renderItem, onClick, imageUrl, imageCss, tableCellCss } =
    props;

  const renderTableCell = () => {
    switch (type) {
      case TABLE_CELL_TYPE.COL_HEADER:
        return (
          <th scope="col" className="py-3 px-6 text-center">
            {text}
          </th>
        );
      case TABLE_CELL_TYPE.ROW_HEADER:
        return (
          <th
            scope="row"
            className="py-4 px-6 text-center font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {text}
          </th>
        );
      case TABLE_CELL_TYPE.FUNCTION_CELL:
        if (renderItem && typeof renderItem === "function") {
          return <td>{renderItem()}</td>;
        }

        return (
          <td>
            <Button
              type="button"
              label={text ? text : "View"}
              handleClick={onClick}
              btnDivClassName="relative z-0 m-3 group"
            />
          </td>
        );
      case TABLE_CELL_TYPE.IMAGE_CELL:
        return (
          <td className="py-6 px-6">
            <img src={imageUrl} alt={text} className={imageCss} />
          </td>
        );
      default:
        return (
          <td className={handleCss(defaultTableCellCss, tableCellCss)}>
            {text}
          </td>
        );
    }
  };

  return renderTableCell();
};

export default TableItem;
