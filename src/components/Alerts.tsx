import React, { ReactElement, memo, useMemo, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import format from 'date-fns/format';
import { WeatherAlert, WeatherTimeRangeType } from '../types/types';
import { Modal } from './Modal';

function parseTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000);
  return format(date, 'HHMM dd/MM/yyyy');
}

const AlertTimeRange = memo(function AlertTimeRange({ start, end }: WeatherTimeRangeType): ReactElement {
  const alertRange = `From ${parseTimestamp(start)} to ${parseTimestamp(end)}`;
  return <p>{alertRange}</p>;
});

const AlertSummary = memo(function WarningSummary({ event }: { event: string }): ReactElement {
  return (
    <div
      className="
        flex 
        gap-2 
        items-center 
        "
    >
      <FiAlertTriangle />
      <p>{event}</p>
    </div>
  );
});

function ModalBody({ alert }: { alert: WeatherAlert }): ReactElement {
  return (
    <span className="w-full break-word">
      {/* <AlertSummary event={alert.event} /> */}
      <AlertTimeRange start={alert.start} end={alert.end} />
      <p className="self-start">{alert.senderName}</p>
      <p>{alert.description}</p>
    </span>
  );
}

export function Alerts({ alerts }: { alerts: WeatherAlert[] }): ReactElement {
  const [alertModalOpen, setAlertModalOpen] = useState(false);
  const [clickedAlert, setClickedAlert] = useState<number | null>(null);

  function openModal(index: number) {
    setClickedAlert(index);
    setAlertModalOpen(true);
  }

  const closeModal = () => {
    setAlertModalOpen(false);
  };

  const alertModalTitle = useMemo(() => {
    if (clickedAlert === null) return 'There was a problem getting the data';
    return `${alerts[clickedAlert].senderName} ${alerts[clickedAlert].event}`;
  }, [clickedAlert, alerts]);

  const alertModalBody = useMemo(() => {
    if (clickedAlert === null) return <p>There was a problem getting the data</p>;
    return <ModalBody alert={alerts[clickedAlert]} />;
  }, [clickedAlert, alerts]);

  return (
    <>
      <div className="flex flex-col items-center gap-2  mt-5">
        {alerts.map((alert, index) => (
          <button
            type="button"
            data-testid="alerts"
            onClick={() => openModal(index)}
            className={`
                px-3
                py-1
                outline
                outline-slate-800
                outline-1
                rounded-full
                hover:outline-2        
                hover:disabled:bg-transparent
                active:bg-sky-400/30
            `}
          >
            <AlertSummary event={alert.event} />
          </button>
        ))}
      </div>
      <Modal open={alertModalOpen} onClose={closeModal} title={alertModalTitle} body={alertModalBody} />
    </>
  );
}
