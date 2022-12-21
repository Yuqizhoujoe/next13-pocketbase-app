import List from "@/components/Common/List/List";
import ListItem from "@/components/Common/List/ListItem";

const footerListCss =
  "flex flex-wrap items-center mt-3 text-sm text-gray-500 dark:text-gray-400 sm:mt-0";
const footerAnchorCss = "mr-4 hover:underline md:mr-6";

const Footer = () => {
  return (
    <footer className="sticky bottom-0 left-0 z-20 p-4 w-full bg-white border-t border-gray-200 shadow flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
      <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
        © 2022 <a className="hover:underline">DamnJoeJoe</a>. All Rights
        Reserved.
      </span>
      <List className={footerListCss}>
        <ListItem content="About" link="/" anchorClassName={footerAnchorCss} />
        <ListItem
          content="Anything"
          link="/"
          anchorClassName={footerAnchorCss}
        />
        <ListItem content="WTF" link="/" anchorClassName={footerAnchorCss} />
      </List>
    </footer>
  );
};

export default Footer;
