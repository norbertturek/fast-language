"use client";

import { useState } from "react";

interface Item {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

interface ItemListProps {
  initialItems?: Item[];
}

export default function ItemList({ initialItems = [] }: ItemListProps) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [loading, setLoading] = useState(false);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/items");
      const data = await response.json();
      if (Array.isArray(data)) {
        setItems(data);
      } else {
        console.error("API returned non-array:", data);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      await fetch(`/api/items/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  return (
    <div data-testid="item-list" className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold" data-testid="item-list-title">
          Items ({items.length})
        </h2>
        <button
          onClick={fetchItems}
          disabled={loading}
          data-testid="refresh-button"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
      </div>

      {items.length === 0 ? (
        <p
          data-testid="empty-message"
          className="text-gray-500 text-center py-8"
        >
          No items yet. Add one to get started!
        </p>
      ) : (
        <ul data-testid="items-container" className="space-y-2">
          {items.map((item) => (
            <li
              key={item.id}
              data-testid={`item-${item.id}`}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
            >
              <div>
                <h3
                  className="font-medium"
                  data-testid={`item-name-${item.id}`}
                >
                  {item.name}
                </h3>
                {item.description && (
                  <p
                    className="text-sm text-gray-500"
                    data-testid={`item-description-${item.id}`}
                  >
                    {item.description}
                  </p>
                )}
              </div>
              <button
                onClick={() => deleteItem(item.id)}
                data-testid={`delete-button-${item.id}`}
                className="px-3 py-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
