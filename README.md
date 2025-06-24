# Follow Immo - Chrome Extension

A lightweight Chrome extension designed for real estate investors to help track and manage property listings from classified ad websites like **Leboncoin**.

## 🎯 Overview

Follow Immo allows users to "follow" ads they are interested in with one click, visualize and organize them, and eventually synchronize this data with external tools like Notion or Airtable.

## ✨ Features

- 🏠 **Follow Button**: Inject a "Follow" button directly into Leboncoin listing pages
- 💾 **Local Storage**: Store followed ads locally in browser cache
- 📋 **Sidebar View**: Quick access to followed ads via an in-page sidebar
- 🏢 **Back Office**: Full management interface for organizing and analyzing ads
- ⚡ **Lightweight**: Minimal footprint with instant load performance
- 🧱 **Clean Architecture**: Modular structure with adapters for different sites

## 🏗️ Architecture

The project follows clean architecture principles with clear separation of concerns:

```
src/
├── back-office/           # Back office layouts, pages, components
├── ui/                    # Shared UI components and themes for back-office and extension
└── extension/             # Chrome extension root directory
    ├── core/              # Business logic, models, use cases, ports
    └── front-adapters/
        └── leboncoin/     # Leboncoin-specific implementation
            ├── inject.tsx # DOM UI injection
            └── adapter.ts # Page parser and data mapper
```

## 🛠️ Tech Stack

- **Language**: Full TypeScript
- **Framework**: React with shadcn/ui components
- **Architecture**: Clean Architecture with adapters pattern
- **Storage**: Local browser cache (IndexedDB/localStorage)
- **Build Tool**: Vite
- **Target**: Chrome Extension Manifest V3

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Chrome browser for testing

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd follow-immo
```

2. Navigate to the extension directory and install dependencies:
```bash
cd src/extension
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load the extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `src/extension/dist` folder

## 📋 Development

### Commands

- `npm run build` - Build the extension for production
- `npm run dev` - Build in watch mode for development
- `npm run type-check` - Run TypeScript type checking

### Development Workflow

1. Make changes to the source code
2. Run `npm run dev` to build in watch mode
3. Reload the extension in Chrome (`chrome://extensions/`)
4. Test on Leboncoin real estate pages

## 🎯 MVP Scope

- ✅ Inject Follow button on Leboncoin ad pages
- ✅ Parse and store ad data in local cache
- ✅ Basic data model implemented
- ✅ Sidebar iframe showing followed ads
- ✅ Simple back office with CRUD on ads

## 🚀 Future Enhancements

- 🧩 Export templates (Excel, Word)
- ⛅ Sync with Notion / Airtable / Google Sheets
- 📊 Generate profitability analysis with charts
- 🌐 Support for additional platforms (SeLoger, BienIci)
- 👥 Multi-user sync (login + storage)

## 📈 Success Metrics

- 🟢 < 100ms render time for injected components
- 🟢 < 200kb total extension size (zipped)
- 🟢 100% of ad data parsed correctly on Leboncoin
- 🟢 > 90% of users able to use sidebar + back office intuitively

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes following the architecture guidelines
4. Test thoroughly on Leboncoin pages
5. Submit a pull request

## 📄 License

This project is private and proprietary.

---

**Target Users**: Real Estate Investors who regularly browse Leboncoin and need to quickly filter, save, and analyze opportunities while avoiding duplicating work across spreadsheets and documents. 