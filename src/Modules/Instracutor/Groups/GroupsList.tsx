import { useTranslation } from "react-i18next";

export default function GroupsList() {
  const { t } = useTranslation();

  return (
    <>
       <div>{t("groups")}</div>

      
    </>
  );
}
