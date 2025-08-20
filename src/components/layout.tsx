import { useLocation, Link } from "react-router";
import { Outlet } from "react-router";
import { Toaster } from "./ui/sonner";

export const Layout = () => {
   const isInventoryPage = useLocation().pathname.includes("/inventory");

   return (
      <>
         <main>
            <header className="h-44 bg-cyan-100 flex gap-3 items-center justify-between flex-wrap">
               <div className="flex flex-col gap-3 items-start justify-center">
                  {!isInventoryPage ? (
                     <>
                        <h1 className="text-2xl font-semibold">
                           Shady Corporation
                        </h1>
                        <div>
                           <p className="text-lg">Job Application</p>
                           <p className="text-sm">
                              Frontend Development / Full Time / WFO
                           </p>
                        </div>
                     </>
                  ) : (
                     <h1 className="text-2xl font-semibold">Inventory</h1>
                  )}
                  <Link
                     to={isInventoryPage ? "/" : "/inventory"}
                     className="text-blue-500"
                  >
                     {isInventoryPage ? "Go to Application" : "Go to Inventory"}
                  </Link>
               </div>
            </header>
            <div className="min-h-screen">
               <Outlet />
            </div>
            <footer className="h-44 bg-cyan-100 flex flex-col gap-3 items-center justify-center">
               <p>Built by Akhil Panwar</p>
            </footer>
         </main>
         <Toaster />
      </>
   );
};
