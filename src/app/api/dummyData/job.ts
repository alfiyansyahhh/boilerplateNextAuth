type ProfileFieldOption = 'mandatory' | 'optional' | 'off';

export interface Job {
  id: string;
  slug: string;
  title: string;
  job_type: string;
  description: string;
  number_of_candidate: number;
  salary_range: {
    min: number;
    max: number;
    currency: string;
    display_text: string;
  };
  profile_requirements: {
    full_name: ProfileFieldOption;
    photo_profile: ProfileFieldOption;
    gender: ProfileFieldOption;
    domicile: ProfileFieldOption;
    email: ProfileFieldOption;
    phone_number: ProfileFieldOption;
    linkedin_link: ProfileFieldOption;
    date_of_birth: ProfileFieldOption;
  };
  status: 'Active' | 'Inactive' | 'Draft';
  list_card: {
    badge: 'Active' | 'Inactive' | 'Draft';
    started_on_text: string;
    cta: string;
  };
  candidate_ids: string[];
}

export let jobs: Job[] = [
  {
    id: 'job_20251001_0001',
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    job_type: 'Full-time',
    description: 'Frontend developer for web apps',
    number_of_candidate: 2,
    salary_range: {
      min: 7000000,
      max: 8000000,
      currency: 'IDR',
      display_text: 'Rp7.000.000 - Rp8.000.000',
    },
    profile_requirements: {
      full_name: 'mandatory',
      photo_profile: 'mandatory',
      gender: 'optional',
      domicile: 'optional',
      email: 'mandatory',
      phone_number: 'optional',
      linkedin_link: 'optional',
      date_of_birth: 'optional',
    },
    status: 'Active',
    list_card: {
      badge: 'Active',
      started_on_text: 'started on 1 Oct 2025',
      cta: 'Manage Job',
    },
    candidate_ids: [
      'cand_20251008_0001',
      'cand_20251008_0002',
      'cand_20251008_0003',
      'cand_20251008_0004',
      'cand_20251008_0005',
      'cand_20251008_0006',
      'cand_20251008_0007',
    ],
  },
  {
    id: 'job_20251001_0002',
    slug: 'backend-developer',
    title: 'Backend Developer',
    job_type: 'Part-time',
    description: 'Backend developer for APIs',
    number_of_candidate: 3,
    salary_range: {
      min: 6000000,
      max: 7000000,
      currency: 'IDR',
      display_text: 'Rp6.000.000 - Rp7.000.000',
    },
    profile_requirements: {
      full_name: 'mandatory',
      photo_profile: 'mandatory',
      gender: 'optional',
      domicile: 'optional',
      email: 'mandatory',
      phone_number: 'optional',
      linkedin_link: 'optional',
      date_of_birth: 'optional',
    },
    status: 'Draft',
    list_card: {
      badge: 'Draft',
      started_on_text: 'started on 1 Oct 2025',
      cta: 'Manage Job',
    },
    candidate_ids: [],
  },
  {
    id: 'job_20251001_0003',
    slug: 'fullstack-developer',
    title: 'Fullstack Developer',
    job_type: 'Internship',
    description: 'Fullstack developer for web and mobile apps',
    number_of_candidate: 2,
    salary_range: {
      min: 8000000,
      max: 10000000,
      currency: 'IDR',
      display_text: 'Rp8.000.000 - Rp10.000.000',
    },
    profile_requirements: {
      full_name: 'mandatory',
      photo_profile: 'mandatory',
      gender: 'optional',
      domicile: 'optional',
      email: 'mandatory',
      phone_number: 'optional',
      linkedin_link: 'optional',
      date_of_birth: 'optional',
    },
    status: 'Inactive',
    list_card: {
      badge: 'Inactive',
      started_on_text: 'started on 1 Oct 2025',
      cta: 'Manage Job',
    },
    candidate_ids: [],
  },
];
