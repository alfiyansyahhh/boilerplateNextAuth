import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '../../lib/utils';
import { useTranslation } from 'react-i18next';

type FormSelectProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
};

export const FormSelect = <T extends FieldValues>(
  props: FormSelectProps<T>
) => {
  const { control, name, label, options, placeholder, required, disabled } =
    props;
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
              <Select
                value={field.value || ''}
                onValueChange={field.onChange}
                disabled={disabled}
              >
                <SelectTrigger className={cn('w-full')}>
                  <SelectValue
                    placeholder={placeholder || t('Select an option')}
                  />
                </SelectTrigger>
                <SelectContent>
                  {options.map((opt) => (
                    <SelectItem
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
