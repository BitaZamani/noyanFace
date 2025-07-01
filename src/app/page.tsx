"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type faceType = {
  emoji: string | null;
  locked: boolean;
};

export default function Face() {
  const [disabled, setDisabled] = useState(false);
  const [resetActive, setResetActive] = useState(false);
  const [lockState, setLockState] = useState(false);
  const [randEye, setRandEye] = useState<faceType>({
    emoji: null,
    locked: false,
  });
  const [randNose, setRandNose] = useState<faceType>({
    emoji: null,
    locked: false,
  });
  const [randMouth, setRandMouth] = useState<faceType>({
    emoji: null,
    locked: false,
  });
  const svgs = {
    lock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${
          lockState
            ? "text-black cursor-pointer"
            : "text-gray-700/30 cursor-not-allowed"
        }`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z" />
        <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M8 11v-4a4 4 0 1 1 8 0v4" />
      </svg>
    ),
    unLock: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`${
          lockState
            ? "text-black cursor-pointer"
            : "text-gray-700/30 cursor-not-allowed"
        }`}
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M3 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z" />
        <path d="M9 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0" />
        <path d="M13 11v-4a4 4 0 1 1 8 0v4" />
      </svg>
    ),
  };
  const selectableEmojies = {
    eyes: ["👀", "😎", "🤓", "🧐", "👁️"],
    nose: ["👃", "🐽", "👃🏻", "👃🏽", "🤥"],
    mouth: ["👄", "😁", "😬", "😗", "😛"],
  };

  const router = useRouter();
  const url = new URLSearchParams();

  useEffect(() => {
    const param = new URLSearchParams(window.location.search);
    setRandEye({ emoji: param.get("eyes"), locked: false });
    setRandNose({ emoji: param.get("nose"), locked: false });
    setRandMouth({ emoji: param.get("mouth"), locked: false });
  }, []);

  useEffect(() => {
    if (randEye.locked && randNose.locked && randMouth.locked)
      setDisabled(true);
    else setDisabled(false);
  }, [randEye.locked, randNose.locked, randMouth.locked]);

  const getRandEmoji = (emojies: string[]) => {
    return emojies[Math.floor(Math.random() * emojies.length)];
  };

  const getEmojies = () => {
    if (!randEye.locked) {
      const randEye = getRandEmoji(selectableEmojies.eyes);
      setRandEye({
        locked: false,
        emoji: randEye,
      });
      url.append("eyes", randEye);
    } else {
      url.append("eyes", randEye.emoji!);
    }
    if (!randNose.locked) {
      const randNose = getRandEmoji(selectableEmojies.nose);
      setRandNose({
        locked: false,
        emoji: randNose,
      });
      url.append("nose", randNose);
    } else {
      url.append("nose", randNose.emoji!);
    }
    if (!randMouth.locked) {
      const randMouth = getRandEmoji(selectableEmojies.mouth);
      setRandMouth({
        locked: false,
        emoji: randMouth,
      });
      url.append("mouth", randMouth);
    } else {
      url.append("mouth", randMouth.emoji!);
    }
    router.push(`/?${url}`);
    setLockState(true);
    setResetActive(true);
  };

  const reset = () => {
    if (resetActive) {
      setRandEye({ emoji: null, locked: false });
      setRandNose({ emoji: null, locked: false });
      setRandMouth({ emoji: null, locked: false });
      setDisabled(false);
      setLockState(false);
      setResetActive(false);
      router.push("/");
    }
  };

  const lock = (
    setRandEmoji: React.Dispatch<React.SetStateAction<faceType>>,
    randEmoji: faceType
  ) => {
    if (randEmoji.emoji) {
      setRandEmoji({
        ...randEmoji,
        locked: !randEmoji.locked,
      });
    }
  };

  return (
    <div className="flex h-screen justify-center items-center flex-col bg-yellow-100">
      <div className="bg-yellow-400/35 rounded-md w-5/6 h-72 max-w-[450px] flex justify-between items-center flex-col drop-shadow-yellow-200 drop-shadow-xl relative">
        <span className="font-bold text-xl text-black text-shadow-2xs text-shadow-yellow-500 my-2">
          Create a funny face.
        </span>
        <div className="border rounded-full size-32 flex justify-center items-center flex-col gap-5">
          <div className="space-x-3.5">
            <span>{randEye.emoji}</span>
            <span>{randEye.emoji}</span>
          </div>
          <div>{randNose.emoji}</div>
          <div>{randMouth.emoji}</div>
        </div>
        <div className="absolute left-2 translate-y-1/2 bottom-1/2 space-x-0.5">
          <span onClick={() => lock(setRandEye, randEye)}>
            {randEye.locked ? svgs.lock : svgs.unLock}
          </span>
          <span onClick={() => lock(setRandNose, randNose)}>
            {randNose.locked ? svgs.lock : svgs.unLock}
          </span>
          <span onClick={() => lock(setRandMouth, randMouth)}>
            {randMouth.locked ? svgs.lock : svgs.unLock}
          </span>
        </div>
        <div className="space-x-10 my-2">
          <button
            disabled={disabled}
            onClick={getEmojies}
            className={`border  bg-amber-100 py-0.5 px-2 rounded-md  ${
              !disabled
                ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-amber-100 hover:border-amber-100 cursor-pointer"
                : "bg-gray-100 border-gray-400 text-gray-400 cursor-not-allowed"
            }`}
          >
            Create
          </button>
          <button
            onClick={reset}
            disabled={!resetActive}
            className={`border  bg-amber-100 py-0.5 px-2 rounded-md  ${
              resetActive
                ? "border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-amber-100 hover:border-amber-100 cursor-pointer"
                : "bg-gray-100 border-gray-400 text-gray-400 cursor-not-allowed"
            }`}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
