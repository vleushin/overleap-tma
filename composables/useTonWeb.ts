import TonWeb from "tonweb";

interface useTonWebState {
  tonWeb: TonWeb;
}

export const useTonWeb = (): useTonWebState => {
  const tonWeb = new TonWeb();

  return { tonWeb };
};
