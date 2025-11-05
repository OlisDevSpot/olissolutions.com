function DashboardTemplate({ children }: { children: React.ReactNode }) {
  return <div className="h-full animate-(--fade-in)">{children}</div>;
}

export default DashboardTemplate;
