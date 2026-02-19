import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from 'recharts';
import Card from '../Card';
import styles from './YieldChart.module.css';
import { generateYieldHistory } from '../../lib/mockVault';
import { useMemo } from 'react';

export default function YieldChart() {
    const data = useMemo(() => generateYieldHistory(), []);

    return (
        <Card className={styles.container}>
            <h2 className={styles.title}>Yield Accrual — Last 24h</h2>
            <div className={styles.chartWrapper}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <defs>
                            <linearGradient id="colorYield" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#FFD600" stopOpacity={0.15} />
                                <stop offset="95%" stopColor="#FFD600" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="4 4" stroke="var(--border)" vertical={false} />
                        <XAxis
                            dataKey="hour"
                            stroke="var(--muted)"
                            fontSize={11}
                            fontFamily="var(--font-data)"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={10}
                            interval={3}
                        />
                        <YAxis
                            stroke="var(--muted)"
                            fontSize={11}
                            fontFamily="var(--font-data)"
                            tickLine={false}
                            axisLine={false}
                            tickFormatter={(value) => `$${value}`}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: 'var(--void)',
                                borderColor: 'var(--border)',
                                borderRadius: '4px',
                                color: 'var(--accent)',
                                fontFamily: 'var(--font-data)'
                            }}
                            itemStyle={{ color: 'var(--accent)' }}
                            formatter={(value: number) => [`$${value.toFixed(2)}`, 'Yield']}
                            labelStyle={{ color: 'var(--muted)', marginBottom: '4px' }}
                        />
                        <Area
                            type="monotone"
                            dataKey="value"
                            stroke="var(--accent)"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorYield)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
}
