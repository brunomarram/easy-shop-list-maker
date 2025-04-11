
import { useState } from "react";
import { Check, X, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ShoppingItem } from "@/hooks/useShoppingList";

interface ShoppingItemProps {
  item: ShoppingItem;
  onToggle: (id: string) => void;
  onEdit: (id: string, name: string, category?: string) => void;
  onDelete: (id: string) => void;
}

export default function ShoppingItemComponent({
  item,
  onToggle,
  onEdit,
  onDelete,
}: ShoppingItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(item.name);

  const handleEdit = () => {
    onEdit(item.id, editValue);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditValue(item.name);
    }
  };

  return (
    <div className="flex items-center p-3 group border border-gray-200 rounded-lg mb-2 bg-white hover:shadow-sm transition-shadow">
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "h-6 w-6 rounded-full mr-3 flex-shrink-0",
          item.completed ? "bg-green-100 text-green-500" : "bg-gray-100"
        )}
        onClick={() => onToggle(item.id)}
      >
        {item.completed && <Check className="h-4 w-4" />}
      </Button>

      {isEditing ? (
        <div className="flex-1 flex">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleEdit}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
        </div>
      ) : (
        <div
          className={cn(
            "flex-1",
            item.completed && "line-through text-gray-400"
          )}
        >
          {item.name}
          {item.category && (
            <span className="ml-2 text-xs px-2 py-1 bg-gray-100 rounded-full text-gray-500">
              {item.category}
            </span>
          )}
        </div>
      )}

      <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
        {!isEditing && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => {
              setIsEditing(true);
              setEditValue(item.name);
            }}
          >
            <Edit className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
          onClick={() => onDelete(item.id)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
