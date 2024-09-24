import { atom, useAtom } from "jotai"

const modalState = atom(false)

export const UseCreateChannelModal = () => {
  return useAtom(modalState)
}