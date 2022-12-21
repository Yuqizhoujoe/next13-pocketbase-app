const Emoji = ({ happy }: { happy: boolean }) => {
  if (happy) return <span>😊</span>;

  return <span>😭</span>;
};

export default Emoji;
