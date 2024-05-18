import _ from 'lodash'
import * as Styled from './VisualizationsChart.styled'
import React, { FunctionComponent, useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from 'recharts'

/**
 * @typedef {object} Props
 * @property {string} [label] - Labels for the datasets
 * @property { {coordinates: [{ dates: [{ date: string; value: number }] }]} } data - datasets
 */
export type Props = {
  labels: string[] | undefined
  data: [{ coordinates: [{ dates: [{ date: string; value: number }] }] }]
}

/**
 * @component
 * VisualizationChart
 * @description
 * A rechart-based line chart component for displaying multiple data sets with custom labels.
 * @param {Object} Props - The props object for the VisualizationsChart component.
 * @param {Array<string>|undefined} Props.labels - An optional array of custom labels for each data set.
 * @param {Array<Object>} Props.data - An array of data sets with coordinates and dates values.
 * @returns {JSX.Element} A React component for a line chart with the specified data sets and labels.
 * @example
 * <VisualizationsChart
 * labels={['Dataset 1', 'Dataset 2']}
 * data={[
 * {
 *   coordinates: [
 *     {
 *       dates: [
 *         { date: '2021-01-01', value: 100 },
 *         { date: '2021-01-02', value: 200 },
 *         { date: '2021-01-03', value: 300 },
 *       ],
 *     },
 *   ],
 * },
 * {
 *   coordinates: [
 *     {
 *       dates: [
 *         { date: '2021-01-01', value: 150 },
 *         { date: '2021-01-02', value: 250 },
 *         { date: '2021-01-03', value: 350 },
 *       ],
 *     },
 * },
 * ]}
 * />
 */
export const VisualizationsChart: FunctionComponent<Props> = ({
  labels,
  data,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataArray, setDataArray] = useState<any>()

  useEffect(() => {
    const newDate = data.map((dataset) =>
      _.get(dataset, 'coordinates[0].dates')
    )
    const newArray = [...newDate]

    const merged = new Map()
    newArray.forEach((arr, i) => {
      arr.forEach((obj) => {
        const { date, value } = obj

        const dateObject = new Date(date);
        const dateString = `${dateObject.getFullYear()}-${dateObject.getMonth()}-${dateObject.getDate()} ${(dateObject.getUTCHours() > 12) ? dateObject.getUTCHours() - 12 + " PM" : dateObject.getUTCHours() + " AM"}`

        const key = dateString.toString()
        if (!merged.has(key)) {
          merged.set(key, { date: dateString })
        }
        merged.get(key)[`value${i + 1}`] = value

      })
    })
    // console.log(Array.from(merged.values()))
    setDataArray(Array.from(merged.values()))
  }, [])

  return (
    <Styled.wrapper>
      <ResponsiveContainer>
        <LineChart
          data={dataArray}
          margin={{ top: 0, left: 0, right: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="5 5" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip contentStyle={{ color: 'black' }} />
          <Legend />
          <Line
            type="monotone"
            dataKey="value1"
            stroke="#CA472F"
            strokeWidth={1.5}
            name={labels?.[0]}
            dot={{ r: 0 }}
            activeDot={{ r: 8 }}
          />
          {labels?.[1] && (
            <Line
              type="monotone"
              dataKey="value2"
              stroke="#2884A5"
              name={labels?.[1]}
              dot={{ r: 1 }}
              activeDot={{ r: 8 }}
            />
          )}
          {labels?.[2] && (
            <Line
              type="monotone"
              dataKey="value3"
              stroke="#4F3E79"
              name={labels?.[2]}
              dot={{ r: 1 }}
              activeDot={{ r: 8 }}
            />
          )}

          {labels?.[3] && (
            <Line
              type="monotone"
              dataKey="value4"
              stroke="#F6C85F"
              name={labels?.[3]}
              dot={{ r: 1 }}
              activeDot={{ r: 8 }}
            />
          )}
          {labels?.[4] && (
            <Line
              type="monotone"
              dataKey="value5"
              stroke="#216D41"
              name={labels?.[4]}
              dot={{ r: 1 }}
              activeDot={{ r: 8 }}
            />
          )}

          {labels?.[5] && (
            <Line
              type="monotone"
              dataKey="value6"
              stroke="#B26E39"
              name={labels?.[5]}
              dot={{ r: 1 }}
              activeDot={{ r: 8 }}
            />
          )}
          <Brush dataKey="date" height={30} stroke="#8884d8" />
          <ReferenceLine stroke="#000000" />
        </LineChart>
      </ResponsiveContainer>
    </Styled.wrapper>
  )
}

export default VisualizationsChart
