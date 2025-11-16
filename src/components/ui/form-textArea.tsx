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

export const FormTextarea = <T extends FieldValues>(
  props: FormTextareaProps<T>
) => {
  const {
    control,
    name,
    label,
    placeholder,
    required,
    disabled,
    isPending,
    rows = 4,
  } = props;
  const { t } = useTranslation();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <div className='flex flex-col space-y-1 w-full'>
            <FormLabel>
              {t(label)}{' '}
              {required && <span className='text-red-500 -ml-2'>*</span>}
            </FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder={t(placeholder ?? '')}
                disabled={disabled || isPending}
                rows={rows}
                isError={fieldState.error}
              />
            </FormControl>
            {fieldState.error && (
              <FormMessage className='text-xs mt-1'>
                {fieldState.error.message}
              </FormMessage>
            )}
          </div>
        </FormItem>
      )}
    />
  );
};
