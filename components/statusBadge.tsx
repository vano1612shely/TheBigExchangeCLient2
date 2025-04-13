import {FC, useState} from "react";
import axios from "axios";
import api from "@/services/api/interceptors";

export type StatusType = "IN_PROGRESS" | "PAYOUT_PROCESS" | "COMPLETED" | "CANCELED";

interface StatusBadgeProps {
    status: StatusType;
    requestId: number;
    onUpdate?: (newStatus: StatusType) => void;
}
const STATUS_CODE = {
    IN_PROGRESS: 0,
    PAYOUT_PROCESS: 1,
    COMPLETED: 2,
    CANCELED: 3
}

const STATUS_MAP: Record<StatusType, { label: string; color: string }> = {
    IN_PROGRESS: {
        label: "В роботі",
        color: "bg-blue-100 text-blue-800",
    },
    PAYOUT_PROCESS: {
        label: "Процес виплати",
        color: "bg-blue-100 text-blue-800",
    },
    COMPLETED: {
        label: "Завершена",
        color: "bg-green-100 text-green-800",
    },
    CANCELED: {
        label: "Скасована",
        color: "bg-red-100 text-red-800",
    },
};

export const StatusBadge: FC<StatusBadgeProps> = ({ status, requestId, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [currentStatus, setCurrentStatus] = useState<StatusType>(status);
    const statusObj = STATUS_MAP[currentStatus];

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value as StatusType;
        try {
            await api.post("/client/setStatus", {
                requestId: requestId,
                status: STATUS_CODE[newStatus],
            });

            setCurrentStatus(newStatus);
            onUpdate?.(newStatus);
        } catch (error) {
            console.error("Помилка при оновленні статусу", error);
        } finally {
            setIsEditing(false);
        }
    };

    return isEditing ? (
        <select
            className="truncate text-xs px-2 py-1 rounded-md border border-gray-300"
            value={currentStatus}
            onChange={handleChange}
            onBlur={() => setIsEditing(false)}
            autoFocus
        >
            {Object.entries(STATUS_MAP).map(([value, data]) => (
                <option key={value} value={value}>
                    {data.label}
                </option>
            ))}
        </select>
    ) : (
        <span
            className={`truncate px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${statusObj.color}`}
            onClick={() => setIsEditing(true)}
            title="Змінити статус"
        >
      {statusObj.label}
    </span>
    );
};