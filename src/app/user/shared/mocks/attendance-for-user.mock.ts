export const attendanceForUserMock = [
  {
    day: 'MO',
    date: new Date(2018, 10, 28),
    timeRecords: [
      { from: new Date(2018, 10, 28, 7, 15), to: new Date(2018, 10, 28, 10, 55), type: 'work' },
      {
        from: new Date(2018, 10, 28, 11, 30),
        to: new Date(2018, 10, 28, 15, 10),
        type: 'work',
      },
    ],
  },
  {
    day: 'TU',
    date: new Date(2018, 10, 28),
    timeRecords: [
      { from: new Date(2018, 10, 28, 7, 30), to: new Date(2018, 10, 28, 9, 30), type: 'work' },
      {
        from: new Date(2018, 10, 28, 10, 30),
        to: new Date(2018, 10, 28, 11, 38),
        type: 'work',
      },
    ],
  },
];
