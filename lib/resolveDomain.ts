const resolvePBDomain = (): String | any => {
  return process.env.POCKETBASE_DOMAIN;
};

export { resolvePBDomain };
