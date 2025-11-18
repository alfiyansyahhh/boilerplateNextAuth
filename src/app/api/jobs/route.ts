import { NextRequest, NextResponse } from 'next/server';
import { Job, jobs } from '../dummyData/job';

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

    function generateSlug(text: string) {
      return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }

    function generateUniqueSlug(title: string, existingSlugs: string[]) {
      const baseSlug = generateSlug(title);
      let uniqueSlug = baseSlug;
      let counter = 2;
      while (existingSlugs.includes(uniqueSlug)) {
        uniqueSlug = `${baseSlug}-${counter}`;
        counter++;
      }
      return uniqueSlug;
    }

    const existingSlugs = jobs.map((j) => j.slug);
    const slug = generateUniqueSlug(body.title, existingSlugs);

    const newJob: Job = {
      id: `job_${Date.now()}`,
      slug,
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
        cta: 'Manage Job',
      },
      candidate_ids: [],
    };

    jobs.push(newJob);

    return NextResponse.json({ data: newJob }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.id) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    const index = jobs.findIndex((j) => j.id === body.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }
    const job = jobs[index];

    if (body.candidate_id) {
      if (typeof body.candidate_id !== 'string') {
        return NextResponse.json(
          { error: 'Candidate ID must be a string' },
          { status: 400 }
        );
      }

      if (job.candidate_ids.includes(body.candidate_id)) {
        return NextResponse.json(
          {
            error: `Candidate ID ${body.candidate_id} already exists in this job.`,
          },
          { status: 400 }
        );
      }

      if (job.candidate_ids.length === job.number_of_candidate) {
        return NextResponse.json(
          {
            error: `The maximum number of candidates (${job.number_of_candidate}) has already been reached.`,
          },
          { status: 400 }
        );
      }

      job.candidate_ids.push(body.candidate_id);
    }

    const updatedJob: Job = {
      ...job,
      title: body.title ?? job.title,
      job_type: body.job_type ?? job.job_type,
      description: body.description ?? job.description,
      number_of_candidate: body.number_of_candidate ?? job.number_of_candidate,
      salary_range: {
        min: body.salary_range?.min ?? job.salary_range.min,
        max: body.salary_range?.max ?? job.salary_range.max,
        currency: body.salary_range?.currency ?? job.salary_range.currency,
        display_text: `Rp${(
          body.salary_range?.min ?? job.salary_range.min
        ).toLocaleString()} - Rp${(
          body.salary_range?.max ?? job.salary_range.max
        ).toLocaleString()}`,
      },
      profile_requirements: {
        ...job.profile_requirements,
        ...body.profile_requirements,
      },
      status: body.status ?? job.status,
      list_card: {
        badge: body.status ?? job.status,
        started_on_text: job.list_card.started_on_text,
        cta: 'Manage Job',
      },
      candidate_ids: [],
    };

    jobs[index] = updatedJob;

    return NextResponse.json({ data: updatedJob });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
    }

    const index = jobs.findIndex((j) => j.id === id);
    if (index === -1) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const deletedJob = jobs.splice(index, 1)[0];

    return NextResponse.json({ data: deletedJob });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
