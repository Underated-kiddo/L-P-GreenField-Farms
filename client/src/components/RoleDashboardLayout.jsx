import Sidebar from "../components/Sidebar";

const RoleDashboardLayout = ({ role, active, children }) => {
  return (
    <div className="flex">
      <Sidebar role={role} active={active} />
      <main className="flex-1 p-6 bg-white dark:bg-black min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default RoleDashboardLayout;