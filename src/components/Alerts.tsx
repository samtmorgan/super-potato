import React, { memo, useState } from 'react';
import { WeatherAlert, WeatherTimeRangeType } from '@/types/types';
import { FiAlertTriangle } from 'react-icons/fi';
import Modal from 'react-modal';
import format from 'date-fns/format';

const AlertSummary = memo(function WarningSummary({ event }: { event: string }) {
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

function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return format(date, 'HHMM dd/MM/yyyy');
}

const AlertTimeRange = memo(function AlertTimeRange({ start, end }: WeatherTimeRangeType) {
  const alertRange = `From ${parseTimestamp(start)} to ${parseTimestamp(end)}`;
  return <p>{alertRange}</p>;
});

export function Alerts({ alerts }: { alerts: WeatherAlert[] }) {
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
        ariaHideApp={false}
        isOpen={alertModalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        // style={customStyles}
        contentLabel="Example Modal"
        className="modal"
      >
        <div
          className="
                rounded-lg 
                h-full
                w-full 
                p-5 
                flex 
                flex-col 
                items-center 
                justify-between                 
                outline
                outline-slate-800
                outline-1	
                bg-sky-100
                "
        >
          <span className="w-full break-all">
            <AlertSummary event={alerts[0].event} />
            <AlertTimeRange start={alerts[0].start} end={alerts[0].end} />
            <p className="self-start">{alerts[0].senderName}</p>
            <p>{alerts[0].description}</p>
          </span>
          <button
            type="button"
            data-testid="alerts"
            onClick={closeModal}
            className={`
                px-3
                py-1
                flex 
                gap-2 
                flex-col
                items-center 
                justify-between  
                outline
                outline-slate-800
                outline-1
                rounded-full
                hover:outline-2        
                hover:disabled:bg-transparent
                active:bg-sky-400/30
                w-max
            `}
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
}
