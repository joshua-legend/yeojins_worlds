"use client";

import { useNicknameStore } from "@/store/useNicknameStore";
import NicknameInputForm from "@/components/user/nickname-input/NicknameInputForm";
import NicknameDisplay from "@/components/user/nickname-display/NicknameDisplay";

export default function NicknameSetup() {
  const currentNickname = useNicknameStore((state) => state.currentNickname);
  return currentNickname ? <NicknameDisplay /> : <NicknameInputForm />;
}
