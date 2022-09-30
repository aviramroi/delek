import cx from "classnames";
import dayjs from "dayjs";
import { Timeline } from "flowbite-react";
import { useContext } from "react";

import { EType, events } from "../const/events";
import { MainContext } from "../context";

const labels = {
  arrival: "הגעה",
  leave: "עזיבה",
};

const Dot = ({ type }: { type: EType }) => {
  return (
    <div
      className={cx(
        " w-3 h-3 mt-2 rounded-full absolute translate-x-1/2 right-0 z-10 border border-white",
        {
          " bg-green-400": type === EType.ARRIVE,
          " bg-red-400": type === EType.LEAVE,
        }
      )}
    />
  );
};

export const Reports = () => {
  const { organizationId } = useContext(MainContext);
  return (
    <div className=" relative mt-8 h-11 grow overflow-y-scroll">
      {events

        .filter((ev) => {
          if (organizationId === 100) {
            return true;
          }
          if (ev.participant.tribe === organizationId) {
            return true;
          }
          return false;
        })

        .sort((a, b) => {
          return dayjs(b.time).valueOf() - dayjs(a.time).valueOf();
        })
        .map((ev) => {
          return (
            <div
              key={`${ev.type} - ${ev.participant.id}`}
              className="relative z-0 mr-2 after:absolute after:inset-y-0 after:right-0 after:h-36 after:border-r"
            >
              <Dot type={ev.type} />
              <div className=" pr-4">
                <div>
                  <Timeline.Time>
                    {dayjs(ev.time).format("DD/MM/YYYY - HH:mm")}
                  </Timeline.Time>
                  <Timeline.Title>
                    {ev.type === EType.ARRIVE ? labels.arrival : labels.leave}
                    {" - "}
                    {ev.participant.name}
                  </Timeline.Title>
                  <Timeline.Body>{ev.reason}</Timeline.Body>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};
