import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";

const MainLayout = () => {
    const [isHomeSidebarOpen, setIsHomeSidebarOpen] = useState(false);

    return (
        <>
            <Header
                isHomeSidebarOpen={isHomeSidebarOpen}
                setIsHomeSidebarOpen={setIsHomeSidebarOpen}
            />
            <Outlet context={{ isHomeSidebarOpen, setIsHomeSidebarOpen }} />
        </>
    )
}

export default MainLayout;