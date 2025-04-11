
import { useState, useEffect } from "react";

export interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
  category?: string;
}

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  useEffect(() => {
    localStorage.setItem("shoppingList", JSON.stringify(items));
  }, [items]);

  const addItem = (name: string, category?: string) => {
    if (name.trim() === "") return;
    
    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: name.trim(),
      completed: false,
      category,
    };
    
    setItems((currentItems) => [...currentItems, newItem]);
  };

  const toggleItem = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const editItem = (id: string, name: string, category?: string) => {
    if (name.trim() === "") return;
    
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, name: name.trim(), category } : item
      )
    );
  };

  const deleteItem = (id: string) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== id));
  };

  const clearCompleted = () => {
    setItems((currentItems) => currentItems.filter((item) => !item.completed));
  };

  return {
    items,
    addItem,
    toggleItem,
    editItem,
    deleteItem,
    clearCompleted,
  };
}
