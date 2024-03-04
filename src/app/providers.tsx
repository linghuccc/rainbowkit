import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { connectorsForWallets } from '@rainbow-me/rainbowkit'
import {
	rainbowWallet,
	walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets'
import { createConfig, http } from '@wagmi/core'
import { mainnet, sepolia } from '@wagmi/core/chains'

const connectors = connectorsForWallets(
	[
		{
			groupName: 'Recommended',
			wallets: [rainbowWallet, walletConnectWallet],
		},
	],
	{
		appName: 'My RainbowKit App',
		projectId: 'YOUR_PROJECT_ID',
	}
)

const config = createConfig({
	chains: [mainnet, sepolia],
	connectors,
	transports: {
		[mainnet.id]: http('https://mainnet.example.com'),
		[sepolia.id]: http('https://sepolia.example.com'),
	},
})

export default function Providers({ children }: { children: ReactNode }) {
	const queryClient = new QueryClient()

	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>
				<RainbowKitProvider>{children}</RainbowKitProvider>
			</QueryClientProvider>
		</WagmiProvider>
	)
}
