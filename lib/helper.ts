export const handleCss = (defaultCss: string, className?: string) => {
  if (className) return className;
  return defaultCss;
};

export const checkFunctionType = (f: any) => {
  return f && typeof f === "function";
};

export const parseJSONAPIObject = (obj: any) => JSON.parse(JSON.stringify(obj));

export function formatCurrency(price?: number) {
  if (!price) return;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return formatter.format(price);
}

export const isValidUrl = (urlString: string) => {
  try {
    return Boolean(new URL(urlString));
  } catch (e) {
    return false;
  }
};

export const isNFTCampaignRoute = (pathname: string) => {
  return pathname.includes("/nfts/campaign");
};

export const isNFTRoute = (pathname: string) => {
  return pathname.includes("/nfts");
};
