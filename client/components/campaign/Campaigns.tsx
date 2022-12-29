import TableItem from "../Common/Table/TableItem";
import { TABLE_CELL_TYPE } from "../../../shared/common/constant";
import TableRow from "../Common/Table/TableRow";
import Table from "../Common/Table/Table";
import { CampaignInterface } from "../../../shared/modal/data/interface";
import Button from "../Common/Button/Button";
import { useRouter } from "next/router";

const TableHeaderRow = [
  { colName: "id" },
  { colName: "Campaign Address" },
  { colName: "" },
];

export default function Campaigns({
  campaigns,
}: {
  campaigns: CampaignInterface[];
}) {
  const router = useRouter();

  const renderCampaignsTableHeader = () => {
    const campaignsTableHeader = Array.from(TableHeaderRow, (header, index) => {
      return (
        <TableItem
          key={index}
          text={header.colName}
          type={TABLE_CELL_TYPE.COL_HEADER}
        />
      );
    });
    return <TableRow>{campaignsTableHeader}</TableRow>;
  };

  const viewCampaign = (id: string) => {
    router.push(`/campaigns/${id}`);
  };

  const renderCampaignsTableBody = () => {
    return campaigns.map((campaign, index) => {
      return (
        <TableRow key={campaign.id}>
          <TableItem text={campaign.id} type={TABLE_CELL_TYPE.ROW_HEADER} />
          <TableItem text={campaign.campaignAddress} />
          <TableItem
            type={TABLE_CELL_TYPE.FUNCTION_CELL}
            renderItem={() => {
              return (
                <Button
                  type="button"
                  label="View"
                  btnClassName="relative inline-flex items-center justify-center overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 focus:ring-4 focus:outline-none focus:ring-red-100"
                  btnDivClassName="relative m-2 group"
                  handleClick={() => viewCampaign(campaign.id)}
                />
              );
            }}
          />
        </TableRow>
      );
    });
  };

  const renderCampaignsTable = () => {
    return (
      <Table
        perPage={4}
        quantity={campaigns.length}
        HeaderChildren={renderCampaignsTableHeader()}
        BodyChildren={renderCampaignsTableBody()}
      />
    );
  };

  return <div className="campaigns_container">{renderCampaignsTable()}</div>;
}
