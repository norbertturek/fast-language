"use client";

import { useState, FormEvent } from "react";

interface Item {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
}

interface AddItemFormProps {
  onItemAdded?: (item: Item) => void;
}

export default function AddItemForm({ onItemAdded }: AddItemFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description: description || null }),
      });

      if (!response.ok) {
        throw new Error("Failed to create item");
      }

      const newItem = await response.json();
      setName("");
      setDescription("");
      onItemAdded?.(newItem);
    } catch (err) {
      setError("Failed to add item. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      data-testid="add-item-form"
      className="space-y-4"
    >
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">
          Name *
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          data-testid="name-input"
          placeholder="Enter item name"
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
        />
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-testid="description-input"
          placeholder="Enter item description (optional)"
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
        />
      </div>

      {error && (
        <p data-testid="error-message" className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        data-testid="submit-button"
        className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors font-medium"
      >
        {loading ? "Adding..." : "Add Item"}
      </button>
    </form>
  );
}
