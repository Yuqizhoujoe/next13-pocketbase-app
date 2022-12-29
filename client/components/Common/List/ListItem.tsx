import { ListItemInterface } from "../../../../shared/modal/Common/interface";
import Link from "next/link";

const ListItem = (props: ListItemInterface) => {
  const { content, link, anchorClassName, listItemClassName } = props;

  return (
    <li className={listItemClassName}>
      <Link href={link}>
        <a
          className={anchorClassName}
          data-mdb-ripple="true"
          data-mdb-ripple-color="light"
        >
          {content}
        </a>
      </Link>
    </li>
  );
};

export default ListItem;
