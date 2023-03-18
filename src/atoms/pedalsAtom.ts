import { atom } from "recoil";
import { Timestamp } from "firebase/firestore";

export type Pedal = {
  id?: string;
  creatorId: string;
  creatorDisplayName: string;
  title: string;
  company: string;
  companyURL: string;
  image: string;
  effectType: string;
  rating: number;
  ratingCount: number;
  createdAt: Timestamp;
};

interface PedalState {
  selectedPedal: Pedal | null;
  pedals: Pedal[];
}

const defaultPedalState: PedalState = {
  selectedPedal: null,
  pedals: [],
};

export const pedalState = atom<PedalState>({
  key: "pedalState",
  default: defaultPedalState,
});
