// database values
export const RAISED = "raised";
export const WITH_HELPER = "with_helper";
export const ADDRESSED = "addressed";
export const CANCELLED = "cancelled";

// labels
export const GIVE_HELP = "Give Help";
export const WAITING = "Waiting";
export const RESOLVED = "Resolved";

// RequestList columns
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
    minWidth: 150,
  },
  {
    id: 'created_at',
    label: 'Time Raised',
    minWidth: 200,
  },
];

export const ACTION_COLUMN = [
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 150,
  }
]

export const ADDRESSED_TIME_COLUMN = [
  {
    id: 'updated_at',
    label: 'Time Resolved',
    minWidth: 150,
  }
]