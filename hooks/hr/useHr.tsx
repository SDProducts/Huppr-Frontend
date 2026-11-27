import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useGetEmployees = (filters: EmployeeFilters = {}) => {
  const {
    employeeId,
    departmentId,
    payrollId,
    page,
    limit,
    date,
    search,
    status,
  } = filters;

  return useQuery<EmployeesResponse>({
    queryKey: ["employees", filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (employeeId) params.append("employeeId", employeeId);
      if (departmentId) params.append("departmentId", departmentId);
      if (payrollId) params.append("payrollId", payrollId);
      if (status) params.append("status", status);
      if (search) params.append("search", search);
      if (date) params.append("date", date);
      if (page) params.append("page", String(page));
      if (limit) params.append("limit", String(limit));

      const response = await api.get(
        `/employer/hr/employees?${params.toString()}`
      );
      return response.data;
    },
  });
};
