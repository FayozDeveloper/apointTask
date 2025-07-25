import {NavLink} from "react-router-dom";


export default function Sidebar() {

    const linkClass = ({ isActive }: { isActive: boolean }) =>
        `px-3 py-2 rounded transition ${
            isActive ? 'bg-blue-500 text-white' : 'text-white hover:bg-gray-700'
        }`

    return (
        <>
            <aside className='w-64 h-screen bg-gray-800 text-white p-4'>
                <h1 className='text-xl font-bold mb-6 p-3'>Admin Panel</h1>
                <nav className='flex flex-col space-y-3'>
                    <NavLink to="/" className={linkClass}>Dashboard</NavLink>
                    <NavLink to="/materials" className={linkClass}>Materials</NavLink>
                    <NavLink to="/users" className={linkClass}>Users</NavLink>
                    <NavLink to="/settings" className={linkClass}>Settings</NavLink>
                </nav>
            </aside>
        </>
    )
}