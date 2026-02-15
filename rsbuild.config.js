import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default {
    plugins: [
        pluginModuleFederation({
            name: 'dashboard',
            exposes: {
                './export-app': './src/export-app.tsx'
            },
            bridge: {
                enableBridgeRouter: true,
            }
        }),
    ],
};