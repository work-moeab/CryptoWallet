// src/config/chains.ts
export const CHAINS_CONFIG = {
    ethereum: {
      chainId: 1,
      blockchain: "ethereum",
      provider: "https://mainnet.gateway.tenderly.co/YOUR_KEY",
      bundlerUrl: "https://api.candide.dev/public/v3/ethereum",
      paymasterUrl: "https://api.candide.dev/public/v3/ethereum",
      paymasterAddress: "0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba",
      entrypointAddress: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      transferMaxFee: 5000000,
      swapMaxFee: 5000000,
      bridgeMaxFee: 5000000,
      paymasterToken: {
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // USDT
      },
    },
    polygon: {
      chainId: 137,
      blockchain: "polygon",
      provider: "https://polygon.gateway.tenderly.co/YOUR_KEY",
      bundlerUrl: "https://api.candide.dev/public/v3/polygon",
      paymasterUrl: "https://api.candide.dev/public/v3/polygon",
      paymasterAddress: "0x8b1f6cb5d062aa2ce8d581942bbb960420d875ba",
      entrypointAddress: "0x0000000071727De22E5E9d8BAf0edAc6f37da032",
      transferMaxFee: 5000000,
      swapMaxFee: 5000000,
      bridgeMaxFee: 5000000,
      paymasterToken: {
        address: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", // USDT on Polygon
      },
      safeModulesVersion: "0.3.0",
    },
    bitcoin: {
      host: "api.ordimint.com",
      port: 50001,
    },
  };