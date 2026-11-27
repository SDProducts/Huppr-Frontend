import Button from "@/components/ui/CustomButton";
import { formatNumber } from "@/utils/currency.utils";
import { AlertTriangle, ClipboardClock, Users2 } from "lucide-react";

const PayrollModal = () => {
  return (
    <div className="sm:px-10 sm:py-5 space-y-4">
      <div className="flex items-start gap-2">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-red-100 text-red-500">
          <AlertTriangle />
        </div>
        <div className="flex-1">
          <div className="text-lg font-semibold">Payroll Closing Today</div>
          <div className="">
            Action required before 5:00 PM EST to ensure timely employee
            deposits.
          </div>
        </div>
      </div>
      <div className="bg-blue-50 rounded-lg p-4 divide-y divide-gray-300">
        <div className="flex justify-between items-center px-2 py-4">
          <div className="">Estimated Total</div>
          <div className="text-2xl font-bold">
            {formatNumber({ amount: 40507840 })}
          </div>
        </div>
        <div className="px-2 py-4 space-y-2">
          <div className="flex justify-between">
            <div className="flex items-center gap-1">
              <Users2 size={14} />
              <div className="flex-1">Active Employees</div>
            </div>
            <div className="">142</div>
          </div>
          <div className="flex justify-between text-red-500">
            <div className="flex items-center gap-1">
              <ClipboardClock size={14} />
              <div className="flex-1">Pending timesheets</div>
            </div>
            <div className="">3 needs review</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        <Button
          label="Review Timesheets"
          className="text-lg text-primary! bg-transparent"
        />
        <Button label="Process Payroll" className="text-lg" />
      </div>
    </div>
  );
};

export default PayrollModal;
