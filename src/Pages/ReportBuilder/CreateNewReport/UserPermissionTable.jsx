;

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
        <div className="bg-white dark:bg-gray-900 transition-colors">

            {/* Header */}
            <div className="flex items-center justify-between px-1 py-3">

                <h3 className="text-sm font-semibold text-[#252C58] dark:text-gray-200">
                    Allow Users to View this report
                </h3>

                <button
                    onClick={selectAll}
                    className="text-[#8629df] text-sm font-medium 
          bg-[#F7F2FD] dark:bg-[#2b1d3f] 
          p-1 rounded-sm px-2"
                >
                    Select All
                </button>

            </div>

            {/* Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">

                {/* Table Header */}
                <div className="grid grid-cols-3 bg-primary text-white text-xs px-4 py-3">

                    <div>User</div>

                    <div>DESCRIPTION</div>

                    <div className="text-center">Select</div>

                </div>

                {/* Scroll Body */}
                <div className="max-h-[200px] overflow-y-auto table-scroll ">

                    {users.map((u, i) => (

                        <div
                            key={i}
                            className="grid grid-cols-3 px-4 py-3 items-center border-b
              border-gray-200 dark:border-gray-700
             text-Primary
              hover:bg-gray-50 dark:hover:bg-gray-800
              transition"
                        >

                            <div className="text-gray-700 dark:text-gray-200">
                                {u.role}
                            </div>

                            <div className="text-gray-600 dark:text-gray-400">
                                {u.desc}
                            </div>

                            <div className="flex justify-center">

                                <Switch
                                    checked={u.enabled}
                                    onCheckedChange={() => toggleUser(i)}
                                    className="
                  data-[state=checked]:bg-[#8629DF]
                  data-[state=unchecked]:bg-gray-300
                  dark:data-[state=unchecked]:bg-gray-600
                  "
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