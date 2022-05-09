import create from 'zustand';

const useStore = create((set) => ({
  currentVideoInfo: { videoTitle: 'Yellow Claw presents The OG Trap Set Part 1', videoId: '_Aw0aSzJAcg' },
  setCurrentVideoInfo: (currentVideoInfo) => set({ currentVideoInfo }),
}));


export default useStore;