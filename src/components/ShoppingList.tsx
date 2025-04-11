
import { useState } from "react";
import { ShoppingCart, CheckCheck, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import AddItemForm from "./AddItemForm";
import ShoppingItemComponent from "./ShoppingItem";
import { useShoppingList } from "@/hooks/useShoppingList";

export default function ShoppingList() {
  const { items, addItem, toggleItem, editItem, deleteItem, clearCompleted } = useShoppingList();
  const { toast } = useToast();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  const filteredItems = items.filter((item) => {
    if (filter === "active") return !item.completed;
    if (filter === "completed") return item.completed;
    return true;
  });

  const handleClearCompleted = () => {
    const completedCount = items.filter(item => item.completed).length;
    if (completedCount === 0) return;
    
    clearCompleted();
    toast({
      description: `Removed ${completedCount} completed ${completedCount === 1 ? 'item' : 'items'}.`,
    });
  };

  const handleDelete = (id: string) => {
    const itemName = items.find(item => item.id === id)?.name;
    deleteItem(id);
    toast({
      description: `${itemName} has been removed from your list.`,
    });
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex items-center mb-6">
        <ShoppingCart className="mr-2 h-6 w-6 text-green-500" />
        <h1 className="text-2xl font-bold text-gray-800">Shopping List</h1>
      </div>

      <AddItemForm onAdd={addItem} />

      {items.length > 0 && (
        <div className="flex justify-between items-center mb-4">
          <div className="flex space-x-1">
            <Button
              variant={filter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("all")}
              className={filter === "all" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              All
            </Button>
            <Button
              variant={filter === "active" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("active")}
              className={filter === "active" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              Active
            </Button>
            <Button
              variant={filter === "completed" ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter("completed")}
              className={filter === "completed" ? "bg-green-500 hover:bg-green-600" : ""}
            >
              Completed
            </Button>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleClearCompleted}
            className="text-gray-500"
          >
            <Trash2 className="mr-1 h-4 w-4" />
            Clear done
          </Button>
        </div>
      )}

      <div className="space-y-1">
        {filteredItems.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            {items.length === 0 
              ? "Your shopping list is empty. Add some items!" 
              : filter === "completed" 
                ? "No completed items yet." 
                : "No active items. Everything's done!"}
          </div>
        ) : (
          filteredItems.map((item) => (
            <ShoppingItemComponent
              key={item.id}
              item={item}
              onToggle={toggleItem}
              onEdit={editItem}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

      {items.length > 0 && (
        <div className="mt-4 text-sm text-gray-500 flex justify-between items-center">
          <span>
            {items.filter(i => !i.completed).length} items left
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-green-600"
            onClick={() => {
              const remaining = items.filter(i => !i.completed);
              remaining.forEach(item => toggleItem(item.id));
              if (remaining.length > 0) {
                toast({
                  description: `Marked ${remaining.length} ${remaining.length === 1 ? 'item' : 'items'} as complete.`,
                });
              }
            }}
          >
            <CheckCheck className="mr-1 h-4 w-4" />
            Complete all
          </Button>
        </div>
      )}
    </div>
  );
}
