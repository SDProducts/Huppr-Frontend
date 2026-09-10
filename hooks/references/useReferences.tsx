import api from "@/lib/axios.config";
import { useQuery } from "@tanstack/react-query";

export const useGetIndustries = () => {
  return useQuery<IndustriesRefResponse>({
    queryKey: ["ref-industries"],
    queryFn: async () => {
      const response = await api.get("/reference/industries");
      return response.data;
    },
  });
};
export const useGetDepartments = () => {
  return useQuery<SuggestionsResponse>({
    queryKey: ["ref-departmnts"],
    queryFn: async () => {
      const response = await api.get("/reference/departments/suggestions");
      return response.data;
    },
  });
};
export const useGetDepartmentIcons = () => {
  return useQuery<DepartmentIconResponse>({
    queryKey: ["ref-departmnt-icons"],
    queryFn: async () => {
      const response = await api.get("/reference/department-icons");
      return response.data;
    },
  });
};
export const useGetTimeZones = () => {
  return useQuery<TimeZonesResponse>({
    queryKey: ["ref-timezones"],
    queryFn: async () => {
      const response = await api.get("/reference/timezones");
      return response.data;
    },
  });
};
export const useGetCountries = () => {
  return useQuery<CountryResponse>({
    queryKey: ["ref-countries"],
    queryFn: async () => {
      const response = await api.get("/reference/countries");
      return response.data;
    },
  });
};
export const useGetLocales = () => {
  return useQuery<LocaleResponse>({
    queryKey: ["ref-locales"],
    queryFn: async () => {
      const response = await api.get("/reference/locales");
      return response.data;
    },
  });
};
