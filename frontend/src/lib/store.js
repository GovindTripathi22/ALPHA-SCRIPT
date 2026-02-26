import { create } from 'zustand';

const useStore = create((set) => ({
    // SSE Network State
    networkData: { nodes: [], edges: [], systemState: 'NORMAL' },
    setNetworkData: (data) => set({ networkData: data }),

    // Dispatch Report State
    dispatchTriggered: false,
    dispatchReport: null,
    setDispatchReport: (report) => set({
        dispatchTriggered: !!report,
        dispatchReport: report
    }),
}));

export default useStore;
