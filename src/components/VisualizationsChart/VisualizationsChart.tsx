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

// Define the props for the VisualizationsChart component
type Props = {
  // An array of labels for each line in the chart
  labels: string[] | undefined
  // An array of datasets, each containing an array of coordinates with dates and values
  data: [{ coordinates: [{ dates: [{ date: string; value: number }] }] }]
}

// Define the VisualizationsChart component
export const VisualizationsChart: FunctionComponent<Props> = ({
  labels,
  data,
}) => {
  // Declare a state variable for the chart data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [dataArray, setDataArray] = useState<any>()

  // Use the useEffect hook to transform the data into the format expected by the LineChart component
  useEffect(() => {
    // Extract the dates and values from each dataset
    const newDate = data.map((dataset) =>
      _.get(dataset, 'coordinates[0].dates')
    )
    const newa = [...newDate]

    // Merge the datasets into a single array of objects, where each object represents a unique date
    const merged = new Map()
    newa.forEach((arr, i) => {
      arr.forEach((obj) => {
        const { date, value } = obj
        const key = date.toString()
        if (!merged.has(key)) {
          merged.set(key, { date })
        }
        merged.get(key)[`value${i + 1}`] = value
      })
    })

    // Convert the map into an array and set it as the chart data
    setDataArray(Array.from(merged.values()))
  }, [])

  return (
    // Render the chart component within a responsive container

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
