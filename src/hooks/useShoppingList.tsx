
import { useState, useEffect } from "react";

export interface ShoppingItem {
  id: string;
  name: string;
  completed: boolean;
  category?: string;
  listId: string;
}

export function useShoppingList(listId: string = "default") {
  const [items, setItems] = useState<ShoppingItem[]>(() => {
    const savedItems = localStorage.getItem("shoppingList");
    return savedItems ? JSON.parse(savedItems) : [];
  });

  // Get items for the current list
  const listItems = items.filter(item => item.listId === listId);

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
      listId,
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
    setItems((currentItems) => 
      currentItems.filter((item) => !(item.listId === listId && item.completed))
    );
  };

  const copyList = (sourceListId: string, targetListId: string) => {
    const sourceItems = items.filter(item => item.listId === sourceListId);
    
    const newItems = sourceItems.map(item => ({
      ...item,
      id: Date.now() + Math.random().toString(),
      listId: targetListId
    }));
    
    setItems([...items, ...newItems]);
  };

  const clearList = () => {
    setItems((currentItems) => 
      currentItems.filter((item) => item.listId !== listId)
    );
  };

  return {
    items: listItems,
    addItem,
    toggleItem,
    editItem,
    deleteItem,
    clearCompleted,
    copyList,
    clearList,
  };
}
