import { TableItemInterface } from "../../../shared/modal/Common/interface";
import { TABLE_CELL_TYPE } from "../../../shared/common/constant";
import Button from "@/components/Common/Button/Button";
import { handleCss } from "../../../shared/helper";

const defaultTableCellCss = "py-4 px-6";

const TableItem = (props: TableItemInterface) => {
  const { text, type, onClick, imageUrl, imageCss, tableCellCss } = props;

  const renderTableCell = () => {
    switch (type) {
      case TABLE_CELL_TYPE.COL_HEADER:
        return (
          <th scope="col" className="py-3 px-6">
            {text}
          </th>
        );
      case TABLE_CELL_TYPE.ROW_HEADER:
        return (
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {text}
          </th>
        );
      case TABLE_CELL_TYPE.FUNCTION_CELL:
        return (
          <td className="px-6">
            <Button
              type="button"
              label={text}
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
