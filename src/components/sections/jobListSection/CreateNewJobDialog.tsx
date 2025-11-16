'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createJobSchema, loginSchema } from '@/schemas';
import { z } from 'zod';
import { FormInput } from '@/components/ui/form-input';
import { Form } from '@/components/ui/form';
import { FormSelect } from '@/components/ui/form-select';
import { FormTextarea } from '@/components/ui/form-textArea';
import { FormNumberInput } from '@/components/ui/form-inpur-number';
import { FormBadgeSelect } from '@/components/ui/form-badge-select';

const CreateNewJobModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setisPending] = useState(false);

  const form = useForm<z.infer<typeof createJobSchema>>({
    resolver: zodResolver(createJobSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      job_type: '',
      description: '',
      number_of_candidate: 0,
      salary_range: {
        min: 0,
        max: 0,
      },
      profile_requirements: {
        full_name: 'mandatory',
        photo_profile: 'mandatory',
        gender: '',
        domicile: '',
        email: 'mandatory',
        phone_number: '',
        linkedin_link: '',
        date_of_birth: '',
      },
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setisPending(true);
    console.log(values);
  });

  return (
    <>
      <Button
        variant='outline'
        onClick={() => setIsOpen(true)}
      >
        Show Dialog
      </Button>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
          <div className='bg-white relative w-[900px] max-w-full rounded-lg min-h-[30vh] max-h-[90vh] overflow-auto'>
            <div className='flex justify-between border-b items-center mb-4  p-6'>
              <h2 className='text-[18px] font-bold'>Job Opening</h2>
              <button
                onClick={() => setIsOpen(false)}
                className='text-gray-500 hover:text-gray-700 font-bold cursor-pointer'
              >
                <X />
              </button>
            </div>
            <div className='px-6  max-h-[700px] pb-10 overflow-auto  '>
              <Form {...form}>
                <form
                  onSubmit={handleSubmit}
                  className='space-y-6'
                >
                  <div className='space-y-5'>
                    <FormInput
                      control={form.control}
                      name='title'
                      label='Job Name'
                      type='email'
                      placeholder='Ex. Front End Engineer'
                      isPending={isPending}
                      required
                    />

                    <FormSelect
                      control={form.control}
                      name='job_type'
                      label='Job Type'
                      required
                      placeholder='Select job type'
                      options={[
                        { value: 'Full-time', label: 'Full-time' },
                        { value: 'Contract', label: 'Contract' },
                        { value: 'Part-time', label: 'Part-time' },
                        { value: 'Internship', label: 'Internship' },
                        { value: 'Freelance', label: 'Freelance' },
                        { value: 'hr', label: 'Human Resources' },
                        { value: 'finance', label: 'Finance' },
                        { value: 'operations', label: 'Operations' },
                      ]}
                    />

                    <FormTextarea
                      control={form.control}
                      name='description'
                      label='Job Description'
                      placeholder='Ex.'
                      required
                    />
                    <FormInput
                      control={form.control}
                      name='number_of_candidate'
                      label='Number of Candidate Needed'
                      type='email'
                      placeholder='Masukkan E-mail'
                      isPending={isPending}
                      required
                    />

                    <div>Job Salary</div>

                    <div className='flex gap-3 w-full '>
                      <div className='w-[50%]'>
                        <FormNumberInput
                          control={form.control}
                          name='salary_range.min'
                          label='Minimum Estimated Salary'
                          placeholder='Rp 0'
                          required
                          prefix='Rp '
                          isPending={isPending}
                        />
                      </div>
                      <div className='w-[50%]'>
                        <FormNumberInput
                          control={form.control}
                          name='salary_range.max'
                          label='Maximum Estimated Salary'
                          placeholder='Rp 0'
                          required
                          prefix='Rp '
                          isPending={isPending}
                        />
                      </div>
                    </div>

                    <div className='border rounded-md p-4'>
                      <div className='text-[14px] font-bold'>
                        Minimum Profile Information Required
                      </div>

                      <div className='space-y-5 mt-4'>
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.full_name'
                          label='Full Name'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                              disabled: false,
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                              disabled: true,
                            },
                            { label: 'Off', value: 'off', disabled: true },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.photo_profile'
                          label='Photo Profile'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                              disabled: false,
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                              disabled: true,
                            },
                            { label: 'Off', value: 'off', disabled: true },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.gender'
                          label='Gender'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                            },
                            { label: 'Off', value: 'off' },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.domicile'
                          label='Domicile'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                            },
                            { label: 'Off', value: 'off' },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.email'
                          label='Email'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                              disabled: true,
                            },
                            { label: 'Off', value: 'off', disabled: true },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.phone_number'
                          label='Phone number'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                            },
                            { label: 'Off', value: 'off' },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.linkedin_link'
                          label='Linkedin link'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                            },
                            { label: 'Off', value: 'off' },
                          ]}
                        />
                        <hr />
                        <FormBadgeSelect
                          control={form.control}
                          name='profile_requirements.date_of_birth'
                          label='Date of birth'
                          options={[
                            {
                              label: 'Mandatory',
                              value: 'mandatory',
                            },
                            {
                              label: 'Optional',
                              value: 'optional',
                            },
                            { label: 'Off', value: 'off' },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </form>
              </Form>
            </div>

            <div className='flex  w-full bottom-0 justify-end border-t  items-center   p-6'>
              <Form {...form}>
                <form
                  onSubmit={handleSubmit}
                  className='space-y-6'
                >
                  <Button
                    variant='primary'
                    className='h-8 rounded-md w-[106px]'
                    type='submit'
                    // disabled={!form.formState.isValid}
                    loading={isPending}
                  >
                    Publish Job
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateNewJobModal;
