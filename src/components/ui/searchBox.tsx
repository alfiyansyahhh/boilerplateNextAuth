'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from './input';

interface SearchBoxProps {
  placeholder?: string;
  onSubmit?: (value: string) => void;
}

const SearchBox = ({ placeholder, onSubmit }: SearchBoxProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('s') || '');

  const defaultSubmit = (value: string) => {
    const params = new URLSearchParams();

    if (value) params.set('s', value);

    router.push(`?${params.toString()}`);
  };

  const handleSubmit = (value: string) => {
    if (onSubmit) return onSubmit(value);
    return defaultSubmit(value);
  };

  const handleChange = (value: string) => {
    setQuery(value);

    if (value.trim() === '') {
      handleSubmit('');
    }
  };

  return (
    <div className='relative w-full'>
      <Input
        type='text'
        placeholder={placeholder || 'Search...'}
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(query);
          }
        }}
        className='pr-10 '
      />

      <button
        type='button'
        onClick={() => handleSubmit(query)}
        className='absolute right-3 top-1/2 cursor-pointer -translate-y-1/2 text-[#01959F] hover:text-black'
      >
        <Search className='h-4 w-4' />
      </button>
    </div>
  );
};

export default SearchBox;
