
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AddItemFormProps {
  onAdd: (name: string, category?: string) => void;
}

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [itemName, setItemName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName);
      setItemName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="Add a new item..."
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" className="bg-green-500 hover:bg-green-600">
        <Plus className="h-5 w-5" />
        <span className="sr-only sm:not-sr-only sm:ml-2">Add</span>
      </Button>
    </form>
  );
}
