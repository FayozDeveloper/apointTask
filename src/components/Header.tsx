import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Bell, Settings } from 'lucide-react'
import {useAuth} from "../context/AuthContext.tsx";
export default function Header() {
    const {logout} = useAuth();

    return (
        <header className='w-full shadow p-4 mb-4 flex items-center justify-between'>
            <h2 className='text-xl font-semibold'>Welcome user</h2>
            <div className='flex items-center gap-6'>
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild className='cursor-pointer'>
                        <button className="relative select-none focus:outline-none">
                            <Bell className="w-7 h-7 text-gray-700" />
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="bg-gray-50 shadow-xl rounded-md w-64 p-4">
                        <DropdownMenu.Item className="p-2 text-sm hover:bg-blue-50 cursor-pointer focus:outline-none">Notify1</DropdownMenu.Item>
                        <DropdownMenu.Item className="p-2 text-sm hover:bg-blue-50 cursor-pointer focus:outline-none">Notify2</DropdownMenu.Item>
                        <DropdownMenu.Item className="p-2 text-sm hover:bg-blue-50 cursor-pointer focus:outline-none">Notify3</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>

                {/* Settings Dropdown Section*/}
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger asChild className='cursor-pointer'>
                        <button className="select-none focus:outline-none">
                            <Settings className="w-7 h-7 text-gray-700" />
                        </button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="bg-gray-50 shadow-xl rounded-md w-48 p-4">
                        <DropdownMenu.Item className="p-2 text-sm hover:bg-blue-50 cursor-pointer focus:outline-none">Profile</DropdownMenu.Item>
                        <DropdownMenu.Item className="p-2 text-sm hover:bg-blue-50 cursor-pointer focus:outline-none">Settings</DropdownMenu.Item>
                        <DropdownMenu.Item className="p-2 text-sm hover:bg-blue-50 cursor-pointer focus:outline-none" onClick={logout}>Logout</DropdownMenu.Item>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
            </div>
        </header>
    )
}
