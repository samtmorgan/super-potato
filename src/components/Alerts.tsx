import React, { ReactElement, memo, useState } from 'react';
import { WeatherAlert, WeatherTimeRangeType } from '@/types/types';
import { FiAlertTriangle } from 'react-icons/fi';
// import Modal from 'react-modal';
import format from 'date-fns/format';
import { Modal } from './Modal';

function parseTimestamp(timestamp: number) {
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

  function openModal() {
    setAlertModalOpen(true);
  }

  const closeModal = () => {
    setAlertModalOpen(false);
  };

  return (
    <>
      <button
        type="button"
        data-testid="alerts"
        onClick={openModal}
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
        m-5
    `}
      >
        <AlertSummary event={alerts[0].event} />
      </button>
      <Modal
        open={alertModalOpen}
        onClose={closeModal}
        title={`${alerts[0].senderName} ${alerts[0].event}`}
        body={<ModalBody alert={alerts[0]} />}
      />
    </>
  );
}
