import { FormArray, FormControl } from '@angular/forms';
import { ColorArr } from 'src/app/common/models/color';
export interface SearchForm {
  category: FormControl<string>;
  // colorInput: FormControl<string>;
  // colors: FormArray<FormControl<ColorArr>>;
  // minPrice: FormControl<string>;
  // maxPrice: FormControl<string>;
  branch: FormControl<string>;
  ivory?: FormControl<boolean>;
  black?: FormControl<boolean>;
  orange?: FormControl<boolean>;
  blue?: FormControl<boolean>;
}
