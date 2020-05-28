export const RAISED = "raised";
export const WITH_HELPER = "with_helper";
export const ADDRESSED = "addressed";

export const BASE_COLUMNS = [
  { id: 'pos', label: 'No.', minWidth: 100 },
  { id: 'title', label: 'Title', minWidth: 300},
  {
    id: 'location',
    label: 'Location',
    minWidth: 170,
  },
  {
    id: 'status',
    label: 'Status',
    minWidth: 200,
  },
];

export const ACTION_COLUMN = [
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 150,
    align: 'center'
  }
]