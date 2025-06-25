# 🧾 Product Requirements Document – Follow Immo (Chrome Extension)

## 1. Overview

**Follow Immo** is a lightweight Chrome extension designed for real estate investors to help track and manage property listings from classified ad websites like **Leboncoin**. The goal is to allow users to "follow" ads they are interested in with one click, visualize and organize them, and eventually synchronize this data with external tools like Notion or Airtable.

---

## 2. Goals

- 🟢 Allow users to save property listings from Leboncoin via a simple “Follow” button injected into the page.
- 🟢 Store followed ads (called `ads`) locally in the browser cache (initially).
- 🟢 Display saved ads in an in-page sidebar and a full back office.
- 🟢 Keep the extension extremely lightweight, fast, and minimal in terms of libraries.
- 🟢 Lay foundations for future integrations (e.g. Notion, Airtable, Excel/Word templates).
- 🟢 Use a modular structure with a clean separation of logic (clean architecture) and allow adapters per site.

---

## 3. User Personas

**Primary Persona:**  
🏘️ *The Real Estate Investor*  
- Regularly browses listing platforms.  
- Needs to quickly filter, save, and analyze opportunities.
- Track the progress of an ad's investment analysis
- Wants to avoid duplicating work across spreadsheets and documents.

---

## 4. Features

### 4.1 Follow Button (injected)

- Inject a UI button (`Follow`) directly into the listing page on Leboncoin.
- When clicked, extract the ad data from the page (via adapter) and store it locally.

### 4.2 Ad Data Structure

> Each field (except id from site) must be optional on ad. If user enters a new field, it can specify a value on it for existing followed ads.

- **From site (auto-mapped):**
  - `id` (unique per ad)
  - `title`
  - `surface`
  - `price`
  - `type` (House, apartment, etc.)
  - `typology` (T1, T2, etc.)
  - `DPE` (energy performance, from the best A to G)
  - `city`
  - `publicationDate`
  - `followDate`
  - `url`
  - `contactInfo` (agent/owner)
  - `images[]`

- **User-entered fields:**
  - `rentalPricePerM2`
  - `trustScore` (1–5)
  - `list` (to categorize ads with custom lists, optional)

- **Computed fields:**
  - `profitability` (e.g. based on price and rentalPricePerM2)

### 4.3 Sidebar (Iframe Panel)

- Fixed-position iframe on the right side of the screen.
- Lists followed ads with quick access and minimal interactions.

### 4.4 Back Office (Full Page)

- Local web page for managing:
  - All saved ads
  - Lists and categories
  - Field editing and computed updates
  - Extension preferences
- This back office is designed to eventually become a standalone front-end that can be:
  - Deployed on the web (as a PWA or standard app)
  - Embedded in a web view to create a mobile application
- The codebase must ensure compatibility with both web and mobile web-view contexts.

---

## 5. Technical Design

### 5.1 Stack & Guidelines

- 🧩 **Full TypeScript**
- ⚡ **No external dependencies unless strictly necessary**
- 🪶 **Minimal footprint & instant load**
- 🧱 **shadcn/ui** for all UI components, and **React**
- 🧼 **Clean Architecture**
- Online saved on github

### 5.2 Folder Structure

```bash
/src
  /ui                   # common UI components (shared between back-office and front-adapters injector, e.g. Follow button) or style/theme
  /back-office          # layouts, pages, specific UI components
  /extension
    /core                 # Business logic, models, use cases, ports
    /front-adapters
      /leboncoin          # Site-specific logic
        - inject.tsx      # UI injection into DOM
        - adapter.ts      # Page parser + data mapper
```

### 5.3 Architecture

- `src` the root folder for all code
- `src/ui` common UI component (shared between back-office and front-adapters injector, e.g. Follow button) or style/theme
- `src/back-office` layouts, pages, specific UI components
- `src/extension/core` exposes types, use cases, ports/interfaces.
- `src/extension/front-adapters` implement those ports for each site.
- DOM parsing and component injection are per-adapter.
- Local storage uses browser's cache IndexedDB.

---

## 6. MVP Scope / User stories

> Remember: This is an MVP focused on core functionality. Keep implementations simple but extensible for future features like multi-site support, cloud sync, and external integrations.

### Task 1: Setup and Project Structure
**Header Reference**: "Setup and project structure"
- [X] Initialize project structure
- [X] Setup basic folder structure
- [X] Configure necessary dependencies
- [X] Create README.md with project description

### Task 2: Follow Button Injection System
**Header Reference**: "4.1 Follow Button (injected)" + "Inject Follow button on Leboncoin ad pages"
- [X] Implement DOM injection system for Follow button on Leboncoin ad pages
- [ ] Create reusable UI component in `/src/ui` for Follow button
- [ ] Implement Leboncoin-specific injector in `/src/front-adapters/leboncoin/inject.tsx`
- [ ] Ensure button renders in <100ms and integrates seamlessly with existing page layout

### Task 3: Ad Data Parsing and Storage
**Header Reference**: "4.2 Ad Data Structure" + "✅ Parse and store ad data in local cache"
- [ ] Implement Leboncoin adapter in `/src/front-adapters/leboncoin/adapter.ts`
- [ ] Parse all required ad fields: id, title, surface, price, type, typology, DPE, city, publicationDate, url, contactInfo, images
- [ ] Create data models in `/src/core` with optional fields support
- [ ] Implement local storage using browser cache (IndexedDB or localStorage)
- [ ] Ensure 100% parsing accuracy for Leboncoin ads

### Task 4: Core Data Model Implementation
**Header Reference**: "4.2 Ad Data Structure" + "✅ Basic data model implemented"
- [ ] Define TypeScript interfaces for Ad data structure in `/src/core`
- [ ] Implement user-entered fields: rentalPricePerM2, trustScore, list
- [ ] Create computed fields logic for profitability calculations
- [ ] Implement use cases for CRUD operations on ads
- [ ] Define ports/interfaces for data persistence

### Task 5: Sidebar Iframe Panel
**Header Reference**: "4.3 Sidebar (Iframe Panel)" + "✅ Sidebar iframe showing followed ads"
- [ ] Create fixed-position iframe sidebar on right side of screen
- [ ] Implement minimal ad listing with quick access interactions
- [ ] Use shadcn/ui components for consistent styling
- [ ] Ensure sidebar doesn't interfere with host page functionality
- [ ] Display followed ads with essential information (title, price, city)

### Task 6: Back Office Interface
**Header Reference**: "4.4 Back Office (Full Page)" + "✅ Simple back office with CRUD on ads"
- [ ] Create full-page management interface in `/src/back-office`
- [ ] Implement CRUD operations for saved ads
- [ ] Create ad editing forms with all field types (auto-mapped, user-entered, computed)
- [ ] Add list/category management functionality
- [ ] Design for future web/mobile compatibility
- [ ] Ensure >90% intuitive usability

## Development Workflow
1. Always start by understanding which MVP task you're working on, once task is done, mark it by a [X] in this current MDC
2. Reference the appropriate PRD section and achievement header
3. Follow the established folder structure
4. Implement with clean architecture principles
5. Test for performance requirements
6. Ensure compatibility with future enhancements

---

## 7. Future Enhancements

- Add fields to ads based on formulas
- Add fields to ads with are compute by running API calls to external services as MeilleursAgents
- Export templates (Excel, Word)  
- Sync with Notion / Airtable / Google Sheets  
- Generate profitability analysis with charts  
- Support for additional platforms (e.g. SeLoger, BienIci)  
- Multi-user sync (login + storage)  

---

## 8. Non-Goals (for MVP)

- Multi-user authentication  
- Cloud backend  
- Real-time sync  
- Notifications/alerts  

---

## 9. Success Metrics

- All MVP tasks completed and functional
- Extension passes performance benchmarks
- 100% ad parsing accuracy on Leboncoin
- User interface is intuitive and responsive
- Code follows clean architecture principles
- Extension is ready for future enhancements (Notion/Airtable sync, additional sites)
