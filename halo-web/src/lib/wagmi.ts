import { defaultWagmiConfig } from '@web3modal/wagmi/react/config';
import { bscTestnet, bsc } from 'wagmi/chains';

export const projectId = '3b8ed871aa9da08b26e0b7fe697aa623'; // Public demo project ID

if (!projectId) {
    throw new Error('Web3Modal Project ID is not defined');
}

const metadata = {
    name: 'H.A.L.O Vault',
    description: 'Hedged Asset Liquidity Optimizer',
    url: 'https://halovault.app', // update this later
    icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const config = defaultWagmiConfig({
    chains: [bscTestnet, bsc], // Default to testnet as per instructions
    projectId,
    metadata,
    enableInjected: true,
    enableCoinbase: true,
    enableWalletConnect: true,
    enableEIP6963: true,
});
