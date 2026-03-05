import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import PrintPage from "./PrintPage";

describe("PrintPage", () => {
  it("shows fallback message when opened without selected items state", () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: "/to-print", state: null }]}>
        <Routes>
          <Route path="/to-print" element={<PrintPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/Aucune fiche selectionnee pour l'impression/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Retour a l'export PDF/i })
    ).toHaveAttribute("href", "/pdf");
  });
});
