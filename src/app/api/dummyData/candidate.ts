export interface Candidate {
  id: string;
  attributes: Attribute[];
}

export interface Attribute {
  key: string;
  label: string;
  value: string;
  order: number;
}

export let candidate: Candidate[] = [
  {
    id: 'cand_20251008_0001',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'Nadia Putri',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'nadia.putri@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 812-1234-5678',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Jakarta', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Female', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/nadiaputri',
        order: 7,
      },
    ],
  },
  {
    id: 'cand_20251008_0002',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'John Doe',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'john.doe@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 812-9876-5432',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Bandung', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Male', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/johndoe',
        order: 7,
      },
    ],
  },
  {
    id: 'cand_20251008_0003',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'Aliya Tantri',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'aliya.tantri@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 813-1234-9876',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Surabaya', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Female', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/aliyatantri',
        order: 7,
      },
    ],
  },
  {
    id: 'cand_20251008_0004',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'Faisal Anwar',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'faisal.anwar@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 814-2345-6789',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Medan', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Male', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/faisalanwar',
        order: 7,
      },
    ],
  },
  {
    id: 'cand_20251008_0005',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'Carmen Laila',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'carmen.laila@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 815-6789-1234',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Yogyakarta', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Female', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/carmenlaila',
        order: 7,
      },
    ],
  },
  {
    id: 'cand_20251008_0006',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'Rafael Suryadi',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'rafael.suryadi@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 816-9876-5432',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Palembang', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Male', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/rafaelsuryadi',
        order: 7,
      },
    ],
  },
  {
    id: 'cand_20251008_0007',
    attributes: [
      {
        key: 'full_name',
        label: 'Full Name',
        value: 'Daniel Wira',
        order: 1,
      },
      {
        key: 'email',
        label: 'Email',
        value: 'daniel.wira@example.com',
        order: 2,
      },
      {
        key: 'phone',
        label: 'Phone',
        value: '+62 817-6543-2100',
        order: 3,
      },
      {
        key: 'date_of_birth',
        label: 'Date of Birth',
        value: '30 January 2001',
        order: 4,
      },
      { key: 'domicile', label: 'Domicile', value: 'Bali', order: 5 },
      { key: 'gender', label: 'Gender', value: 'Male', order: 6 },
      {
        key: 'linkedin_link',
        label: 'LinkedIn',
        value: 'https://linkedin.com/in/danielwira',
        order: 7,
      },
    ],
  },
];
