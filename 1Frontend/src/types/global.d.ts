declare global {
    interface Window {
        ethereum: import('ethers').providers.ExternalProvider;
       
    }
}

// src/global.d.ts
export {};


