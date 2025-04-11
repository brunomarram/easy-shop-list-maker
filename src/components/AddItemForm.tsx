
import { useState, useEffect, useRef } from "react";
import { Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { commonGroceryItems } from "@/utils/commonItems";

interface AddItemFormProps {
  onAdd: (name: string, category?: string) => void;
}

export default function AddItemForm({ onAdd }: AddItemFormProps) {
  const [itemName, setItemName] = useState("");
  const [open, setOpen] = useState(false);
  const [suggestions, setSuggestions] = useState<typeof commonGroceryItems>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (itemName.trim() === "") {
      setSuggestions([]);
      return;
    }

    const filtered = commonGroceryItems.filter((item) =>
      item.name.toLowerCase().includes(itemName.toLowerCase())
    );
    
    setSuggestions(filtered.slice(0, 5)); // Limit to 5 suggestions
    
    if (filtered.length > 0 && itemName.length > 1) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [itemName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (itemName.trim()) {
      onAdd(itemName);
      setItemName("");
      setOpen(false);
    }
  };

  const handleSuggestionClick = (name: string) => {
    setItemName(name);
    onAdd(name);
    setItemName("");
    setOpen(false);
    inputRef.current?.focus();
  };

  // Dynamically get Lucide icon components
  const getIcon = (iconName: string) => {
    const Icon = (LucideIcons as any)[iconName];
    return Icon ? <Icon className="h-4 w-4 mr-2" /> : null;
  };

  return (
    <form onSubmit={handleSubmit} className="relative flex gap-2 mb-6">
      <Popover open={open && suggestions.length > 0} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            ref={inputRef}
            type="text"
            placeholder="Adicionar novo item..."
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            className="flex-1"
          />
        </PopoverTrigger>
        <PopoverContent 
          className="p-0 w-[300px] border-t-0 rounded-t-none" 
          align="start"
          sideOffset={5}
        >
          <Command>
            <CommandList>
              <CommandGroup>
                {suggestions.map((item) => (
                  <CommandItem
                    key={item.name}
                    value={item.name}
                    onSelect={() => handleSuggestionClick(item.name)}
                    className="flex items-center"
                  >
                    {getIcon(item.icon)}
                    {item.name}
                  </CommandItem>
                ))}
              </CommandGroup>
              <CommandEmpty>Nenhum item encontrado</CommandEmpty>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button type="submit" className="bg-green-500 hover:bg-green-600">
        <Plus className="h-5 w-5" />
        <span className="sr-only sm:not-sr-only sm:ml-2">Adicionar</span>
      </Button>
    </form>
  );
}
