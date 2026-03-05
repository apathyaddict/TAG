# Test Suite (30 Cases)

Purpose: validate critical user flows for this low-scale internal app from a practical perspective.

How to use:
- Run tests in order.
- Mark each case `PASS` or `FAIL`.
- If failed, capture screenshot + exact error text.

Test data suggested:
- One valid user account.
- One invalid password attempt.
- At least 3 existing restaurant records with different city/category/postal code.
- One test restaurant name reserved for create/edit/delete flow.

## Auth (1-5)

| ID | Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|
| T-01 | Login succeeds with valid credentials | Go to `/login`; enter valid email/password; submit | User lands on home page and can access protected pages | TODO |
| T-02 | Login fails with invalid credentials | Go to `/login`; use valid email + wrong password | Error toast appears; user stays unauthenticated | TODO |
| T-03 | Unauthenticated access is redirected | Open `/recherche` in private window | Redirects to `/login` | TODO |
| T-04 | Logout from profile works | Login; open `/profile`; click `Déconnexion` | Session ends and protected pages are blocked | TODO |
| T-05 | Protected route blocks deep link after logout | Logout; directly open `/admin` URL | Redirects to `/login` | TODO |

## Navigation and Display (6-10)

| ID | Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|
| T-06 | Navbar actions are visible and clickable | Login; inspect navbar icons (`+`, search, PDF, dashboard, profile) | Each icon is visible and routes correctly | TODO |
| T-07 | Home page visual loads | Login; open `/` | TAG image and homepage layout render without console errors | TODO |
| T-08 | Search page initial load | Open `/recherche` | List area renders; at least one card or empty-state message shows | TODO |
| T-09 | Restaurant card displays core fields | On search page, inspect one card | Name, category, address/city/postal, phone appear formatted | TODO |
| T-10 | Card detail button routes correctly | Click `Détails et Modifications` on a card | Opens matching `/restaurants/:id` detail page | TODO |

## Detail Page and Data Rendering (11-15)

| ID | Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|
| T-11 | Detail page renders all major sections | Open existing `/restaurants/:id` | Identity, contact, cuisine, symbols, text, contacts sections render | TODO |
| T-12 | Missing/invalid restaurant id is handled | Open `/restaurants/invalid-id` | Non-crash fallback (`Aucune fiche...`) appears | TODO |
| T-13 | Detail date display | Open a record with `date_added` and optional `date_modified` | Dates display in expected format; no `Invalid Date` | TODO |
| T-14 | Detail image module renders current images | Open record with images | Images render and delete buttons are visible | TODO |
| T-15 | Contact log table renders | Open detail page | Existing contacts appear in table (or empty table without crash) | TODO |

## Create and Edit (16-22)

| ID | Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|
| T-16 | Create validation: required name | Open `/new`; leave name empty; submit | Inline error shown for missing restaurant name | TODO |
| T-17 | Create validation: required category | Enter name only; no category; submit | Inline error shown for missing category | TODO |
| T-18 | Create validation: postal code numeric | Enter non-numeric postal code; submit | Validation blocks submission | TODO |
| T-19 | Create duplicate-name detection | Try create with an existing name | Duplicate warning shown; save blocked | TODO |
| T-20 | Successful create flow | Submit valid new restaurant | Success toast; navigates to new detail page | TODO |
| T-21 | Edit page pre-fills current values | From detail, click `Modifier` | Form loads with current data populated (including status) | TODO |
| T-22 | Edit save updates record | Change one field; save | Success toast; returns to detail; updated value visible | TODO |

## Delete, Contacts, and Images (23-26)

| ID | Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|
| T-23 | Delete blocked with wrong password | On detail, click `Supprimer`; enter wrong password | Deletion blocked; error shown in dialog | TODO |
| T-24 | Delete succeeds with correct password | Enter correct password and confirm | Record deleted; app routes to `/recherche` | TODO |
| T-25 | Add contact entry | On detail, add date + method + notes; submit | New contact row appears and persists after refresh | TODO |
| T-26 | Delete contact entry | Delete one contact row | Row removed and stays removed after refresh | TODO |

## Search and Filters (27-30)

| ID | Scenario | Steps | Expected Result | Status |
|---|---|---|---|---|
| T-27 | Search by name | In sidebar, type part of name | Matching results show; irrelevant cards disappear | TODO |
| T-28 | Filter by city | Enter city in city filter | Only city-matching results appear | TODO |
| T-29 | Filter by postal code | Enter postal code | Only postal-code matches appear | TODO |
| T-30 | Filter by category and clear/reapply | Select category checkbox; then unselect and reselect | Results update correctly each time (no stuck filter state) | TODO |

## Optional Extended Checks (if time)
- PDF export: select items and download simplified PDF.
- Print page: `/to-print` with no state shows fallback message and link back to PDF page.
- Dashboard: sort toggles and cursor next/prev navigation.
