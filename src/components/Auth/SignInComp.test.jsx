import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, vi } from "vitest";
import SignInComp from "./SignInComp";

const mockNavigate = vi.fn();
const mockSignInWithEmailAndPassword = vi.fn();
const mockToastError = vi.fn();

vi.mock("firebase/auth", () => ({
  signInWithEmailAndPassword: (...args) => mockSignInWithEmailAndPassword(...args),
}));

vi.mock("../../firebase", () => ({
  auth: {},
}));

vi.mock("react-toastify", () => ({
  toast: {
    error: (...args) => mockToastError(...args),
  },
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("SignInComp", () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    mockSignInWithEmailAndPassword.mockReset();
    mockToastError.mockReset();
  });

  it("logs user in and navigates to home", async () => {
    mockSignInWithEmailAndPassword.mockResolvedValueOnce({});

    render(<SignInComp />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Adresse e-mail"), "test@tag.com");
    await user.type(screen.getByPlaceholderText("Mot de passe"), "password123");
    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(mockSignInWithEmailAndPassword).toHaveBeenCalledTimes(1);
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("shows toast error when login fails", async () => {
    mockSignInWithEmailAndPassword.mockRejectedValueOnce(
      new Error("auth/invalid-credential")
    );

    render(<SignInComp />);
    const user = userEvent.setup();

    await user.type(screen.getByPlaceholderText("Adresse e-mail"), "test@tag.com");
    await user.type(screen.getByPlaceholderText("Mot de passe"), "bad-password");
    await user.click(screen.getByRole("button", { name: /Se connecter/i }));

    await waitFor(() => {
      expect(mockToastError).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});
