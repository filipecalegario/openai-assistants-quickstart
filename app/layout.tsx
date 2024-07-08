// import { Inter } from "next/font/google";
// import "./globals.css";
// import Warnings from "./components/warnings";
// import { assistantId } from "./assistant-config";
// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Assistants API Quickstart",
//   description: "A quickstart template using the Assistants API with OpenAI",
//   icons: {
//     icon: "/openai.svg",
//   },
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         {assistantId ? children : <Warnings />}
//         <img className="logo" src="/openai.svg" alt="OpenAI Logo" />
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
import { Providers } from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
