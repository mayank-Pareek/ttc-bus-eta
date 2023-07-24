import { Link as LinkFluent, Title1 } from "@fluentui/react-components";
// eslint-disable-next-line no-unused-vars
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";

import "./yrt.css";

export default function YRTHeader() {
  const { t } = useTranslation();

  return (
    <div className="container yrt">
      <header className="navBar">
        <Link
          className="routerLink yrt"
          to={"/yrt"}
          title={t("home.title.tooltip") ?? ""}
        >
          <LinkFluent>
            <Title1 className="yrt text-xl font-bold">
              YRT arrivals (experimental!)
            </Title1>
          </LinkFluent>
        </Link>
      </header>
      <Outlet />
    </div>
  );
}
