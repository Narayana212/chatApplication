"use client";
import React, { FC, useState } from "react";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Loader2, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";

interface NavbarProps {
  isLogin: boolean;
}

const Navbar: FC<NavbarProps> = ({ isLogin }) => {
  const [loading, setLoading] = useState(false);
  const router=useRouter()
  const {toast}=useToast()
  async function handleLogout(){
    try {
      setLoading(true)
      await fetch("/api/auth/logout");
      toast({
        title:"Logout successfully"

      })
      router.push("/login");
    } catch (error:any) {
      console.error(error.message);
    }
    setLoading(false)

  }
  return (
    <div className="w-screen  flex items-center px-12 py-5 justify-between border">
      <Link href="/" className="font-bold text-3xl">
        CHAT.it
      </Link>
      {isLogin ? (
        <div className=" hidden lg:flex items-center gap-3">
          <Button onClick={handleLogout}>
            {loading?<><Loader2 className="animate-spin"/>Please Wait</>:"Logout"}
          </Button>
          <ModeToggle />
        </div>
      ) : (
        <div className=" hidden lg:flex items-center gap-3">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
          <Link href="/signup">
            <Button>Sign Up</Button>
          </Link>
          <ModeToggle />
        </div>
      )}
      <div className="flex lg:hidden items-center gap-5">
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isLogin ? (
              <>
                <DropdownMenuLabel>
                  <p className="cursor-pointer" onClick={handleLogout}>Logout</p>
                </DropdownMenuLabel>
              </>
            ) : (
              <>
                <DropdownMenuLabel>
                  <Link href="/login">Login</Link>
                </DropdownMenuLabel>
                <DropdownMenuLabel>
                  <Link href="/signup">Sign up</Link>
                </DropdownMenuLabel>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
