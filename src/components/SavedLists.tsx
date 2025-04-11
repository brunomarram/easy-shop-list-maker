
import { useState, useEffect } from "react";
import { Plus, Save, Trash2, Edit, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { useToast } from "@/components/ui/use-toast";

interface SavedListsProps {
  activeList: string | null;
  onSelectList: (listName: string) => void;
}

export default function SavedLists({ activeList, onSelectList }: SavedListsProps) {
  const [lists, setLists] = useState<string[]>([]);
  const [newListName, setNewListName] = useState("");
  const [editingList, setEditingList] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const { toast } = useToast();

  // Load saved lists from localStorage
  useEffect(() => {
    const savedLists = localStorage.getItem("savedLists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
  }, []);

  // Save lists to localStorage when changed
  useEffect(() => {
    localStorage.setItem("savedLists", JSON.stringify(lists));
  }, [lists]);

  const handleAddList = () => {
    if (newListName.trim() === "") return;
    
    if (lists.includes(newListName.trim())) {
      toast({
        description: "A list with this name already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setLists([...lists, newListName.trim()]);
    setNewListName("");
    onSelectList(newListName.trim());
    
    toast({
      description: `List "${newListName.trim()}" created.`,
    });
  };

  const handleDeleteList = (listName: string) => {
    setLists(lists.filter(name => name !== listName));
    
    if (activeList === listName) {
      onSelectList("default");
    }
    
    toast({
      description: `List "${listName}" deleted.`,
    });
  };

  const handleUpdateList = () => {
    if (!editingList) return;
    if (editName.trim() === "") return;
    
    if (lists.includes(editName.trim()) && editName.trim() !== editingList) {
      toast({
        description: "A list with this name already exists.",
        variant: "destructive"
      });
      return;
    }
    
    setLists(lists.map(name => name === editingList ? editName.trim() : name));
    
    if (activeList === editingList) {
      onSelectList(editName.trim());
    }
    
    setEditingList(null);
    setEditName("");
    
    toast({
      description: `List renamed to "${editName.trim()}".`,
    });
  };

  const cancelEdit = () => {
    setEditingList(null);
    setEditName("");
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="flex justify-between items-center">
        <span>My Lists</span>
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <div className="flex mb-2 gap-2">
          <Input
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="New list name"
            className="flex-1 h-8"
            onKeyDown={(e) => e.key === "Enter" && handleAddList()}
          />
          <Button 
            onClick={handleAddList} 
            size="sm" 
            className="bg-green-500 hover:bg-green-600 h-8 px-2"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              isActive={activeList === "default" || activeList === null}
              onClick={() => onSelectList("default")}
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Default List</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          
          {lists.map(listName => (
            <SidebarMenuItem key={listName}>
              {editingList === listName ? (
                <div className="flex items-center gap-1 p-1 rounded-md border border-input">
                  <Input
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="h-7 flex-1"
                    autoFocus
                    onKeyDown={(e) => e.key === "Enter" && handleUpdateList()}
                  />
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={handleUpdateList}
                    className="h-7 w-7 p-0"
                  >
                    <Check className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={cancelEdit}
                    className="h-7 w-7 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <SidebarMenuButton 
                    isActive={activeList === listName}
                    onClick={() => onSelectList(listName)}
                  >
                    <List className="h-4 w-4" />
                    <span>{listName}</span>
                  </SidebarMenuButton>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setEditingList(listName);
                      setEditName(listName);
                    }}
                    className="absolute right-8 top-1.5 h-5 w-5 p-0 opacity-0 group-hover/menu-item:opacity-100"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleDeleteList(listName)}
                    className="absolute right-1 top-1.5 h-5 w-5 p-0 opacity-0 group-hover/menu-item:opacity-100 text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
