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

interface User {
  _id: string;
  name: string;
}

interface AddToGroupProps {}

const AddToGroup: FC<AddToGroupProps> = () => {
  const [groupChatName, setGroupChatName] = useState<string>("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");
  const [searchResult, setSearchResult] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const { user, chats, setChats, isDialogOpen, setIsDialogOpen } = ChatState();

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

  function handleGroup(user: User) {
    if (selectedUsers.includes(user)) {
      toast({
        title: "User Already added",
      });
      return;
    }
    setSelectedUsers([...selectedUsers, user]);
  }

  function handleUserRemove(user: User) {
    setSelectedUsers((prevUsers) =>
      prevUsers.filter((u) => u._id !== user._id)
    );
  }

  async function handleSubmit() {
    console.log(selectedUsers);
    const p = selectedUsers.map((u) => u._id);
    console.log(p);
    if (!groupChatName || !selectedUsers) {
      toast({
        title: "Please fill all details",
      });
      return;
    } else {
      try {
        console.log(selectedUsers);
        const response = await fetch("api/chats/group/", {
          method: "POST",
          body: JSON.stringify({
            groupname: groupChatName,
            users: selectedUsers.map((u) => u._id),
          }),
        });
        const data = await response.json();
        if (response.ok) {
          setChats([data, ...chats]);
          toast({
            title: "New Group Chat Created!",
          });
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
      setIsDialogOpen(false);
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
              {selectedUsers.map((user: User) => (
                <Badge key={user._id} className="m-1 p-3">
                  {user.name}{" "}
                  <X
                    onClick={() => handleUserRemove(user)}
                    className="h-4 pl-2 cursor-pointer"
                  />
                </Badge>
              ))}
            </div>
            {loading ? (
              <Loader2 className="animate-spin" />
            ) : (
              searchResult?.slice(0, 4).map((user: User) => (
                <Badge
                  className="m-1 mt-3 p-4 "
                  key={user._id}
                  variant={"outline"}
                >
                  {user.name}
                  <PlusIcon
                    onClick={() => handleGroup(user)}
                    className="h-4 pl-2 cursor-pointer"
                  />
                </Badge>
              ))
            )}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {loading ? (
            <Button onClick={handleSubmit}>
              <Loader2 className="animate-spin" />
              Please Wait.
            </Button>
          ) : (
            <Button onClick={handleSubmit}>Create the Group</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddToGroup;
