import { createContext, useContext } from "react";

interface PageHeaderSectionContext {}

export const pageHeaderContext = createContext<PageHeaderSectionContext | null>(null);

interface PageHeaderSectionProps {
  value?: PageHeaderSectionContext;
  children: React.ReactNode;
}

export function usePageHeaderSectionContext() {
  const context = useContext(pageHeaderContext);

  if (!context) {
    throw new Error("usePageHeaderSectionContext must be used within a PageHeaderProvider");
  }
  
  return context
}

export function PageHeaderSection({ children, value }: PageHeaderSectionProps) {
  return (
    <pageHeaderContext.Provider value={value || {}}>
      {children}
    </pageHeaderContext.Provider>
  )
}

interface FrameProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

function Frame({ children, ...props }: FrameProps) {
  return (
    <header className="flex flex-col gap-6 flex-shrink-0" {...props}>
      {children}
    </header>
  )
}

interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

function Header({ title, description, children, ...props }: HeaderProps) {
  return (
    <div className="flex" {...props}>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">{title}</h1>
        {description && <p className="text-muted-foreground text-sm">{description}</p>}
      </div>
      {children}
    </div>
  )
}

function ActionButtons({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 ml-auto">
      {children}
    </div>
  )
}

function Filters({ children }: { children?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {children}
    </div>
  )
}

PageHeaderSection.Frame = Frame;
PageHeaderSection.Header = Header;
PageHeaderSection.ActionButtons = ActionButtons;
PageHeaderSection.Filters = Filters;
