import { useTranslation } from "react-i18next";

export default function GroupsList() {
  const { t, i18n } = useTranslation();

  return (
    <>
       <div>{t("groups")}</div>

      
    </>
  );
}
