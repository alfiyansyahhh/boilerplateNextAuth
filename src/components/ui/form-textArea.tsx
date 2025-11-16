'use client';

import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import { Textarea } from '@/components/ui/textarea';
import { useTranslation } from 'react-i18next';

type FormTextareaProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  isPending?: boolean;
  rows?: number;
};

export const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  required,
  disabled,
  isPending,
  rows = 10,
}: FormTextareaProps<T>) => {
  const { t } = useTranslation();

  const convertFormatting = (text: string) => {
    return text
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();

        // Heading H3 → H2 → H1 (urutan penting)
        if (trimmed.startsWith('### ')) {
          return trimmed.replace(/^###\s?/, 'H3: ');
        }
        if (trimmed.startsWith('## ')) {
          return trimmed.replace(/^##\s?/, 'H2: ');
        }
        if (trimmed.startsWith('# ')) {
          return trimmed.replace(/^#\s?/, 'H1: ');
        }

        // Bullet list
        if (trimmed.startsWith('- ')) {
          return trimmed.replace(/^\s*-\s?/, '• ');
        }

        return line;
      })
      .join('\n');
  };

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem className='flex flex-col w-full space-y-2'>
          <FormLabel>
            {t(label)} {required && <span className='text-red-500'>*</span>}
          </FormLabel>

          <FormControl>
            <Textarea
              {...field}
              placeholder={t(placeholder ?? '')}
              disabled={disabled || isPending}
              rows={rows}
              className='h-auto min-h-[100px]'
              isError={!!fieldState.error}
              onChange={(e) => {
                const formatted = convertFormatting(e.target.value);
                field.onChange(formatted);
              }}
            />
          </FormControl>

          {fieldState.error && (
            <FormMessage className='text-xs'>
              {fieldState.error.message}
            </FormMessage>
          )}
        </FormItem>
      )}
    />
  );
};

// type Job = {
//   description: string; // markdown asli dari backend
// };

// type Props = {
//   job: Job;
// };

// export default function JobDetail({ job }: Props) {
//   const convertFormatting = (text: string) => {
//     return text
//       .split("\n")
//       .map((line) => {
//         const trimmed = line.trim();
//         if (trimmed.startsWith("### ")) return trimmed.replace(/^###\s?/, "H3: ");
//         if (trimmed.startsWith("## ")) return trimmed.replace(/^##\s?/, "H2: ");
//         if (trimmed.startsWith("# ")) return trimmed.replace(/^#\s?/, "H1: ");
//         if (trimmed.startsWith("- ")) return trimmed.replace(/^- /, "• ");
//         return line;
//       })
//       .join("\n");
//   };

//   return (
//     <div className="border p-4 bg-gray-50 whitespace-pre-line">
//       {convertFormatting(job.description)}
//     </div>
//   );
// }
