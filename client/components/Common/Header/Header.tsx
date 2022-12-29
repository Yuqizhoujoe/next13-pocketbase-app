import List from "../List/List";
import ListItem from "../List/ListItem";
import { useRouter } from "next/router";
import { isNFTCampaignRoute, isNFTRoute } from "../../../../lib/helper";
import _ from "lodash";

const headerAnchorCss =
  "nav-link block p-2 text-gray-700 hover:text-sky-200 hover:cursor-pointer focus:text-amber-400 transition duration-150 ease-in-out";
const headerListItemCss = "nav-item";

const Header = () => {
  const router = useRouter();
  const pathname = _.get(router, "pathname", "");

  const createNFTOrCreateEditCampaign = (): any => {
    if (isNFTCampaignRoute(pathname)) {
      return (
        <ListItem
          link={`${router.asPath}/create`}
          content="Create NFT"
          anchorClassName={headerAnchorCss}
          listItemClassName={headerListItemCss}
        />
      );
    }

    if (!isNFTRoute(pathname)) {
      return (
        <ListItem
          link="/campaigns/create"
          content="Create Campaign"
          anchorClassName={headerAnchorCss}
          listItemClassName={headerListItemCss}
        />
      );
    }

    return null;
  };

  return (
    <header className="header_container">
      <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white dark:bg-black relative flex items-center w-full justify-between">
        <div className="px-6 w-full flex items-center justify-between">
          <div
            className="navbar-collapse collapse grow items-center"
            id="navbarSupportedContentY"
          >
            <List className="navbar-nav mr-auto flex justify-center">
              <ListItem
                link="/"
                content="Home"
                anchorClassName={headerAnchorCss}
                listItemClassName={headerListItemCss}
              />
              {createNFTOrCreateEditCampaign()}
            </List>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
