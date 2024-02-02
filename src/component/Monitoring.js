import React from 'react';
import "./Monitoring.css";

class GanttChart extends React.Component {
  render() {
    const { tasks } = this.props;

    let minDate = new Date(tasks[0].start);
    let maxDate = new Date(tasks[0].end);

    tasks.forEach(task => {
      if (task.start < minDate) {
        minDate = new Date(task.start);
      }
      if (task.end > maxDate) {
        maxDate = new Date(task.end);
      }
    });

    const chartWidth = 800;
    const dayWidth = chartWidth / ((maxDate - minDate) / (1000 * 60 * 60 * 24));

    return (
      <div className="gantt-chart-container">
        {tasks.map(task => (
          <div
            key={task.id}
            className="gantt-task"
            style={{
              top: `${(task.id - 1) * 40}px`,
              left: `${(new Date(task.start) - minDate) / (1000 * 60 * 60 * 24) * dayWidth}px`,
              width: `${(new Date(task.end) - new Date(task.start)) / (1000 * 60 * 60 * 24) * dayWidth}px`,
            }}
          >
            {task.name}
          </div>
        ))}
      </div>
    );
  }
}

class GanttPage extends React.Component {
  render() {
    const tasks = [
      {
        id: '1',
        start: new Date(2024, 0, 1), // Week 1
        end: new Date(2024, 0, 7), // Week 1
        name: 'Analisis kebutuhan',
      },
      {
        id: '2',
        start: new Date(2024, 0, 1), // Week 1
        end: new Date(2024, 0, 7), // Week 1
        name: 'Flow chart aplikasi',
      },
      {
        id: '3',
        start: new Date(2024, 0, 8), // Week 2
        end: new Date(2024, 0, 21), // Week 3
        name: 'Design UI',
      },
      {
        id: '4',
        start: new Date(2024, 0, 15), // Week 3
        end: new Date(2024, 1, 25), // Week 6
        name: 'Pengembangan Frontend',
      },
      {
        id: '5',
        start: new Date(2024, 0, 8), // Week 2
        end: new Date(2024, 1, 19), // Week 5
        name: 'Pengembangan Backend',
      },
      {
        id: '6',
        start: new Date(2024, 1, 26), // Week 6
        end: new Date(2024, 2, 4), // Week 7
        name: 'Pengujian Aplikasi',
      },
      {
        id: '7',
        start: new Date(2024, 2, 5), // Week 7
        end: new Date(2024, 2, 11), // Week 8
        name: 'Installasi Aplikasi',
      },
      {
        id: '8',
        start: new Date(2024, 2, 12), // Week 8
        end: new Date(2024, 2, 18), // Week 8
        name: 'Dokumentasi Aplikasi',
      },

    ];

    return (
      <div className="gantt-page-container">
        <h1>Gantt Chart</h1>
        <table className="gantt-table">
          <thead>
            <tr>
              <th>Week 1</th>
              <th>Week 2</th>
              <th>Week 3</th>
              <th>Week 4</th>
              <th>Week 5</th>
              <th>Week 6</th>
              <th>Week 7</th>
              <th>Week 8</th>
            </tr>
          </thead>
        </table>
        <GanttChart tasks={tasks} />
      </div>
    );
  }
}
export default GanttPage;
