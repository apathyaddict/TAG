import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import RestaurantCard from "./RestaurantCard";

describe("RestaurantCard", () => {
  it("renders core restaurant info and details link", () => {
    const restaurant = {
      id: "abc123",
      name: "bistro du coin",
      rue: "10 rue des fleurs",
      code_postal: "75001",
      ville: "paris",
      phone: "0102030405",
      category: "RESTAURANT",
    };

    render(
      <MemoryRouter>
        <RestaurantCard restaurant={restaurant} />
      </MemoryRouter>
    );

    expect(screen.getByText("Bistro du coin")).toBeInTheDocument();
    expect(screen.getByText("RESTAURANT")).toBeInTheDocument();
    expect(screen.getByText("10 Rue des Fleurs")).toBeInTheDocument();
    expect(screen.getByText("75001, Paris")).toBeInTheDocument();
    expect(screen.getByText("01 02 03 04 05")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Détails et Modifications/i })
    ).toHaveAttribute("href", "/restaurants/abc123");
  });
});
