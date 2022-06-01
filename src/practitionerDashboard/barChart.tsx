import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'All',
    "pending": 23,
    "auto": 14
  },
  {
    name: 'New',
    "completed": 4,
    "pending": 12,
    "auto": 10
  }
];  


export default function BarChartDerm(){ 
  return (
        <BarChart
          width={260}
          height={350}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="completed" stackId="b" fill="#0398fc" />
          <Bar dataKey="pending" stackId="b" fill="#ffc658"/>
          <Bar dataKey="auto" stackId="a" fill="#8884d8" />
        </BarChart>
    );
  }
  