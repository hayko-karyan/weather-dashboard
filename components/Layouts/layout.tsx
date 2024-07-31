import { FC, ReactNode } from "react";
interface Props {
  children: ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}

export default Layout
