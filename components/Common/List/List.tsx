import { ListInterface } from "../../../shared/modal/Common/interface";

const List = (props: ListInterface) => {
  const { className, children: listChildren } = props;

  return <ul className={className}>{listChildren}</ul>;
};

export default List;
