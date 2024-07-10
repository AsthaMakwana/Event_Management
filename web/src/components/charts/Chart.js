import React from 'react'
import './chart.css'
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    YAxis,
} from "recharts";
import { Users } from 'lucide-react'
const Chart = ({ count }) => {

    // fetch the user data and set data according to country 

    const data = [
        { name: "India", Total: count.india !== '' ? count.india : 0 },
        { name: "USA", Total: count.usa !== '' ? count.usa : 0 },
        { name: "London", Total: count.uk !== '' ? count.uk : 0 },
        { name: "Australia", Total: count.australia !== '' ? count.australia : 0 },
        { name: "Italy", Total: count.italy !== '' ? count.italy : 0 },
    ];
    return (
        <div className="card__wrapper pb-0 shadow-lg">
            <div className="card__header">
                <div className="card__header-top">
                    <div className="card__title-inner">
                        <div className="card__header-icon" style={{ marginBottom: '10px', marginRight: '10px' }}>
                            <Users absoluteStrokeWidth size={30} />
                        </div>
                        <div className="card__header-title">
                            <h4 style={{ fontSize: '1.2rem' }}>Region Wise Buyers Count</h4>
                        </div>
                    </div>
                </div>
         
                <div className="Card__line-chart">
                    <ResponsiveContainer width="100%" aspect={2 / 1}>
                        <AreaChart
                            width={250}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#F7426F" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#F7426F" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="gray" />
                            <YAxis />
                            <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
                            <Tooltip />
                            <Area
                                type="monotone"
                                dataKey="Total"
                                stroke="#F7426F"
                                fillOpacity={1}
                                fill="url(#total)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            
            </div>
        </div>
    )
}

export default Chart
