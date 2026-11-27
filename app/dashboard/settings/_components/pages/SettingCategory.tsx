"use client";
import { PageLoader } from "@/components/global/PageLoader";
import { settingCategories } from "@/data/constants";
import { useParams } from "next/navigation";

export default function SettingCategory() {
  const { category } = useParams();
  const setting = settingCategories.settings.find(
    (i) => i.path === String(category)
  );
  const moduleSetting = settingCategories.modules.find(
    (i) => i.path === String(category)
  );
  const Component = setting?.component || moduleSetting?.component;
  return <div>{Component ? <Component /> : <PageLoader />}</div>;
}
