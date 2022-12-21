import { TableRowInterface } from "../../../shared/modal/Common/interface";
import { handleCss } from "../../../shared/helper";

const defaultTableRowCss =
  "bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600";

const TableRow = (props: TableRowInterface) => {
  const { children, className } = props;
  return (
    <tr className={handleCss(defaultTableRowCss, className)}>{children}</tr>
  );
};

export default TableRow;
