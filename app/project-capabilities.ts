export type ProjectCapability = {
  id: string;
  number: string;
  title: string;
  description: string;
  scope: string;
  overview: string;
  focus: string[];
  mark: 'industrial' | 'infrastructure' | 'building';
};

export const projectTypes: ProjectCapability[] = [
  {
    id: 'industrial-structures',
    number: '01',
    title: 'Industrial structures',
    description: 'Condition assessment and structural design for plants, warehouses and specialised facilities.',
    scope: 'Assessment · Design · Testing',
    overview: 'Support for facilities where structural reliability and operational continuity are essential. Engagements can span initial condition review through testing, design, and repair planning.',
    focus: ['Structural audits and stability review', 'Steel and pre-engineered building design', 'Non-destructive testing and corrosion evaluation', 'Repair, strengthening, and rehabilitation planning'],
    mark: 'industrial',
  },
  {
    id: 'transport-infrastructure',
    number: '02',
    title: 'Transport infrastructure',
    description: 'Engineering support for roads, highways, bridges and tunnel structures.',
    scope: 'Infrastructure · Inspection · Analysis',
    overview: 'Structural engineering support for connected infrastructure assets, from targeted inspections to condition assessments and design services.',
    focus: ['Road and pavement assessment', 'Bridge, culvert, and retaining structure review', 'Tunnel lining and portal structure assessment', 'As-built surveys and engineering documentation'],
    mark: 'infrastructure',
  },
  {
    id: 'existing-buildings',
    number: '03',
    title: 'Existing buildings',
    description: 'Audits, material testing and strengthening plans to extend a structure’s service life.',
    scope: 'Audit · NDT · Rehabilitation',
    overview: 'A coordinated approach to understanding existing buildings: inspect the structure, test materials where needed, and develop repair or strengthening recommendations.',
    focus: ['Visual and structural condition surveys', 'Concrete and reinforcement testing', 'Repair methodology and cost estimates', 'Strengthening design and construction-stage quality review'],
    mark: 'building',
  },
];
