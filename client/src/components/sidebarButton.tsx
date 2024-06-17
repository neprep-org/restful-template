const SideBarButton = ({ children, isActive, onClick }: any) => {
  return (
    <button
      onClick={onClick}
      className={`w-full px-4 py-2 my-2 rounded hover:bg-white hover:text-primary hover:cursor-pointer ${
        isActive ? "bg-white text-primary" : " text-white"
      }`}
    >
      {children}
    </button>
  );
};

export default SideBarButton;
