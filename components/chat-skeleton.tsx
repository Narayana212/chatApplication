import { FC } from "react";
import { Skeleton } from "./ui/skeleton";

interface ChatSkeletonProps {}

interface SkeletonDummy {
  id: number;
}

const ARRAY_SKELETON: SkeletonDummy[] = [
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
  { id: 6 },
  { id: 7 },
  { id: 8 },
  { id: 9 },
  { id: 10 },
  { id: 11 },
];

const ChatSkeleton: FC<ChatSkeletonProps> = () => {
  return (
    <div className="h-auto mt-2">
      {ARRAY_SKELETON.map((array: SkeletonDummy) => (
        <Skeleton className="px-3 h-10 py-2 mt-2 border rounded-lg " key={array.id} />
      ))}
    </div>
  );
};

export default ChatSkeleton;
