import Table from "../client/components/Common/Table/Table";
import TableRow from "../client/components/Common/Table/TableRow";
import TableItem from "../client/components/Common/Table/TableItem";
import { TABLE_CELL_TYPE } from "../shared/common/constant";
import BackButton from "../client/components/Common/Button/BackButton";

const TableHeaderRow = [
  { colName: "Name" },
  { colName: "Age" },
  { colName: "Asset" },
  { colName: "" },
];

const dummyTableData = [
  { name: "yuqi", age: 27, asset: 1000 },
  { name: "jojo", age: 28, asset: 2000 },
  { name: "damnjojo", age: 30, asset: 8080 },
  { name: "haha", age: 20, asset: 500 },
];

export default function () {
  const renderRequestTableHeader = () => {
    return (
      <TableRow className="">
        {TableHeaderRow.map((header, index) => (
          <TableItem
            key={index}
            text={header.colName}
            type={TABLE_CELL_TYPE.COL_HEADER}
          />
        ))}
      </TableRow>
    );
  };

  const renderRequestTableBody = () => {
    return dummyTableData.map((row, index) => {
      return (
        <TableRow key={index}>
          <TableItem text={row.name} type={TABLE_CELL_TYPE.ROW_HEADER} />
          <TableItem text={row.age.toString()} />
          <TableItem text={row.asset.toString()} />
          <TableItem text="View" type={TABLE_CELL_TYPE.FUNCTION_CELL} />
        </TableRow>
      );
    });
  };

  return (
    <div className="table_container h-screen w-1/2">
      <BackButton />
      <Table
        perPage={4}
        quantity={dummyTableData.length}
        HeaderChildren={renderRequestTableHeader()}
        BodyChildren={renderRequestTableBody()}
      />
    </div>
  );
}
