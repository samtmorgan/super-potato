import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, YAxis } from 'recharts';
import { TickPropType } from '../types/types';
import { useAppContext } from '../context/AppContext';

const customTick = ({ x, y, payload }: TickPropType) => {
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        fontWeight={payload.value === 0 ? 'bold' : 'normal'}
        textAnchor="start"
        fill="#51799E"
        fontSize={12}
      >
        {payload.value === 0 ? 'Now' : `${payload.value}m`}
      </text>
    </g>
  );
};

export function HourPrecipitation() {
  const { weatherAssets } = useAppContext();

  const data = useMemo(() => {
    if (!weatherAssets?.hourPrecipitation) {
      return null;
    }
    if (weatherAssets.hourPrecipitation.every((minute: { precipitation: number }) => minute.precipitation === 0)) {
      return 'no precipitation';
    }
    return weatherAssets.hourPrecipitation.map((minute: { precipitation: number }, index: any) => {
      return {
        m: index,
        precipitation: minute.precipitation,
      };
    });
  }, [weatherAssets?.hourPrecipitation]);

  if (!data) {
    return <section aria-label="rain in the next hour has no data" />;
  }

  if (data === 'no precipitation') {
    return (
      <section className=" mt-4" aria-label="rain in the next hour has no data">
        <h2 className="text-sm pl-1">No rain forecast for the hour</h2>
      </section>
    );
  }

  return (
    <section
      aria-label="Hour precipitation"
      className={`
        font-regular 
        flex 
        flex-col
        justify-center
        mt-4
        p-3
        pb-0
        gap-2
        bg-white/20
        rounded-md
    `}
    >
      <h2 className="text-sm pl-1">Rain Forecast</h2>
      <BarChart aria-label="precipitation chart" width={250} height={70} data={data}>
        <CartesianGrid
          stroke="#999"
          strokeDasharray="3, 3"
          vertical={false}
          horizontalCoordinatesGenerator={({ yAxis }) => {
            const factor = yAxis.height / yAxis.domain.at(-1);
            const arr = Array.from(Array(Math.ceil(yAxis.domain.at(-1))).keys());
            return arr.map((tick: number) => tick * factor + 5);
          }}
        />
        <Bar dataKey="precipitation" fill="#0ea5e9" shape={<Rectangle radius={[2, 2, 0, 0]} />} />
        <XAxis tickSize={4} dataKey="m" ticks={[0, 10, 20, 30, 40, 50]} domain={[0, 'auto']} tick={customTick} />
        <YAxis
          axisLine={false}
          tickLine={false}
          domain={[0, 3]}
          width={1}
          dataKey="precipitation"
          tick={{ fontSize: 15 }}
        />
      </BarChart>
    </section>
  );
}
