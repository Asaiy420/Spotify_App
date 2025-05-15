import { SignedOut } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignedInOAuthButton from "./SignedInOAuthButton";

const Topbar = () => {
    const isAdmin = false;
  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md">Topbar
        <div className="flex gap-2 items-center">
            Spotify
        </div>
        <div className="fkex items-center gap-4">
            {isAdmin && (
                <Link to="/admin">
                    <LayoutDashboardIcon className="size-4 mr-2"/>
                    Admin Dashboard
                </Link>
            )}

            <SignedOut>
               <SignedInOAuthButton/>
            </SignedOut>
        </div>
    </div>
  )
}

export default Topbar