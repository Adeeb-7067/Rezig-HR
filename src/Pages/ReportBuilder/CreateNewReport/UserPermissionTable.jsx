import { useState } from "react";
import { Switch } from "@/components/ui/switch";

const UserPermissionTable = () => {

    const initialUsers = [
        { role: "HR", desc: "HR", enabled: true },
        { role: "Admin", desc: "Admin", enabled: false },
        { role: "Manager", desc: "Manager", enabled: false },
        { role: "Dipti head", desc: "Dipti Head Assistant", enabled: false },
        { role: "Admin", desc: "Admin", enabled: false },
        { role: "Manager", desc: "Manager", enabled: false },
        { role: "Dipti head", desc: "Dipti Head Assistant", enabled: false },
    ];

    const [users, setUsers] = useState(initialUsers);

    const toggleUser = (index) => {
        const updated = [...users];
        updated[index].enabled = !updated[index].enabled;
        setUsers(updated);
    };

    const selectAll = () => {
        const allSelected = users.every((u) => u.enabled);

        const updated = users.map((u) => ({
            ...u,
            enabled: !allSelected,
        }));

        setUsers(updated);
    };

    return (
        <div className="bg-white dark:bg-gray-800 transition-colors">

            {/* Header */}
            <div className="flex items-center justify-between px-1 py-2">

                <h3 className="text-[0.8rem] font-bold text-gray-500 dark:text-gray-300">
                    Allow Users to View this report
                </h3>

                <button
                    onClick={selectAll}
                    className="text-ds-primary text-[0.65rem] font-bold 
          bg-[#F7F2FD] dark:bg-[#2b1d3f] 
          p-1 px-2 rounded-sm border border-purple-100 dark:border-ds-primary/80 hover:bg-ds-primary hover:text-white transition-all"
                >
                    Select All
                </button>

            </div>

            {/* Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-sm overflow-hidden shadow-sm">

                {/* Table Header */}
                <div className="grid grid-cols-3 ds-bg-primary text-white text-[0.65rem] font-bold uppercase tracking-wider px-4 py-2">

                    <div>User</div>

                    <div>DESCRIPTION</div>

                    <div className="text-center">Select</div>

                </div>

                {/* Scroll Body */}
                <div className="max-h-[200px] overflow-y-auto table-scroll no-scrollbar bg-white dark:bg-gray-800">

                    {users.map((u, i) => (

                        <div
                            key={i}
                            className="grid grid-cols-3 px-4 py-2 items-center border-b
               border-gray-100 dark:border-gray-700
              ds-text-xs
               hover:bg-gray-50 dark:hover:bg-gray-700/30
               transition-all"
                        >

                            <div className="text-gray-600 dark:text-gray-200 font-medium">
                                {u.role}
                            </div>

                            <div className="text-gray-500 dark:text-gray-400">
                                {u.desc}
                            </div>

                            <div className="flex justify-center">

                                <Switch
                                    checked={u.enabled}
                                    onCheckedChange={() => toggleUser(i)}
                                    className="scale-75 data-[state=checked]:bg-ds-primary data-[state=checked]:border-ds-primary data-[state=unchecked]:bg-gray-200 dark:data-[state=unchecked]:bg-gray-700"
                                />

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>
    );
};

export default UserPermissionTable;