import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import CreatePage from "./CreatePage";

const mockNavigate = vi.fn();

vi.mock("../firebase", () => ({
  db: {},
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("firebase/firestore", () => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  doc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  updateDoc: vi.fn(),
  where: vi.fn(),
}));

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
  },
}));

describe("CreatePage validation", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it("shows required name error", async () => {
    render(<CreatePage />);
    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: /Ajouter/i }));

    expect(
      screen.getByText("Le nom du restaurant est requis.")
    ).toBeInTheDocument();
  });

  it("shows required category error when name is present", async () => {
    render(<CreatePage />);
    const user = userEvent.setup();

    await user.type(
      screen.getByLabelText(/Nom/i, { selector: "input#name" }),
      "Le Test"
    );
    await user.click(screen.getByRole("button", { name: /Ajouter/i }));

    expect(
      screen.getByText("La rubrique du restaurant est requise.")
    ).toBeInTheDocument();
  });
});
