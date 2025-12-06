"use client";

import { useState, useCallback } from "react";
import ItemList from "@/components/ItemList";
import AddItemForm from "@/components/AddItemForm";

interface Item {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleItemAdded = useCallback((item: Item) => {
    setItems((prev) => [item, ...prev]);
    setShowForm(false);
  }, []);

  return (
    <div
      data-testid="home-page"
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800"
    >
      <main className="max-w-2xl mx-auto px-4 py-12">
        {/* Header */}
        <header data-testid="header" className="text-center mb-12">
          <h1
            data-testid="main-title"
            className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4"
          >
            Fast Language
          </h1>
          <p
            data-testid="subtitle"
            className="text-gray-600 dark:text-gray-400"
          >
            Your fullstack Next.js application
          </p>
        </header>

        {/* Add Item Section */}
        <section className="mb-8">
          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              data-testid="show-form-button"
              className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-gray-500 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-colors"
            >
              + Add New Item
            </button>
          ) : (
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Add New Item</h2>
                <button
                  onClick={() => setShowForm(false)}
                  data-testid="cancel-button"
                  className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Cancel
                </button>
              </div>
              <AddItemForm onItemAdded={handleItemAdded} />
            </div>
          )}
        </section>

        {/* Items List */}
        <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
          <ItemList initialItems={items} />
        </section>

        {/* API Info */}
        <footer
          data-testid="footer"
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
        >
          <p>
            REST API available at{" "}
            <code className="bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">
              /api/items
            </code>
          </p>
        </footer>
      </main>
    </div>
  );
}
