import { Badge, Text, Title2 } from "@fluentui/react-components";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { fluentStyles } from "../../styles/fluent";

export const expiredStyle = {
  color: "red",
};

export function CountdownSec(props: { second: number; epochTime?: number }) {
  const [epochTime, setEpochTime] = useState(props.epochTime);
  const [sec, setSec] = useState(props.second ?? 0);
  const fluentStyle = fluentStyles();
  const { t } = useTranslation();

  useEffect(() => {
    if (epochTime && epochTime !== props.epochTime) {
      setEpochTime(props.epochTime);
      setSec(Math.floor((epochTime - Date.now()) / 1000));
    }
    const timer = setTimeout(() => {
      if (epochTime) {
        setSec(Math.floor((epochTime - Date.now()) / 1000));
      } else {
        setSec(sec - 1);
      }
    }, 1000);
    if (sec <= 0) {
      clearTimeout(timer);
    }
    // Cleanup
    return () => clearTimeout(timer);
  }, [sec]);
  return (
    <div className="countdownSec number">
      {sec < 180 ? <ArrivingBadge /> : null}

      {sec > 0 ? (
        <Title2 className={fluentStyle.number}>
          {Math.floor(sec / 60) >= 1
            ? `${Math.floor(sec / 60)}${t("eta.minuteShort")} `
            : `${sec % 60}${t("eta.secondShort")}`}
        </Title2>
      ) : null}

      {sec % 60 !== 0 && Math.floor(sec / 60) >= 1 ? (
        <Text className={fluentStyle.number}>{`${sec % 60}${t(
          "eta.secondShort"
        )}`}</Text>
      ) : null}
    </div>
  );
}

function ArrivingBadge() {
  const { t } = useTranslation();

  return (
    <div className="badge arriving">
      <Badge color="danger" shape="rounded">
        {t("badge.arriving")}
      </Badge>
    </div>
  );
}
