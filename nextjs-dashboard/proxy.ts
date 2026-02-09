import { paymentProxy } from "@x402/next";
import { x402ResourceServer, HTTPFacilitatorClient } from "@x402/core/server";
import { registerExactEvmScheme } from "@x402/evm/exact/server";
import { registerExactSvmScheme } from "@x402/svm/exact/server";
import { createPaywall } from "@x402/paywall";
import { evmPaywall } from "@x402/paywall/evm";
import { svmPaywall } from "@x402/paywall/svm";
import { declareDiscoveryExtension } from "@x402/extensions/bazaar";

export const facilitatorUrl = process.env.FACILITATOR_URL;
export const evmAddress = process.env.RESOURCE_EVM_ADDRESS || "";
export const svmAddress = "0xsol";

// if (!facilitatorUrl) {
//   console.error("❌ FACILITATOR_URL environment variable is required");
//   process.exit(1);
// }

// if (!evmAddress || !svmAddress) {
//   console.error(
//     "❌ EVM_ADDRESS and SVM_ADDRESS environment variables are required",
//   );
//   process.exit(1);
// }

// Create HTTP facilitator client
const facilitatorClient = new HTTPFacilitatorClient({ url: facilitatorUrl });

// Create x402 resource server
export const server = new x402ResourceServer(facilitatorClient);

// Register schemes
registerExactEvmScheme(server);
registerExactSvmScheme(server);

// Build paywall
export const paywall = createPaywall()
  .withNetwork(evmPaywall)
  .withNetwork(svmPaywall)
  .withConfig({
    appName: process.env.APP_NAME || "Next x402 Demo",
    appLogo: process.env.APP_LOGO || "/x402-icon-blue.png",
    testnet: true,
  })
  .build();

export const proxy = paymentProxy(
  {
    "/api/protected": {
      accepts: [
        {
          scheme: "exact",
          price: "$0.01",
          network: "eip155:84532", // base-sepolia
          payTo: evmAddress,
        },
        {
          scheme: "exact",
          price: "$0.01",
          network: "solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1", // solana devnet
          payTo: svmAddress,
        },
      ],
      description: "Premium music: x402 Remix",
      mimeType: "application/json",
      extensions: {
        ...declareDiscoveryExtension({}),
      },
    },
  },
  server,
  undefined, // paywallConfig (using custom paywall instead)
  paywall, // custom paywall provider
);

// Configure which paths the proxy should run on
export const config = {
  matcher: ["/api/protected/:path*"],
};
