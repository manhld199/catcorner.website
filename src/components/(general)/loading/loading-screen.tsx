import { useThemeColor } from "@/hooks/useThemeColor";
import BeatLoader from "react-spinners/BeatLoader";

export function LoadingScreen() {
  const color = useThemeColor('pri-1');

  return (
    <div className="h-screen flex items-center justify-center">
      <BeatLoader color={color}/>
    </div>
  );
} 