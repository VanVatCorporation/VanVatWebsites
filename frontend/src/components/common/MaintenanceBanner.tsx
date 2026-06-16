import React, { useState } from 'react';
import { Wrench, X } from 'lucide-react';

const MaintenanceBanner: React.FC = () => {
    const [isDismissed, setIsDismissed] = useState(false);

    if (isDismissed) return null;

    return (
        <div
            className="bg-gradient-to-r from-amber-900 to-amber-700 text-amber-50 text-sm overflow-hidden transition-all duration-400 ease-in-out"
            style={{ maxHeight: '80px' }}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <Wrench className="flex-shrink-0 w-4 h-4" />
                    <p className="truncate sm:whitespace-normal">
                        <strong>Thông báo bảo trì:</strong> Chúng tôi đang chuyển đổi nhà đăng ký tên miền — một số dịch vụ
                        có thể tạm thời gián đoạn.
                        <a href="https://services.vanvatcorp.com" className="ml-1 text-amber-200 underline hover:text-white">Xem trạng thái →</a>
                    </p>
                </div>
                <button
                    onClick={() => setIsDismissed(true)}
                    aria-label="Đóng thông báo"
                    className="flex-shrink-0 opacity-70 hover:opacity-100 transition p-1 rounded"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
};

export default MaintenanceBanner;
