import { DataGrid } from "@mui/x-data-grid";
import { DataTableInterface } from "../../../../shared/modal/Common/interface";

const rowsPerPage = 5;

const DataTable = (props: DataTableInterface) => {
  const { cols, rows } = props;

  const pageSize = Math.ceil(rows.length / rowsPerPage);

  return (
    <div className="h-96 w-full text-center">
      <DataGrid
        columns={cols}
        rows={rows}
        pageSize={pageSize}
        rowsPerPageOptions={[rowsPerPage]}
        autoHeight
      />
    </div>
  );
};

export default DataTable;
