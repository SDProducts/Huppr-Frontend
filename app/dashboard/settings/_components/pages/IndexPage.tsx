import SettingItemCard from "@/app/dashboard/settings/_components/SettingItemCard";
import { settingCategories } from "@/data/constants";

export default function IndexPage() {
  return (
    <div>
      <div className="py-10 space-y-6">
        <div className="">
          <h2 className="text-4xl font-bold">Settings</h2>
          <p>Manage your company settings, configurations and preferences.</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {settingCategories.settings.map((s, i) => (
            <SettingItemCard item={s} key={i} />
          ))}
        </div>
      </div>
      <div className="py-10 space-y-6">
        <div className="">
          <h2 className="text-4xl font-bold">Module Settings</h2>
          <p>Configure settings for specific Huppr modules..</p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {settingCategories.modules.map((s, i) => (
            <SettingItemCard item={s} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
