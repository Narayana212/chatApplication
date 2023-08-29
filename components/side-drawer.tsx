"use client";
import { FC, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Input } from "./ui/input";
import { Loader2, Search, X } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { useToast } from "./ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { ChatState } from "@/context/chat-provider";

interface Card {
  _id: number;
  name: string;
  pic?: string;
  email: string;
}

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => {
  const {
    setSelectedChat,
    chats = [],
    setChats,
    isOpen,
    setIsOpen,
  } = ChatState();
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const { toast } = useToast();
  async function handleSearch() {
    try {
      setLoading(true);
      const response = await fetch(`api/users/search?search=${search}`);
      const data = await response.json();
      if (response.status) {
        setUsers(data.message);
        toast({
          title: "Users displayed successfully",
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
    setLoading(false);
    setSearch("");
  }

  async function accessChats(userId: number) {
    console.log(userId);
    try {
      const response = await fetch("api/chats/single", {
        method: "POST",
        body: JSON.stringify({ userId: userId }),
      });
      const data1 = await response.json();
      if (response.ok) {
        const data = data1.message;
        console.log(data);
        if (!chats.find((c: any) => c._id === data._id)) {
          setChats([data, ...chats]);
        }
        setSelectedChat(data);
      } else {
        toast({
          title: data1.message,
        });
      }
    } catch (error: any) {
      toast({
        title: error.message,
      });
    }
  }

  const toggleSheet = () => {
    setIsOpen((prevIsOpen: boolean) => !prevIsOpen);
  };
  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <>
      <Sheet open={isOpen}>
        <SheetTrigger onClick={toggleSheet}>
          <div className="flex gap-2 items-center px-3">
            <Input
              className="cursor-pointer outline-none focus:outline-0"
              placeholder="Search Users to Chat"
            />
            <Button variant={"outline"}>
              <Search />
            </Button>
          </div>
        </SheetTrigger>
        <SheetContent className="w-screen overflow-x-scroll" side={"left"}>
          <SheetHeader>
            <div
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary cursor-pointer"
              onClick={closeSheet}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </div>

            <SheetTitle className="pt-7 flex items-center gap-5">
              <Input
                className="outline-none focus:outline-0"
                placeholder="Search Users to Chat"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
              <Button variant={"outline"} onClick={handleSearch}>
                <Search />
              </Button>
            </SheetTitle>
          </SheetHeader>
          {loading ? (
            <SheetDescription className="flex items-center justify-center">
              <Loader2 className="animate-spin" />
            </SheetDescription>
          ) : (
            <SheetDescription className="flex flex-col justify-center">
              {users.length === 0 ? (
                <h1 className="mt-10  ml-8 lg:ml-28">No Users </h1>
              ) : (
                users.map((user: Card) => (
                  <Card
                    className="mt-5 shadow flex items-center cursor-pointer hover:bg-primary  transition-all  hover:text-primary-foreground "
                    key={user._id}
                    onClick={() =>{
                      accessChats(user._id)
                      closeSheet()
                    }}
                  >
                    <CardHeader>
                      <Avatar>
                        <AvatarImage src={user.pic} />
                        <AvatarFallback>{user.name[0]}</AvatarFallback>
                      </Avatar>
                    </CardHeader>
                    <CardContent className="w-full">
                      <CardDescription className="w-full  h-full text-2xl mt-5">
                        <h1>{user.name}</h1>
                        <p className="text-sm ">Email: {user.email}</p>
                      </CardDescription>
                    </CardContent>
                  </Card>
                ))
              )}
            </SheetDescription>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default SideBar;
