# ATM Machine React TypeScript

A modern, responsive ATM machine simulation built with React, TypeScript, and Tailwind CSS. This project demonstrates a full-featured ATM user interface with PIN authentication, account management, transaction history, and a beautiful, professional design.

## Features

- **PIN Authentication:** Secure login with PIN entry and PIN change functionality.
- **Account Management:** View balances for savings and current accounts.
- **Transactions:** Deposit, withdraw, and transfer funds between accounts.
- **Transaction History:** View a detailed log of all transactions.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Modern UI:** Glassmorphism, gradients, and bold, stylish headings for a premium ATM look.
- **State Management:** Uses React Context for global ATM state.
- **TypeScript:** Full type safety across all components and logic.

## Screenshots

![ATM Menu Screenshot](./public/vite.svg)

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```sh
   git clone <your-repo-url>
   cd atm-machine-react-typescript
   ```
2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```
4. **Open your browser:**
   Visit [http://localhost:5173](http://localhost:5173) to use the ATM app.

## Project Structure

```
├── public/
├── src/
│   ├── components/
│   │   └── common/         # Reusable Button and Input components
│   ├── context/            # ATM Context Provider
│   ├── hooks/              # Custom hooks (e.g., useAtm)
│   ├── pages/              # All main ATM pages (Menu, Balance, etc.)
│   ├── types/              # TypeScript types
│   ├── App.tsx             # App entry point
│   └── index.css           # Tailwind and global styles
├── tailwind.config.js      # Tailwind CSS configuration
├── package.json
└── README.md
```

## Customization

- **Theme Colors:** Easily change the ATM's look by editing `tailwind.config.js`.
- **Fonts:** Headings use a bold, stylish serif font for a premium feel. You can further customize fonts in your Tailwind config or by importing Google Fonts.
- **ATM Logic:** All account and transaction logic is in the ATM context for easy extension.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

This project is open source and available under the [MIT License](LICENSE).

---

**Made with ❤️ using React, TypeScript, and Tailwind CSS.**
