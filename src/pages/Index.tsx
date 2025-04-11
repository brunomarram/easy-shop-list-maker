
import { useState } from "react";
import { SidebarProvider, Sidebar, SidebarContent, SidebarTrigger, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { ShoppingCart, List, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import SavedLists from "@/components/SavedLists";
import ShoppingList from "@/components/ShoppingList";

const Index = () => {
  const [activeList, setActiveList] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <SidebarProvider>
      <div className="h-screen flex w-full bg-gray-50">
        {/* Sidebar */}
        <Sidebar side="left" className="border-r border-gray-200">
          <SidebarContent className="pt-4">
            {/* Logo and Search */}
            <div className="px-4 mb-4">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingCart className="h-6 w-6 text-green-500" />
                <h1 className="text-xl font-bold">EasyShop</h1>
              </div>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search items..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Separator className="my-2" />
            
            {/* Saved Lists */}
            <SavedLists 
              activeList={activeList}
              onSelectList={setActiveList}
            />
          </SidebarContent>
        </Sidebar>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <SidebarTrigger className="md:hidden" />
              <h2 className="text-2xl font-bold">
                {activeList ? activeList : "Shopping List"}
              </h2>
            </div>
            <ShoppingList 
              listId={activeList || "default"} 
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
