import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import App from "./App";

const mockOnAuthStateChanged = vi.fn();
const mockSignOut = vi.fn();
const mockGetDoc = vi.fn();

vi.mock("./firebase", () => ({
  auth: {
    onAuthStateChanged: (...args) => mockOnAuthStateChanged(...args),
    signOut: (...args) => mockSignOut(...args),
  },
  db: {},
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(() => ({})),
  getDoc: (...args) => mockGetDoc(...args),
}));

vi.mock("./components/NavBar", () => ({
  default: () => <div>Navbar</div>,
}));

vi.mock("./components/DetailedPageResto", () => ({
  default: () => <div>Detail View</div>,
}));

vi.mock("./Pages/CreatePage", () => ({
  default: () => <div>Create View</div>,
}));

vi.mock("./Pages/SearchPage", () => ({
  default: () => <div>Search View</div>,
}));

vi.mock("./components/Auth/RegisterComp", () => ({
  default: () => <div>Register View</div>,
}));

vi.mock("./Pages/EditForm", () => ({
  default: () => <div>Edit View</div>,
}));

vi.mock("./Pages/HomePage", () => ({
  default: () => <div>Home View</div>,
}));

vi.mock("./Pages/Loginpage", () => ({
  default: () => <div>Login View</div>,
}));

vi.mock("./Pages/ProfilePage", () => ({
  default: ({ userDetails, handleLogout }) => (
    <div>
      <p>{userDetails.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  ),
}));

vi.mock("./components/Dashboard/Dashboard", () => ({
  default: () => <div>Dashboard View</div>,
}));

vi.mock("./Pages/PdfExport", () => ({
  default: () => <div>Pdf View</div>,
}));

vi.mock("./Pages/PrintPage", () => ({
  default: () => <div>Print View</div>,
}));

describe("App auth routing", () => {
  beforeEach(() => {
    mockOnAuthStateChanged.mockReset();
    mockSignOut.mockReset();
    mockGetDoc.mockReset();
  });

  it("redirects unauthenticated users to login", async () => {
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback(null);
      return vi.fn();
    });

    window.history.pushState({}, "", "/recherche");
    render(<App />);

    expect(await screen.findByText("Login View")).toBeInTheDocument();
  });

  it("loads profile for authenticated user and logs out", async () => {
    mockOnAuthStateChanged.mockImplementation((callback) => {
      callback({ uid: "user-1" });
      return vi.fn();
    });

    mockGetDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        email: "owner@company.com",
      }),
    });

    window.history.pushState({}, "", "/profile");
    render(<App />);

    expect(await screen.findByText("owner@company.com")).toBeInTheDocument();

    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: /Logout/i }));

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalledTimes(1);
    });
  });
});
