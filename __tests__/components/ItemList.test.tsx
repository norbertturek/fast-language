import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ItemList from "@/components/ItemList";

// Mock fetch globally
global.fetch = vi.fn();

describe("ItemList", () => {
  it("renders empty state when no items", () => {
    render(<ItemList />);

    expect(screen.getByTestId("item-list")).toBeInTheDocument();
    expect(screen.getByTestId("empty-message")).toBeInTheDocument();
    expect(screen.getByTestId("empty-message")).toHaveTextContent(
      "No items yet"
    );
  });

  it("renders items when provided", () => {
    const items = [
      {
        id: 1,
        name: "Test Item",
        description: "Test description",
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Another Item",
        description: null,
        createdAt: new Date().toISOString(),
      },
    ];

    render(<ItemList initialItems={items} />);

    expect(screen.getByTestId("items-container")).toBeInTheDocument();
    expect(screen.getByTestId("item-1")).toBeInTheDocument();
    expect(screen.getByTestId("item-2")).toBeInTheDocument();
    expect(screen.getByTestId("item-name-1")).toHaveTextContent("Test Item");
    expect(screen.getByTestId("item-description-1")).toHaveTextContent(
      "Test description"
    );
  });

  it("displays correct item count", () => {
    const items = [
      {
        id: 1,
        name: "Item 1",
        description: null,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        name: "Item 2",
        description: null,
        createdAt: new Date().toISOString(),
      },
    ];

    render(<ItemList initialItems={items} />);

    expect(screen.getByTestId("item-list-title")).toHaveTextContent(
      "Items (2)"
    );
  });

  it("has refresh button", () => {
    render(<ItemList />);

    expect(screen.getByTestId("refresh-button")).toBeInTheDocument();
    expect(screen.getByTestId("refresh-button")).toHaveTextContent("Refresh");
  });
});
