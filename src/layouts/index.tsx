import type {ReactNode} from "react";
import Sidebar from "../components/Sidebar.tsx";
import Header from "../components/Header.tsx";


export default function Layout({ children } : {children: ReactNode}){
    return(
        <div className='flex'>
            <Sidebar/>
            <div className='flex-1'>
                <Header/>
                <main className='p-4'>{children}</main>
            </div>
        </div>
    )
}