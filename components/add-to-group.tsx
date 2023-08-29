import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { Input } from "./ui/input";

interface AddToGroupProps {}

const AddToGroup: FC<AddToGroupProps> = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Plus />
          New Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Group Chat</DialogTitle>
          <DialogDescription>
            <Input placeholder="Your Group Chat Name" className="mt-2" />
            <Input placeholder="Add users" className="mt-3" />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Create the Chat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToGroup;
