import React, { FC, useState } from "react";
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
import { Loader2, Plus, PlusIcon, ShieldCloseIcon, X } from "lucide-react";
import { Input } from "./ui/input";
import { useToast } from "./ui/use-toast";
import { ChatState } from "@/context/chat-provider";
import { Badge } from "./ui/badge";

interface AddToGroupProps {}

const AddToGroup: FC<AddToGroupProps> = () => {
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const { user, chats, setChats } = ChatState();

  async function handleSearch(query: string) {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`api/users/search?search=${query}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResult(data.message);
      } else {
        toast({
          title: data.message,
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
    setLoading(false);
  }

  function handleGroup(user) {
    if (selectedUsers.includes(user)) {
      toast({
        title: "User Already added",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  }

  function handleUserRemove(user: any) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((u) => u._id !== user._id)
    );
  }

  async function handleSubmit() {
    if (!groupChatName || selectedUsers.length === 0) {
      toast({
        title: "Please fill all details",
      });
    } else {
      // Perform the actual chat creation logic here
    }
  }

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
            <Input
              placeholder="Your Group Chat Name"
              className="mt-2"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
            <Input
              placeholder="Add users"
              className="mt-3"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
            <div className="w-full flex flex-wrap mt-3">
              {selectedUsers.map((user) => ( 
                <Badge key={user._id} className="m-1 p-3">
                  {user.name} <X onClick={() => handleUserRemove(user)} className="h-4 pl-2 cursor-pointer" />
                </Badge>
              ))}
            </div>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (searchResult?.slice(0, 4).map((user) => (
                <Badge
                  className="m-1 mt-3 p-4 "
                  key={user._id}
                  variant={"outline"}
                >
                  {user.name}
                  <PlusIcon onClick={() => handleGroup(user)} className="h-4 pl-2 cursor-pointer" />
                </Badge>
              ))
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={handleSubmit}>Create the Chat</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToGroup;
