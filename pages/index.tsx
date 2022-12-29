import { GetServerSidePropsContext } from "next";
import TableIcon from "../client/components/Common/Icon/TableIcon";
import FormIcon from "../client/components/Common/Icon/FormIcon";
import Link from "next/link";
import { CampaignInterface } from "../shared/modal/data/interface";
import { fetchAllCampaigns } from "../server/pb/query/campaigns";
import { parseJSONAPIObject } from "../lib/helper";
import Campaigns from "../client/components/campaign/Campaigns";

export default function Home({
  campaigns,
}: {
  campaigns: CampaignInterface[];
}) {
  const renderDemoLink = () => {
    return (
      <div className="w-48 text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <Link href="/table">
          <button
            type="button"
            className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium rounded-t-lg border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <TableIcon />
            <span className="ml-2">Table</span>
          </button>
        </Link>
        <Link href="/form">
          <button
            type="button"
            className="inline-flex relative items-center py-2 px-4 w-full text-sm font-medium border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white"
          >
            <FormIcon />
            <span className="ml-2">Form</span>
          </button>
        </Link>
      </div>
    );
  };

  return (
    <div className="h-screen">
      <Campaigns campaigns={campaigns} />
    </div>
  );
}

export async function getStaticProps(context: GetServerSidePropsContext) {
  console.log("Home page");
  const response = await fetchAllCampaigns();
  const campaigns = parseJSONAPIObject(response);
  console.log("campaigns response", campaigns);

  return {
    props: {
      campaigns,
    },
  };
}
