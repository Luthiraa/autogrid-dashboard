import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import io from 'socket.io-client';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [stateData, setStateData] = useState([]);
    const [actionData, setActionData] = useState([]);
    const socket = io('http://localhost:5000');

    useEffect(() => {
        socket.on('connect', () => {
            setIsConnected(true);
        });

        socket.on('disconnect', () => {
            setIsConnected(false);
        });

        socket.on('update', (data) => {
            setStateData(prev => [...prev, data.state]);
            setActionData(prev => [...prev, data.action]);
        });

        return () => {
            socket.off('connect');
            socket.off('disconnect');
            socket.off('update');
        };
    }, []);

    const startSimulation = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/start', {
                method: 'POST',
            });
            const data = await response.json();
            if (data.status === 'started') {
                setIsRunning(true);
            }
        } catch (error) {
            console.error('Error starting simulation:', error);
        }
    };

    const stopSimulation = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/stop', {
                method: 'POST',
            });
            const data = await response.json();
            if (data.status === 'stopped') {
                setIsRunning(false);
            }
        } catch (error) {
            console.error('Error stopping simulation:', error);
        }
    };

    const stateChartData = {
        labels: stateData.map((_, index) => index),
        datasets: stateData[0]?.map((_, i) => ({
            label: `State ${i + 1}`,
            data: stateData.map(state => state[i]),
            borderColor: `hsl(${i * 60}, 70%, 50%)`,
            tension: 0.1
        })) || []
    };

    const actionChartData = {
        labels: actionData.map((_, index) => index),
        datasets: [{
            label: 'Actions',
            data: actionData,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    return (
        <div className="dashboard">
            <h1>Microgrid Dashboard</h1>
            <div className="controls">
                <button onClick={startSimulation} disabled={isRunning}>
                    Start Simulation
                </button>
                <button onClick={stopSimulation} disabled={!isRunning}>
                    Stop Simulation
                </button>
                <p>Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
            </div>
            
            <div className="charts">
                <div className="chart-container">
                    <h2>State Variables</h2>
                    <Line data={stateChartData} />
                </div>
                <div className="chart-container">
                    <h2>Actions</h2>
                    <Line data={actionChartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard; 