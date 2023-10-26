const { version } = require("../package.json");
const mainnet = require("./tokens/mainnet.json");
const nile = require("./tokens/nile.json");
const { toChecksumAddress } = require("ethereum-checksum-address");

module.exports = function buildList() {
  const parsed = version.split(".");
  return {
    name: "TofuSwap Tokens",
    timestamp: new Date().toISOString(),
    version: {
      major: +parsed[0],
      minor: +parsed[1],
      patch: +parsed[2],
    },
    tags: {},
    logoURI:
      "https://static.tronscan.org/production/upload/logo/TTgnhmov3ezeUGxnfDdjvDt4WhNXDUD3bT.png",
    keywords: ["tofu", "tofuswap", "tofudefi", "default"],
    tokens: [...mainnet, ...nile]
      // sort them by symbol for easy readability
      .sort((t1, t2) => {
        if (t1.chainId === t2.chainId) {
          return t1.symbol.toLowerCase() < t2.symbol.toLowerCase() ? -1 : 1;
        }
        return t1.chainId < t2.chainId ? -1 : 1;
      })
      .map((t) => ({
        ...t,
        address: toChecksumAddress(t.address),
      })),
  };
};
