import { NextRequest, NextResponse } from 'next/server';

type ProfileFieldOption = 'Mandatory' | 'Optional' | 'Off';

interface Job {
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
}

let jobs: Job[] = [
  {
    id: 'job_20251001_0001',
    slug: 'frontend-developer',
    title: 'Frontend Developer',
    job_type: 'Fulltime',
    description: 'Frontend developer for web apps',
    number_of_candidate: 2,
    salary_range: {
      min: 7000000,
      max: 8000000,
      currency: 'IDR',
      display_text: 'Rp7.000.000 - Rp8.000.000',
    },
    profile_requirements: {
      full_name: 'Mandatory',
      photo_profile: 'Optional',
      gender: 'Off',
      domicile: 'Mandatory',
      email: 'Mandatory',
      phone_number: 'Mandatory',
      linkedin_link: 'Optional',
      date_of_birth: 'Optional',
    },
    status: 'Active',
    list_card: {
      badge: 'Active',
      started_on_text: 'started on 1 Oct 2025',
      cta: 'Manage Job',
    },
  },
];

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = url.searchParams.get('q')?.toLowerCase() || '';

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(q) || job.slug.toLowerCase().includes(q)
  );

  return NextResponse.json({ data: filteredJobs });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (
      !body.title ||
      !body.job_type ||
      !body.description ||
      !body.number_of_candidate ||
      !body.salary_range
    ) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const newJob: Job = {
      id: `job_${Date.now()}`,
      slug: body.slug || body.title.toLowerCase().replace(/\s+/g, '-'),
      title: body.title,
      job_type: body.job_type,
      description: body.description,
      number_of_candidate: body.number_of_candidate,
      salary_range: {
        min: body.salary_range.min,
        max: body.salary_range.max,
        currency: body.salary_range.currency || 'IDR',
        display_text: `Rp${body.salary_range.min.toLocaleString()} - Rp${body.salary_range.max.toLocaleString()}`,
      },
      profile_requirements: {
        full_name: body.profile_requirements?.full_name || 'Mandatory',
        photo_profile: body.profile_requirements?.photo_profile || 'Optional',
        gender: body.profile_requirements?.gender || 'Off',
        domicile: body.profile_requirements?.domicile || 'Mandatory',
        email: body.profile_requirements?.email || 'Mandatory',
        phone_number: body.profile_requirements?.phone_number || 'Mandatory',
        linkedin_link: body.profile_requirements?.linkedin_link || 'Optional',
        date_of_birth: body.profile_requirements?.date_of_birth || 'Optional',
      },
      status: body.status || 'Draft',
      list_card: {
        badge: body.status || 'Draft',
        started_on_text: `started on ${new Date().toLocaleDateString()}`,
        cta: body.status === 'Active' ? 'Manage Job' : 'Edit Job',
      },
    };

    jobs.push(newJob);

    return NextResponse.json({ data: newJob }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}
